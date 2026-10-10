"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 9666;
const DATA_FILE = path.join(__dirname, "data.json");
const ADMIN_PASSWORD = "xiangli9666";
const MAX_BODY = 8 * 1024 * 1024;

const DEFAULT_DATA = {
  home: {
    image: "",
    introZh: "香力城市是一座以轨道交通闻名的现代化都市。城市内轨道交通线路纵横交错，覆盖全城各个角落，为市民提供便捷、高效、绿色的出行体验。欢迎来到香力城市，感受城市交通的魅力！",
    introEn: "Xiangli is a modern city famous for its rail transit. The rail transit lines crisscross the city and cover every corner, providing citizens with convenient, efficient and green travel. Welcome to Xiangli and experience the charm of urban transportation!"
  },
  companies: [],
  members: [],
  routes: [],
  adminTokens: []
};

function clone(o) { return JSON.parse(JSON.stringify(o)); }

function load() {
  if (!fs.existsSync(DATA_FILE)) {
    const d = clone(DEFAULT_DATA);
    write(d);
    return d;
  }
  try {
    const raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    return {
      home: Object.assign({}, DEFAULT_DATA.home, raw.home || {}),
      companies: Array.isArray(raw.companies) ? raw.companies : [],
      members: Array.isArray(raw.members) ? raw.members : [],
      routes: Array.isArray(raw.routes) ? raw.routes : [],
      adminTokens: Array.isArray(raw.adminTokens) ? raw.adminTokens : []
    };
  } catch (e) {
    const d = clone(DEFAULT_DATA);
    write(d);
    return d;
  }
}

function write(d) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2));
  } catch (e) {
    console.error("写入数据失败:", e.message);
  }
}

const db = load();

function uid() {
  return Date.now().toString(36) + crypto.randomBytes(6).toString("hex");
}

function publicData() {
  return {
    home: db.home,
    companies: db.companies,
    members: db.members,
    routes: db.routes
  };
}

function sendJSON(res, status, obj) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(obj));
}

function readBody(req, cb) {
  let size = 0;
  const chunks = [];
  let done = false;
  req.on("data", (c) => {
    if (done) return;
    size += c.length;
    if (size > MAX_BODY) {
      done = true;
      cb(new Error("too large"));
      req.destroy();
      return;
    }
    chunks.push(c);
  });
  req.on("end", () => {
    if (done) return;
    const buf = Buffer.concat(chunks);
    if (!buf.length) return cb(null, {});
    try {
      cb(null, JSON.parse(buf.toString("utf8")));
    } catch (e) {
      cb(new Error("bad json"));
    }
  });
  req.on("error", () => {
    if (!done) { done = true; cb(new Error("aborted")); }
  });
}

function getToken(req) {
  const auth = req.headers["authorization"] || "";
  if (auth.slice(0, 7) === "Bearer ") return auth.slice(7).trim();
  return (req.headers["x-admin-token"] || "").trim();
}

function isAdminReq(req) {
  const t = getToken(req);
  return !!t && db.adminTokens.includes(t);
}

function serveFile(res, file, type) {
  fs.readFile(path.join(__dirname, file), (err, buf) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": type + "; charset=utf-8" });
    res.end(buf);
  });
}

function match(pattern, pathname) {
  const p = pattern.split("/");
  const q = pathname.split("/");
  if (p.length !== q.length) return null;
  const params = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i][0] === ":") params[p[i].slice(1)] = decodeURIComponent(q[i]);
    else if (p[i] !== q[i]) return null;
  }
  return params;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const pathname = url.pathname;
  const method = req.method;

  if (method === "GET") {
    if (pathname === "/" || pathname === "/index.html") return serveFile(res, "index.html", "text/html");
    if (pathname === "/style.css") return serveFile(res, "style.css", "text/css");
    if (pathname === "/app.js") return serveFile(res, "app.js", "text/javascript");
    if (pathname === "/api/data") return sendJSON(res, 200, publicData());
    return sendJSON(res, 404, { error: "not found" });
  }

  readBody(req, (err, body) => {
    if (err) return sendJSON(res, 400, { error: "invalid request" });

    if (pathname === "/api/admin/login" && method === "POST") {
      if (body.password === ADMIN_PASSWORD) {
        const token = uid();
        db.adminTokens.push(token);
        write(db);
        return sendJSON(res, 200, { ok: true, token });
      }
      return sendJSON(res, 401, { error: "wrong password" });
    }

    if (pathname === "/api/admin/logout" && method === "POST") {
      const t = getToken(req);
      db.adminTokens = db.adminTokens.filter((x) => x !== t);
      write(db);
      return sendJSON(res, 200, { ok: true });
    }

    if (pathname === "/api/member/resolve" && method === "POST") {
      const name = String(body.name || "").trim();
      if (!name) return sendJSON(res, 400, { error: "name required" });
      let member = db.members.find((m) => m.name === name);
      if (member) return sendJSON(res, 200, { member, created: false });
      member = { id: uid(), name };
      db.members.push(member);
      write(db);
      return sendJSON(res, 200, { member, created: true });
    }

    if (!isAdminReq(req)) return sendJSON(res, 401, { error: "unauthorized" });

    if (pathname === "/api/home" && method === "POST") {
      if (typeof body.image === "string") db.home.image = body.image;
      if (typeof body.introZh === "string") db.home.introZh = body.introZh;
      if (typeof body.introEn === "string") db.home.introEn = body.introEn;
      write(db);
      return sendJSON(res, 200, { ok: true, home: db.home });
    }

    let m;

    m = match("/api/company/:id", pathname);
    if (m && method === "PUT") {
      const c = db.companies.find((x) => x.id === m.id);
      if (!c) return sendJSON(res, 404, { error: "not found" });
      const name = String(body.name || "").trim();
      if (!name) return sendJSON(res, 400, { error: "name required" });
      c.name = name;
      c.memberIds = Array.isArray(body.memberIds) ? body.memberIds : [];
      c.routeIds = Array.isArray(body.routeIds) ? body.routeIds : [];
      write(db);
      return sendJSON(res, 200, { ok: true, company: c });
    }
    if (m && method === "DELETE") {
      db.companies = db.companies.filter((x) => x.id !== m.id);
      write(db);
      return sendJSON(res, 200, { ok: true });
    }
    if (pathname === "/api/company" && method === "POST") {
      const name = String(body.name || "").trim();
      if (!name) return sendJSON(res, 400, { error: "name required" });
      const c = {
        id: uid(),
        name,
        memberIds: Array.isArray(body.memberIds) ? body.memberIds : [],
        routeIds: Array.isArray(body.routeIds) ? body.routeIds : []
      };
      db.companies.push(c);
      write(db);
      return sendJSON(res, 200, { ok: true, company: c });
    }

    m = match("/api/route/:id", pathname);
    if (m && method === "PUT") {
      const r = db.routes.find((x) => x.id === m.id);
      if (!r) return sendJSON(res, 404, { error: "not found" });
      const name = String(body.name || "").trim();
      if (!name) return sendJSON(res, 400, { error: "name required" });
      r.name = name;
      r.number = String(body.number || "").trim();
      r.type = String(body.type || "light_rail");
      r.color = String(body.color || "#2457d6");
      write(db);
      return sendJSON(res, 200, { ok: true, route: r });
    }
    if (m && method === "DELETE") {
      db.routes = db.routes.filter((x) => x.id !== m.id);
      db.companies.forEach((c) => { c.routeIds = (c.routeIds || []).filter((id) => id !== m.id); });
      write(db);
      return sendJSON(res, 200, { ok: true });
    }
    if (pathname === "/api/route" && method === "POST") {
      const name = String(body.name || "").trim();
      if (!name) return sendJSON(res, 400, { error: "name required" });
      const r = {
        id: uid(),
        name,
        number: String(body.number || "").trim(),
        type: String(body.type || "light_rail"),
        color: String(body.color || "#2457d6")
      };
      db.routes.push(r);
      write(db);
      return sendJSON(res, 200, { ok: true, route: r });
    }

    m = match("/api/member/:id", pathname);
    if (m && method === "PUT") {
      const mem = db.members.find((x) => x.id === m.id);
      if (!mem) return sendJSON(res, 404, { error: "not found" });
      const name = String(body.name || "").trim();
      if (!name) return sendJSON(res, 400, { error: "name required" });
      if (db.members.some((x) => x.id !== m.id && x.name === name)) {
        return sendJSON(res, 409, { error: "name exists" });
      }
      mem.name = name;
      write(db);
      return sendJSON(res, 200, { ok: true, member: mem });
    }
    if (m && method === "DELETE") {
      db.members = db.members.filter((x) => x.id !== m.id);
      db.companies.forEach((c) => { c.memberIds = (c.memberIds || []).filter((id) => id !== m.id); });
      write(db);
      return sendJSON(res, 200, { ok: true });
    }
    if (pathname === "/api/member" && method === "POST") {
      const name = String(body.name || "").trim();
      if (!name) return sendJSON(res, 400, { error: "name required" });
      if (db.members.some((x) => x.name === name)) {
        return sendJSON(res, 409, { error: "name exists" });
      }
      const mem = { id: uid(), name };
      db.members.push(mem);
      write(db);
      return sendJSON(res, 200, { ok: true, member: mem });
    }

    return sendJSON(res, 404, { error: "not found" });
  });
});

server.listen(PORT, () => {
  console.log("香力城市交通管理网站服务器已启动: http://localhost:" + PORT);
});
