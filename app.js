"use strict";

/* ============ 部署配置：填入你的 Supabase 项目信息（Supabase 控制台 -> Project Settings -> API） ============ */
const SUPABASE_URL = "https://aertbebaqxkllxvxsspi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlcnRiZWJhcXhrbGx4dnhzc3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNzcxNDcsImV4cCI6MjEwNTY1MzE0N30.A_3eM7w8u_1rIszeR17MAWNd-k7K2QCKAivOIs3CGTk";

/* ================= 常量 ================= */
const KEY_ADMIN_PW = "xiangli_admin_pw";
const KEY_MEMBER = "xiangli_member";
const KEY_LANG = "xiangli_lang";

const ROUTE_TYPES = [
  { key: "light_rail", zh: "轻轨", en: "Light Rail" },
  { key: "high_speed", zh: "高速列车", en: "High-Speed Train" },
  { key: "intercity", zh: "城际列车", en: "Intercity Train" },
  { key: "suburban", zh: "市域快车", en: "Suburban Express" },
  { key: "subway", zh: "地铁", en: "Subway" },
  { key: "bus", zh: "公交", en: "Bus" },
  { key: "mrt", zh: "捷运", en: "Metro" },
  { key: "regular", zh: "普速列车", en: "Regular Train" },
  { key: "ferry", zh: "轮渡", en: "Ferry" }
];

const LOCKED_ZH = "天地欢域：香速铁道欢迎你！ Q：1095279739";
const LOCKED_EN = "Tiandi Huanyu: Xiangsu Railway welcomes you! Q: 1095279739";

const AI_ID = "__ai__";
const AI_NAME = "香力AI";

const I18N = {
  zh: {
    siteTitle: "香力城市交通管理网站",
    navHome: "首页",
    navCompany: "公司",
    navMembers: "成员",
    navRoutes: "线路",
    navAdmin: "管理员",
    authorLabel: "作者：",
    linkSatellite: "卫星在线地图",
    linkRouteMap: "线路在线地图",
    homeTitle: "首页",
    homeSub: "香力城市简介与线路图",
    mapTitle: "线路图",
    introTitle: "城市简介",
    companyTitle: "公司",
    companySub: "查看香力城市各运营公司",
    membersTitle: "成员",
    membersSub: "香力城市成员列表",
    routesTitle: "线路",
    routesSub: "按名称与类型排列",
    adminTitle: "管理员",
    adminSub: "管理网站全部内容",
    adminBadge: "管理员模式",
    addCompany: "新建公司",
    addRoute: "添加线路",
    addMember: "添加成员",
    emptyCompanies: "暂无公司",
    emptyRoutes: "暂无线路",
    emptyMembers: "暂无成员",
    noMap: "管理员尚未上传线路图",
    noMapAdmin: "点击下方按钮上传线路图",
    uploadMap: "上传线路图",
    editIntro: "编辑简介",
    edit: "编辑",
    delete: "删除",
    save: "保存",
    cancel: "取消",
    name: "名称",
    type: "类型",
    color: "颜色",
    number: "编号",
    membersOf: "成员",
    routesOf: "所属线路",
    noMembers: "暂无成员",
    noRoutes: "暂无线路",
    selectMembers: "选择成员",
    selectRoutes: "选择线路",
    myMember: "我的成员",
    memberLocked: "成员名称即为账号，可跨设备登录",
    createYourMember: "登录 / 创建账号",
    createHint: "输入用户名登录；新名称将自动创建账号",
    memberNamePlaceholder: "请输入你的用户名",
    switchAccount: "切换账号",
    login: "登录",
    navChat: "聊天",
    chatTitle: "聊天",
    chatSub: "成员之间交流",
    chatPlaceholder: "输入消息，支持 Markdown（如 **加粗**、*斜体*、`代码`、- 列表）…",
    send: "发送",
    chatEmpty: "还没有消息，来说第一句吧！",
    chatNeedLogin: "请先在「成员」页登录或创建账号，才能聊天",
    goRegister: "去注册 / 登录",
    chatAttach: "附件",
    chatAddLink: "链接",
    chatAiThinking: "香力AI 正在思考…",
    chatAiHint: "输入 @香力AI 向 AI 提问（香力信息、线路建议等）；输入 @ 可提及成员",
    mentionBanner: "有人@你哦",
    aiSettings: "AI 设置",
    aiEnabled: "启用 AI",
    aiModel: "模型",
    aiBaseUrl: "接口地址",
    aiSystemPrompt: "系统提示词",
    aiTemperature: "温度（0-1）",
    aiApiKey: "自定义 API Key（留空则使用默认）",
    aiKeySet: "已设置自定义 Key",
    aiSaved: "AI 设置已保存",
    uploadFailed: "上传失败",
    fileTooBig: "文件过大（上限 10MB）",
    linkPrompt: "请输入链接地址（http...）",
    attachImage: "图片",
    attachFile: "文件",
    aiBadge: "AI",
    adminGate: "请输入管理员密码",
    password: "密码",
    enterAdmin: "进入管理员页面",
    wrongPassword: "密码错误",
    adminPanelTitle: "管理后台",
    adminWelcome: "欢迎，管理员。你可以在此管理网站的全部内容。",
    totalCompanies: "公司",
    totalMembers: "成员",
    totalRoutes: "线路",
    quickEdit: "快速前往",
    editHome: "编辑首页（线路图 / 简介）",
    manageCompanies: "管理公司",
    manageMembers: "管理成员",
    manageRoutes: "管理线路",
    logout: "退出登录",
    deleted: "已删除",
    saved: "已保存",
    created: "已创建",
    nameRequired: "请输入名称",
    memberExists: "该名字已存在",
    confirmDelete: "确定要删除吗？",
    loginSuccess: "登录成功，欢迎回来！",
    imageTooLarge: "图片过大，无法保存，请使用更小的图片",
    memberCreated: "账号已创建",
    memberLoginSuccess: "登录成功",
    companyNamePlaceholder: "公司名称",
    routeNamePlaceholder: "线路名称",
    routeNumberPlaceholder: "例如：1",
    introZhLabel: "简介（中文）",
    introEnLabel: "简介（英文）",
    adminGateSub: "输入密码后可进入管理员页面",
    networkError: "网络错误，请稍后再试",
    notConfigured: "尚未配置 Supabase，请先填写 app.js 顶部的 SUPABASE_URL 和 SUPABASE_ANON_KEY",
    adminExpired: "管理员登录已失效，请重新登录",
    loading: "加载中…"
  },
  en: {
    siteTitle: "Xiangli City Traffic Management Website",
    navHome: "Home",
    navCompany: "Company",
    navMembers: "Members",
    navRoutes: "Routes",
    navAdmin: "Admin",
    authorLabel: "Author: ",
    linkSatellite: "Satellite Online Map",
    linkRouteMap: "Route Online Map",
    homeTitle: "Home",
    homeSub: "Xiangli City introduction & route map",
    mapTitle: "Route Map",
    introTitle: "Introduction",
    companyTitle: "Company",
    companySub: "Operating companies of Xiangli City",
    membersTitle: "Members",
    membersSub: "Member list of Xiangli City",
    routesTitle: "Routes",
    routesSub: "Sorted by name and type",
    adminTitle: "Admin",
    adminSub: "Manage all website content",
    adminBadge: "Admin mode",
    addCompany: "New Company",
    addRoute: "Add Route",
    addMember: "Add Member",
    emptyCompanies: "No companies yet",
    emptyRoutes: "No routes yet",
    emptyMembers: "No members yet",
    noMap: "The admin has not uploaded a route map yet",
    noMapAdmin: "Tap the button below to upload a route map",
    uploadMap: "Upload Map",
    editIntro: "Edit Intro",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    name: "Name",
    type: "Type",
    color: "Color",
    number: "Number",
    membersOf: "Members",
    routesOf: "Routes",
    noMembers: "No members",
    noRoutes: "No routes",
    selectMembers: "Select members",
    selectRoutes: "Select routes",
    myMember: "My Member",
    memberLocked: "A member name is an account; log in from any device",
    createYourMember: "Log in / Create account",
    createHint: "Enter your username to log in; a new name creates an account",
    memberNamePlaceholder: "Enter your username",
    switchAccount: "Switch account",
    login: "Log in",
    navChat: "Chat",
    chatTitle: "Chat",
    chatSub: "Talk with other members",
    chatPlaceholder: "Type a message, Markdown supported (**bold**, *italic*, `code`, - list)…",
    send: "Send",
    chatEmpty: "No messages yet. Say hello!",
    chatNeedLogin: "Please log in or create an account on the Members page to chat",
    goRegister: "Go to register / log in",
    chatAttach: "Attach",
    chatAddLink: "Link",
    chatAiThinking: "Xiangli AI is thinking…",
    chatAiHint: "Type @香力AI to ask the AI (Xiangli info, route suggestions…); type @ to mention members",
    mentionBanner: "Someone mentioned you!",
    aiSettings: "AI Settings",
    aiEnabled: "Enable AI",
    aiModel: "Model",
    aiBaseUrl: "Base URL",
    aiSystemPrompt: "System prompt",
    aiTemperature: "Temperature (0-1)",
    aiApiKey: "Custom API Key (blank = use default)",
    aiKeySet: "Custom key is set",
    aiSaved: "AI settings saved",
    uploadFailed: "Upload failed",
    fileTooBig: "File too large (max 10MB)",
    linkPrompt: "Enter a URL (http...)",
    attachImage: "Image",
    attachFile: "File",
    aiBadge: "AI",
    adminGate: "Enter the admin password",
    password: "Password",
    enterAdmin: "Enter Admin Page",
    wrongPassword: "Wrong password",
    adminPanelTitle: "Admin Dashboard",
    adminWelcome: "Welcome, admin. You can manage all website content here.",
    totalCompanies: "Companies",
    totalMembers: "Members",
    totalRoutes: "Routes",
    quickEdit: "Quick access",
    editHome: "Edit Home (route map / intro)",
    manageCompanies: "Manage companies",
    manageMembers: "Manage members",
    manageRoutes: "Manage routes",
    logout: "Log out",
    deleted: "Deleted",
    saved: "Saved",
    created: "Created",
    nameRequired: "Please enter a name",
    memberExists: "That name already exists",
    confirmDelete: "Are you sure you want to delete this?",
    loginSuccess: "Login successful, welcome back!",
    imageTooLarge: "Image is too large to save. Please use a smaller image.",
    memberCreated: "Account created",
    memberLoginSuccess: "Logged in",
    companyNamePlaceholder: "Company name",
    routeNamePlaceholder: "Route name",
    routeNumberPlaceholder: "e.g. 1",
    introZhLabel: "Intro (Chinese)",
    introEnLabel: "Intro (English)",
    adminGateSub: "Enter the password to access the admin page",
    networkError: "Network error. Please try again later.",
    notConfigured: "Supabase is not configured. Fill SUPABASE_URL and SUPABASE_ANON_KEY at the top of app.js first.",
    adminExpired: "Admin session expired. Please log in again.",
    loading: "Loading…"
  }
};

/* ================= 状态 ================= */
let lang = localStorage.getItem(KEY_LANG) || "zh";
let data = { home: {}, companies: [], members: [], routes: [] };
let mapImage = "";
let chatMessages = [];
let chatTimer = null;
let unreadTimer = null;
let pendingAttachments = [];
let aiThinking = false;

function isConfigured() {
  return !!(SUPABASE_URL && SUPABASE_URL.indexOf("your-project") === -1 && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== "your-anon-key");
}

function apiHeaders() {
  return {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": "Bearer " + SUPABASE_ANON_KEY,
    "Content-Type": "application/json"
  };
}

async function restGet(path) {
  let res;
  try {
    res = await fetch(SUPABASE_URL + "/rest/v1/" + path, { headers: apiHeaders() });
  } catch (e) {
    const err = new Error("network");
    err.network = true;
    throw err;
  }
  if (!res.ok) {
    let detail = "";
    try { detail = await res.text(); } catch (e) {}
    const err = new Error("HTTP " + res.status + " " + String(detail).slice(0, 140));
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function rpc(fn, params) {
  let res;
  try {
    res = await fetch(SUPABASE_URL + "/rest/v1/rpc/" + fn, {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify(params || {})
    });
  } catch (e) {
    const err = new Error(t("networkError"));
    err.network = true;
    throw err;
  }
  let body = null;
  try { body = await res.json(); } catch (e) {}
  if (!res.ok) {
    const msg = (body && (body.message || body.hint)) || ("HTTP " + res.status);
    console.error("RPC 失败:", fn, res.status, body);
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return body;
}

/* ================= 工具 ================= */
function t(key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.zh[key] || key;
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}
function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function isAdmin() {
  return !!localStorage.getItem(KEY_ADMIN_PW);
}
function myMemberId() {
  return localStorage.getItem(KEY_MEMBER);
}
function myMember() {
  const id = myMemberId();
  return data.members.find((m) => m.id === id) || null;
}
function typeName(key) {
  const t2 = ROUTE_TYPES.find((r) => r.key === key);
  return t2 ? t2[lang] : key;
}
function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ================= 数据读取 ================= */
async function refresh() {
  if (!isConfigured()) return;
  const [homeArr, companies, members, routes] = await Promise.all([
    restGet("home?select=intro_zh,intro_en"),
    restGet("companies?select=*&order=name.asc"),
    restGet("members?select=*&order=name.asc"),
    restGet("routes?select=*")
  ]);
  const h = (homeArr && homeArr[0]) || {};
  data = {
    home: {
      introZh: h.intro_zh || "",
      introEn: h.intro_en || ""
    },
    companies: companies || [],
    members: members || [],
    routes: routes || []
  };
}

async function loadMapImage() {
  try {
    const arr = await restGet("home?select=image");
    mapImage = (arr && arr[0] && arr[0].image) || "";
  } catch (e) {
    console.error("加载线路图失败:", e);
  }
}

/* ================= 管理员写操作 ================= */
async function adminRpc(fn, params) {
  if (!isConfigured()) { showToast(t("notConfigured")); throw new Error("not configured"); }
  const pw = localStorage.getItem(KEY_ADMIN_PW) || "";
  let result;
  try {
    result = await rpc(fn, Object.assign({ pw }, params));
  } catch (e) {
    const msg = e.message || "";
    if (msg.indexOf("unauthorized") !== -1) {
      localStorage.removeItem(KEY_ADMIN_PW);
      showToast(t("adminExpired"));
      renderAll();
    } else if (msg.indexOf("name exists") !== -1) {
      showToast(t("memberExists"));
    } else {
      showToast(t("networkError") + " [" + msg + "]");
    }
    throw e;
  }
  try { await refresh(); } catch (e) { console.error("刷新数据失败:", e); }
  return result;
}

/* ================= DOM 引用 ================= */
const $ = (s) => document.querySelector(s);
const modalBackdrop = $("#modalBackdrop");
const modalTitle = $("#modalTitle");
const modalBody = $("#modalBody");
const modalFoot = $("#modalFoot");

/* ================= 弹窗 ================= */
function openModal(title, bodyHTML, footHTML) {
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHTML;
  modalFoot.innerHTML = footHTML || "";
  modalBackdrop.classList.add("show");
}
function closeModal() {
  modalBackdrop.classList.remove("show");
}
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
$("#modalClose").addEventListener("click", closeModal);

/* ================= 图片放大 ================= */
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");
function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("show");
}
function closeLightbox() {
  lightbox.classList.remove("show");
}
lightbox.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ================= 导航 ================= */
const navItems = document.querySelectorAll(".nav-item");
function currentPage() {
  const el = document.querySelector(".page.active");
  return el ? el.id.replace("page-", "") : "home";
}
function renderActive() {
  const p = currentPage();
  if (p === "home") renderHome();
  else if (p === "company") renderCompany();
  else if (p === "members") renderMembers();
  else if (p === "routes") renderRoutes();
  else if (p === "chat") renderChat();
  else if (p === "admin") renderAdmin();
}
function renderAll() {
  renderActive();
}
function switchPage(page) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + page).classList.add("active");
  navItems.forEach((n) => n.classList.toggle("active", n.dataset.page === page));
  window.scrollTo({ top: 0 });
  renderActive();
  if (page !== "chat") stopChatPolling();
}
navItems.forEach((n) => {
  n.addEventListener("click", () => switchPage(n.dataset.page));
});

/* ================= 渲染：首页 ================= */
function renderHome() {
  const admin = isAdmin();
  document.getElementById("siteTitle").textContent = t("siteTitle");
  document.getElementById("homeTitle").textContent = t("homeTitle");
  document.getElementById("homeSub").textContent = t("homeSub");
  document.getElementById("mapTitle").textContent = t("mapTitle");
  document.getElementById("introTitle").textContent = t("introTitle");

  const bar = document.getElementById("homeAdminBar");
  if (admin) {
    bar.classList.remove("hidden");
    bar.innerHTML = '<span class="admin-badge">' + esc(t("adminBadge")) + "</span>" +
      ' <button class="btn btn-primary btn-sm" id="btnUploadMap">' + esc(t("uploadMap")) + "</button>" +
      ' <button class="btn btn-ghost btn-sm" id="btnEditIntro">' + esc(t("editIntro")) + "</button>";
    document.getElementById("btnUploadMap").addEventListener("click", uploadMap);
    document.getElementById("btnEditIntro").addEventListener("click", editIntro);
  } else {
    bar.classList.add("hidden");
    bar.innerHTML = "";
  }

  const mapArea = document.getElementById("mapArea");
  if (mapImage) {
    mapArea.innerHTML = '<img src="' + mapImage + '" alt="Route Map" class="map-img">';
    mapArea.querySelector("img").addEventListener("click", () => openLightbox(mapImage));
  } else {
    mapArea.innerHTML = '<div class="map-empty">' + esc(t("noMap")) +
      (admin ? "<br>" + esc(t("noMapAdmin")) : "") + "</div>";
  }

  const intro = lang === "zh" ? data.home.introZh : data.home.introEn;
  const locked = lang === "zh" ? LOCKED_ZH : LOCKED_EN;
  document.getElementById("introText").innerHTML =
    '<div>' + esc(intro) + '</div><div class="intro-locked">' + esc(locked) + "</div>";
}

/* ================= 渲染：公司 ================= */
function renderCompany() {
  const admin = isAdmin();
  document.getElementById("companyTitle").textContent = t("companyTitle");
  document.getElementById("companySub").textContent = t("companySub");

  const bar = document.getElementById("companyAdminBar");
  if (admin) {
    bar.classList.remove("hidden");
    bar.innerHTML = '<span class="admin-badge">' + esc(t("adminBadge")) + "</span>" +
      ' <button class="btn btn-primary btn-sm" id="btnAddCompany">' + esc(t("addCompany")) + "</button>";
    document.getElementById("btnAddCompany").addEventListener("click", () => editCompany(null));
  } else {
    bar.classList.add("hidden");
    bar.innerHTML = "";
  }

  const list = document.getElementById("companyList");
  if (!data.companies.length) {
    list.innerHTML = '<div class="empty">' + esc(t("emptyCompanies")) + "</div>";
    return;
  }
  list.innerHTML = data.companies.map((c) => {
    const members = (c.member_ids || []).map((id) => data.members.find((m) => m.id === id)).filter(Boolean);
    const routes = (c.route_ids || []).map((id) => data.routes.find((r) => r.id === id)).filter(Boolean);
    const memberChips = members.length
      ? members.map((m) => '<span class="chip">' + esc(m.name) + "</span>").join("")
      : '<span class="chip muted">' + esc(t("noMembers")) + "</span>";
    const routeChips = routes.length
      ? routes.map((r) => '<span class="chip route-chip" style="background:' + esc(r.color || "#2457d6") + '">' +
          esc(r.number ? r.number + " " : "") + esc(r.name) + "</span>").join("")
      : '<span class="chip muted">' + esc(t("noRoutes")) + "</span>";

    let actions = "";
    if (admin) {
      actions = '<div class="company-actions">' +
        '<button class="btn btn-ghost btn-sm" data-act="edit" data-id="' + c.id + '">' + esc(t("edit")) + "</button>" +
        '<button class="btn btn-danger btn-sm" data-act="del" data-id="' + c.id + '">' + esc(t("delete")) + "</button>" +
        "</div>";
    }
    return '<div class="card company-card">' +
      '<div class="company-head"><div class="company-name">' + esc(c.name) + "</div>" + actions + "</div>" +
      '<div class="section-label">' + esc(t("membersOf")) + '</div><div class="chip-row">' + memberChips + "</div>" +
      '<div class="section-label">' + esc(t("routesOf")) + '</div><div class="chip-row">' + routeChips + "</div>" +
      "</div>";
  }).join("");

  list.querySelectorAll("[data-act]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const c = data.companies.find((x) => x.id === id);
      if (btn.dataset.act === "edit") editCompany(c);
      else deleteCompany(c);
    });
  });
}

/* ================= 渲染：成员 ================= */
function renderMembers() {
  const admin = isAdmin();
  document.getElementById("membersTitle").textContent = t("membersTitle");
  document.getElementById("membersSub").textContent = t("membersSub");

  const bar = document.getElementById("memberAdminBar");
  if (admin) {
    bar.classList.remove("hidden");
    bar.innerHTML = '<span class="admin-badge">' + esc(t("adminBadge")) + "</span>" +
      ' <button class="btn btn-primary btn-sm" id="btnAddMember">' + esc(t("addMember")) + "</button>";
    document.getElementById("btnAddMember").addEventListener("click", () => editMember(null));
  } else {
    bar.classList.add("hidden");
    bar.innerHTML = "";
  }

  const me = myMember();
  const meCard = document.getElementById("memberMe");
  if (me) {
    meCard.innerHTML = '<div class="me-inner">' +
      '<div class="me-label">' + esc(t("myMember")) + '</div>' +
      '<div class="me-name">' + esc(me.name) + "</div>" +
      '<div class="me-lock">' + esc(t("memberLocked")) + "</div></div>" +
      '<div style="height:10px"></div>' +
      '<button class="btn btn-ghost btn-block" id="btnSwitchAccount">' + esc(t("switchAccount")) + "</button>";
    document.getElementById("btnSwitchAccount").addEventListener("click", () => {
      showMemberForm(true);
    });
  } else {
    showMemberForm(false);
  }

  const list = document.getElementById("memberList");
  if (!data.members.length) {
    list.innerHTML = '<div class="empty">' + esc(t("emptyMembers")) + "</div>";
    return;
  }
  const myId = myMemberId();
  list.innerHTML = data.members.map((m) => {
    const isMe = m.id === myId;
    let actions = "";
    if (admin) {
      actions = '<div class="company-actions">' +
        '<button class="btn btn-ghost btn-sm" data-mact="edit" data-id="' + m.id + '">' + esc(t("edit")) + "</button>" +
        '<button class="btn btn-danger btn-sm" data-mact="del" data-id="' + m.id + '">' + esc(t("delete")) + "</button>" +
        "</div>";
    }
    return '<div class="member-row">' +
      '<div class="member-avatar">' + esc(m.name.charAt(0)) + "</div>" +
      '<div class="member-info"><div class="member-name">' + esc(m.name) +
      (isMe ? ' <span class="member-me-tag">' + esc(t("myMember")) + "</span>" : "") +
      '</div><div class="member-id">' + esc(m.id) + "</div></div>" + actions +
      "</div>";
  }).join("");

  list.querySelectorAll("[data-mact]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const m = data.members.find((x) => x.id === id);
      if (btn.dataset.mact === "edit") editMember(m);
      else deleteMember(m);
    });
  });
}

function showMemberForm(switching) {
  const meCard = document.getElementById("memberMe");
  meCard.innerHTML = '<div class="card" style="text-align:center">' +
    '<p style="margin:0 0 4px;font-weight:700">' + esc(t("createYourMember")) + "</p>" +
    '<p style="margin:0 0 12px;color:var(--muted);font-size:13px">' + esc(t("createHint")) + "</p>" +
    '<input id="memberNameInput" class="plain-input" placeholder="' + esc(t("memberNamePlaceholder")) + '">' +
    '<div style="height:12px"></div>' +
    '<button class="btn btn-primary btn-block" id="btnResolveMember">' + esc(t("login")) + "</button>";
  if (switching) {
    meCard.innerHTML += '<div style="height:8px"></div>' +
      '<button class="btn btn-ghost btn-block" id="btnCancelSwitch">' + esc(t("cancel")) + "</button>";
  }
  meCard.innerHTML += "</div>";
  document.getElementById("btnResolveMember").addEventListener("click", resolveMember);
  document.getElementById("memberNameInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") resolveMember();
  });
  if (switching) {
    document.getElementById("btnCancelSwitch").addEventListener("click", renderMembers);
  } else {
    setTimeout(() => { const i = document.getElementById("memberNameInput"); if (i) i.focus(); }, 0);
  }
}

/* ================= 渲染：线路 ================= */
function renderRoutes() {
  const admin = isAdmin();
  document.getElementById("routesTitle").textContent = t("routesTitle");
  document.getElementById("routesSub").textContent = t("routesSub");

  const bar = document.getElementById("routeAdminBar");
  if (admin) {
    bar.classList.remove("hidden");
    bar.innerHTML = '<span class="admin-badge">' + esc(t("adminBadge")) + "</span>" +
      ' <button class="btn btn-primary btn-sm" id="btnAddRoute">' + esc(t("addRoute")) + "</button>";
    document.getElementById("btnAddRoute").addEventListener("click", () => editRoute(null));
  } else {
    bar.classList.add("hidden");
    bar.innerHTML = "";
  }

  const list = document.getElementById("routeList");
  if (!data.routes.length) {
    list.innerHTML = '<div class="empty">' + esc(t("emptyRoutes")) + "</div>";
    return;
  }

  let html = "";
  ROUTE_TYPES.forEach((rt) => {
    const routes = data.routes
      .filter((r) => r.type === rt.key)
      .sort((a, b) => {
        const na = a.name.localeCompare(b.name, "zh");
        if (na !== 0) return na;
        return (a.number || "").localeCompare(b.number || "", undefined, { numeric: true });
      });
    if (!routes.length) return;
    html += '<div class="route-group"><div class="route-group-head">' + esc(typeName(rt.key)) +
      ' <span style="font-size:12px;color:var(--muted)">(' + routes.length + ")</span></div>";
    routes.forEach((r) => {
      let actions = "";
      if (admin) {
        actions = '<div class="route-actions">' +
          '<button class="btn btn-ghost btn-sm" data-ract="edit" data-id="' + r.id + '">' + esc(t("edit")) + "</button>" +
          '<button class="btn btn-danger btn-sm" data-ract="del" data-id="' + r.id + '">' + esc(t("delete")) + "</button>" +
          "</div>";
      }
      html += '<div class="route-row">' +
        '<span class="route-dot" style="background:' + esc(r.color || "#2457d6") + '"></span>' +
        '<span class="route-num" style="background:' + esc(r.color || "#2457d6") + '">' + esc(r.number || "—") + "</span>" +
        '<div class="route-name">' + esc(r.name) + "</div>" +
        '<span class="route-type">' + esc(typeName(r.type)) + "</span>" +
        actions + "</div>";
    });
    html += "</div>";
  });
  list.innerHTML = html;

  list.querySelectorAll("[data-ract]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const r = data.routes.find((x) => x.id === id);
      if (btn.dataset.ract === "edit") editRoute(r);
      else deleteRoute(r);
    });
  });
}

/* ================= 渲染：聊天 ================= */
function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const now = new Date();
  const pad = (n) => (n < 10 ? "0" + n : "" + n);
  const hm = pad(d.getHours()) + ":" + pad(d.getMinutes());
  if (d.toDateString() === now.toDateString()) return hm;
  return pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + hm;
}

function inlineMd(s) {
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  s = s.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  return s;
}

function renderMarkdown(src) {
  const lines = esc(src).replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let inCode = false;
  let codeBuf = [];
  let inList = false;
  let para = [];
  const flushPara = () => { if (para.length) { html += "<p>" + para.join("<br>") + "</p>"; para = []; } };
  const closeList = () => { if (inList) { html += "</ul>"; inList = false; } };
  for (const line of lines) {
    if (/^```/.test(line)) {
      if (inCode) { html += "<pre><code>" + codeBuf.join("\n") + "</code></pre>"; codeBuf = []; inCode = false; }
      else { flushPara(); closeList(); inCode = true; }
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }
    let m;
    if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
      flushPara(); closeList();
      const lv = m[1].length;
      html += "<h" + lv + ">" + inlineMd(m[2]) + "</h" + lv + ">";
      continue;
    }
    if ((m = line.match(/^&gt;\s?(.*)$/))) {
      flushPara(); closeList();
      html += "<blockquote>" + inlineMd(m[1]) + "</blockquote>";
      continue;
    }
    if ((m = line.match(/^\s*[-*+]\s+(.*)$/))) {
      flushPara();
      if (!inList) { html += "<ul>"; inList = true; }
      html += "<li>" + inlineMd(m[1]) + "</li>";
      continue;
    }
    if (line.trim() === "") { flushPara(); closeList(); continue; }
    closeList();
    para.push(inlineMd(line));
  }
  if (inCode) html += "<pre><code>" + codeBuf.join("\n") + "</code></pre>";
  flushPara(); closeList();
  return html;
}

function renderChat() {
  document.getElementById("chatTitle").textContent = t("chatTitle");
  document.getElementById("chatSub").textContent = t("chatSub");
  const wrap = document.getElementById("chatWrap");
  const me = myMember();
  if (!me) {
    stopChatPolling();
    wrap.innerHTML = '<div class="chat-locked">' +
      "<p>" + esc(t("chatNeedLogin")) + "</p>" +
      '<button class="btn btn-primary" id="chatGoMembers">' + esc(t("goRegister")) + "</button></div>";
    document.getElementById("chatGoMembers").addEventListener("click", () => switchPage("members"));
    return;
  }
  wrap.innerHTML =
    '<div class="chat-box" id="chatBox"></div>' +
    '<div class="chat-pending" id="chatPending"></div>' +
    '<div class="chat-input-bar">' +
    '<button class="chat-icon-btn" id="chatAttachFile" title="' + esc(t("chatAttach")) + '">' +
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M8 12l6-6a3 3 0 1 1 4 4l-7 7a5 5 0 1 1-7-7l6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    "</button>" +
    '<button class="chat-icon-btn" id="chatAttachLink" title="' + esc(t("chatAddLink")) + '">' +
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M10 14a4 4 0 0 0 6 0l2-2a4 4 0 0 0-6-6l-1 1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M14 10a4 4 0 0 0-6 0l-2 2a4 4 0 0 0 6 6l1-1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
    "</button>" +
    '<textarea id="chatInput" class="chat-input" rows="1" placeholder="' + esc(t("chatPlaceholder")) + '"></textarea>' +
    '<button class="btn btn-primary" id="chatSend">' + esc(t("send")) + "</button>" +
    "</div>" +
    '<div class="chat-hint">' + esc(t("chatAiHint")) + "</div>" +
    '<div class="mention-drop hidden" id="mentionDrop"></div>';
  document.getElementById("chatSend").addEventListener("click", sendChat);
  document.getElementById("chatAttachFile").addEventListener("click", attachFromPicker);
  document.getElementById("chatAttachLink").addEventListener("click", attachLink);
  const input = document.getElementById("chatInput");
  input.addEventListener("keydown", onChatKeydown);
  input.addEventListener("input", onChatInput);
  input.addEventListener("blur", () => setTimeout(hideMentionDrop, 150));
  renderPending();
  renderMessages();
  startChatPolling();
  loadMessages().then(() => { renderMessages(); markChatSeen(); }).catch(() => {});
  markChatSeen();
}

function attachmentHtml(list) {
  if (!list || !list.length) return "";
  return '<div class="chat-atts">' + list.map((a) => {
    if (a.type === "image") {
      return '<img class="chat-att-img" src="' + esc(a.url) + '" alt="' + esc(a.name || "") + '">';
    }
    if (a.type === "link") {
      return '<a class="chat-att" href="' + esc(a.url) + '" target="_blank" rel="noopener">' +
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M10 14a4 4 0 0 0 6 0l2-2a4 4 0 0 0-6-6l-1 1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M14 10a4 4 0 0 0-6 0l-2 2a4 4 0 0 0 6 6l1-1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg> ' +
        esc(a.name || a.url) + "</a>";
    }
    return '<a class="chat-att" href="' + esc(a.url) + '" target="_blank" rel="noopener" download>' +
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> ' +
      esc(a.name || t("attachFile")) + "</a>";
  }).join("") + "</div>";
}

function highlightMentions(html) {
  const names = data.members.map((m) => m.name).concat([AI_NAME]);
  return html.replace(/@([^\s@<>&]+)/g, (match, name) => {
    if (names.indexOf(name) !== -1) {
      const ai = name === AI_NAME;
      return '<span class="mention' + (ai ? " mention-ai" : "") + '">@' + esc(name) + "</span>";
    }
    return match;
  });
}

function renderMessages() {
  const box = document.getElementById("chatBox");
  if (!box) return;
  const me = myMember();
  const admin = isAdmin();
  let html = chatMessages.map((m) => {
    const isAi = m.member_id === AI_ID;
    const mine = me && m.member_id === me.id;
    const name = isAi ? AI_NAME : m.member_name;
    const avatar = isAi ? "AI" : (m.member_name || "?").charAt(0);
    return '<div class="chat-msg' + (mine ? " mine" : "") + (isAi ? " ai" : "") + '">' +
      '<div class="chat-avatar' + (isAi ? " ai-avatar" : "") + '">' + esc(avatar) + "</div>" +
      '<div class="chat-body">' +
      '<div class="chat-meta"><span class="chat-name">' + esc(name) + "</span>" +
      (isAi ? '<span class="chat-ai-tag">' + esc(t("aiBadge")) + "</span>" : "") +
      '<span class="chat-time">' + esc(formatTime(m.created_at)) + "</span>" +
      (admin ? '<button class="chat-del" data-mid="' + esc(m.id) + '" title="' + esc(t("delete")) + '">&times;</button>' : "") +
      "</div>" +
      (m.content ? '<div class="chat-text md">' + highlightMentions(renderMarkdown(m.content)) + "</div>" : "") +
      attachmentHtml(m.attachments) +
      "</div></div>";
  }).join("");
  if (aiThinking) {
    html += '<div class="chat-msg ai"><div class="chat-avatar ai-avatar">AI</div>' +
      '<div class="chat-body"><div class="chat-text md chat-thinking">' +
      esc(t("chatAiThinking")) + "</div></div></div>";
  }
  if (!html) {
    box.innerHTML = '<div class="chat-empty">' + esc(t("chatEmpty")) + "</div>";
    return;
  }
  box.innerHTML = html;
  box.querySelectorAll("[data-mid]").forEach((btn) => {
    btn.addEventListener("click", () => deleteMessage(btn.dataset.mid));
  });
  box.querySelectorAll(".chat-att-img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src));
  });
  box.scrollTop = box.scrollHeight;
}

async function loadMessages() {
  if (!isConfigured()) return;
  const rows = await restGet("messages?select=*&order=created_at.desc&limit=100");
  chatMessages = (rows || []).slice().reverse();
}

function startChatPolling() {
  stopChatPolling();
  chatTimer = setInterval(async () => {
    if (currentPage() !== "chat" || !myMember()) return;
    try {
      const oldSig = chatMessages.map((m) => m.id).join(",");
      await loadMessages();
      const newSig = chatMessages.map((m) => m.id).join(",");
      if (oldSig !== newSig) renderMessages();
      markChatSeen();
    } catch (e) {}
  }, 5000);
}

function stopChatPolling() {
  if (chatTimer) { clearInterval(chatTimer); chatTimer = null; }
}

async function sendChat() {
  const input = document.getElementById("chatInput");
  if (!input) return;
  const me = myMember();
  if (!me) { showToast(t("chatNeedLogin")); return; }
  const content = (input.value || "").trim();
  if (!content && pendingAttachments.length === 0) return;
  const mentionIds = collectMentions(content);
  const atts = pendingAttachments.slice();
  try {
    await rpc("chat_send", {
      p_member_id: me.id,
      p_content: content,
      p_attachments: atts,
      p_mention_ids: mentionIds
    });
    input.value = "";
    input.style.height = "auto";
    pendingAttachments = [];
    renderPending();
    await loadMessages();
    renderMessages();
    markChatSeen();
    if (mentionIds.indexOf(AI_ID) !== -1) askAI(content);
  } catch (e) {
    const msg = e.message || "";
    if (msg.indexOf("not registered") !== -1) showToast(t("chatNeedLogin"));
    else showToast(t("networkError") + " [" + msg + "]");
  }
}

function collectMentions(content) {
  const ids = [];
  const text = content || "";
  data.members.forEach((m) => {
    if (m.name && text.indexOf("@" + m.name) !== -1) ids.push(m.id);
  });
  if (text.indexOf("@" + AI_NAME) !== -1 || text.indexOf("@AI") !== -1) ids.push(AI_ID);
  return ids;
}

async function askAI(prompt) {
  if (!isConfigured()) return;
  aiThinking = true;
  renderMessages();
  try {
    const res = await fetch(SUPABASE_URL + "/functions/v1/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": "Bearer " + SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ p_member_id: myMemberId(), prompt: prompt })
    });
    if (!res.ok) {
      let msg = "HTTP " + res.status;
      try { const j = await res.json(); if (j && j.error) msg = j.error; } catch (e) {}
      throw new Error(msg);
    }
  } catch (e) {
    console.error("AI 调用失败:", e);
    showToast("AI: " + (e.message || t("networkError")));
  } finally {
    aiThinking = false;
    try { await loadMessages(); } catch (e) {}
    renderMessages();
  }
}

/* ---------- 附件上传 ---------- */
function attachFromPicker() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip";
  input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { showToast(t("fileTooBig")); return; }
    try {
      const url = await uploadToStorage(file);
      pendingAttachments.push({
        type: file.type.indexOf("image/") === 0 ? "image" : "file",
        name: file.name,
        url: url,
        size: file.size
      });
      renderPending();
    } catch (e) {
      showToast(t("uploadFailed") + " [" + (e.message || "") + "]");
    }
  });
  input.click();
}

async function uploadToStorage(file) {
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const path = uid() + (ext ? "." + ext : "");
  const res = await fetch(SUPABASE_URL + "/storage/v1/object/chat-files/" + path, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": "Bearer " + SUPABASE_ANON_KEY,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true"
    },
    body: file
  });
  if (!res.ok) {
    let d = "";
    try { d = await res.text(); } catch (e) {}
    throw new Error("HTTP " + res.status + " " + String(d).slice(0, 100));
  }
  return SUPABASE_URL + "/storage/v1/object/public/chat-files/" + path;
}

function attachLink() {
  const url = prompt(t("linkPrompt"));
  if (!url) return;
  if (!/^https?:\/\//i.test(url)) { showToast(t("linkPrompt")); return; }
  pendingAttachments.push({ type: "link", name: url, url: url });
  renderPending();
}

function renderPending() {
  const el = document.getElementById("chatPending");
  if (!el) return;
  if (!pendingAttachments.length) { el.innerHTML = ""; return; }
  el.innerHTML = pendingAttachments.map((a, i) =>
    '<span class="pending-chip">' +
    (a.type === "image" ? '<img src="' + esc(a.url) + '" alt="">' : "") +
    esc(a.type === "link" ? a.url : (a.name || "")) +
    '<button class="pending-del" data-i="' + i + '">&times;</button>' +
    "</span>"
  ).join("");
  el.querySelectorAll("[data-i]").forEach((btn) => {
    btn.addEventListener("click", () => {
      pendingAttachments.splice(Number(btn.dataset.i), 1);
      renderPending();
    });
  });
}

/* ---------- @ 提及自动补全 ---------- */
function onChatKeydown(e) {
  const drop = document.getElementById("mentionDrop");
  const dropOpen = drop && !drop.classList.contains("hidden");
  if (dropOpen && (e.key === "Enter" || e.key === "Tab")) {
    const first = drop.querySelector(".mention-item");
    if (first) { e.preventDefault(); first.dispatchEvent(new MouseEvent("mousedown")); return; }
  }
  if (e.key === "Escape") { hideMentionDrop(); return; }
  if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey && !dropOpen) {
    e.preventDefault();
    sendChat();
  }
}

function onChatInput(e) {
  const el = e.target;
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 120) + "px";
  updateMentionDrop(el);
}

function currentMentionQuery(el) {
  const pos = el.selectionStart;
  const before = el.value.slice(0, pos);
  const at = before.lastIndexOf("@");
  if (at === -1) return null;
  const seg = before.slice(at + 1);
  if (/\s/.test(seg)) return null;
  return { at: at, query: seg };
}

function updateMentionDrop(el) {
  const info = currentMentionQuery(el);
  if (!info) { hideMentionDrop(); return; }
  const q = info.query.toLowerCase();
  const list = [];
  if (q === "" || "香力ai".indexOf(q) !== -1 || AI_NAME.toLowerCase().indexOf(q) !== -1) {
    list.push({ id: AI_ID, name: AI_NAME, ai: true });
  }
  data.members.forEach((m) => {
    if (m.id === myMemberId()) return;
    if (q === "" || (m.name || "").toLowerCase().indexOf(q) !== -1) list.push({ id: m.id, name: m.name });
  });
  const top = list.slice(0, 8);
  const drop = document.getElementById("mentionDrop");
  if (!drop) return;
  if (!top.length) { hideMentionDrop(); return; }
  drop.innerHTML = top.map((m) =>
    '<div class="mention-item' + (m.ai ? " ai" : "") + '" data-name="' + esc(m.name) + '">' +
    (m.ai ? '<span class="chat-ai-tag">' + esc(t("aiBadge")) + "</span> " : "") + esc(m.name) + "</div>"
  ).join("");
  drop.classList.remove("hidden");
  drop.querySelectorAll(".mention-item").forEach((item) => {
    item.addEventListener("mousedown", (ev) => {
      ev.preventDefault();
      insertMention(el, info.at, item.dataset.name);
    });
  });
}

function insertMention(el, at, name) {
  const pos = el.selectionStart;
  const before = el.value.slice(0, at);
  const after = el.value.slice(pos);
  el.value = before + "@" + name + " " + after;
  const newPos = at + name.length + 2;
  el.selectionStart = el.selectionEnd = newPos;
  el.focus();
  hideMentionDrop();
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 120) + "px";
}

function hideMentionDrop() {
  const drop = document.getElementById("mentionDrop");
  if (drop) drop.classList.add("hidden");
}

/* ---------- @ 未读提醒 ---------- */
function setUnread(count) {
  const badge = document.getElementById("chatBadge");
  const banner = document.getElementById("mentionBanner");
  const on = count > 0;
  if (badge) badge.classList.toggle("hidden", !on);
  if (banner) {
    banner.classList.toggle("hidden", !on);
    if (on) banner.textContent = t("mentionBanner");
  }
}

async function markChatSeen() {
  const me = myMember();
  if (!me || !isConfigured()) return;
  try {
    await rpc("chat_seen", { p_member_id: me.id });
    setUnread(0);
  } catch (e) {}
}

async function checkUnread() {
  const me = myMember();
  if (!me || !isConfigured()) { setUnread(0); return; }
  try {
    const r = await rpc("chat_unread", { p_member_id: me.id });
    setUnread((r && r.count) || 0);
  } catch (e) {}
}

function startUnreadPolling() {
  stopUnreadPolling();
  unreadTimer = setInterval(() => {
    if (currentPage() !== "chat") checkUnread();
  }, 15000);
  checkUnread();
}

function stopUnreadPolling() {
  if (unreadTimer) { clearInterval(unreadTimer); unreadTimer = null; }
}

async function deleteMessage(id) {
  if (!confirm(t("confirmDelete"))) return;
  try {
    await adminRpc("admin_delete_message", { p_id: id });
    chatMessages = chatMessages.filter((m) => m.id !== id);
    renderMessages();
    showToast(t("deleted"));
  } catch (e) {}
}

/* ================= 渲染：管理员 ================= */
function renderAdmin() {
  document.getElementById("adminTitle").textContent = t("adminTitle");
  document.getElementById("adminSub").textContent = t("adminSub");
  const gate = document.getElementById("adminGate");
  const panel = document.getElementById("adminPanel");

  if (isAdmin()) {
    gate.innerHTML = "";
    gate.classList.add("hidden");
    panel.classList.remove("hidden");
    panel.innerHTML =
      '<div class="stat-grid">' +
      '<div class="stat"><b>' + data.companies.length + '</b><span>' + esc(t("totalCompanies")) + "</span></div>" +
      '<div class="stat"><b>' + data.members.length + '</b><span>' + esc(t("totalMembers")) + "</span></div>" +
      '<div class="stat"><b>' + data.routes.length + '</b><span>' + esc(t("totalRoutes")) + "</span></div>" +
      "</div>" +
      '<div class="card"><div class="card-title">' + esc(t("quickEdit")) + "</div>" +
      '<div class="admin-menu">' +
      '<div class="admin-menu-item" data-go="home">' + esc(t("editHome")) + "</div>" +
      '<div class="admin-menu-item" data-go="company">' + esc(t("manageCompanies")) + "</div>" +
      '<div class="admin-menu-item" data-go="members">' + esc(t("manageMembers")) + "</div>" +
      '<div class="admin-menu-item" data-go="routes">' + esc(t("manageRoutes")) + "</div>" +
      "</div></div>" +
      '<div class="card"><div class="card-title">' + esc(t("aiSettings")) + '</div><div id="aiSettingsBox"></div></div>' +
      '<button class="btn btn-danger" id="btnLogout">' + esc(t("logout")) + "</button>";

    panel.querySelectorAll("[data-go]").forEach((el) => {
      el.addEventListener("click", () => switchPage(el.dataset.go));
    });
    document.getElementById("btnLogout").addEventListener("click", () => {
      localStorage.removeItem(KEY_ADMIN_PW);
      renderAll();
      showToast(t("logout"));
    });
    loadAiSettings();
  } else {
    gate.classList.remove("hidden");
    panel.classList.add("hidden");
    panel.innerHTML = "";
    gate.innerHTML =
      '<div class="gate">' +
      '<div class="gate-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="none"><path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div>' +
      "<p>" + esc(t("adminGateSub")) + "</p>" +
      '<input type="password" id="adminPass" placeholder="' + esc(t("password")) + '">' +
      '<div><button class="btn btn-primary" id="btnLogin">' + esc(t("enterAdmin")) + "</button></div>" +
      "</div>";
    document.getElementById("btnLogin").addEventListener("click", doLogin);
    document.getElementById("adminPass").addEventListener("keydown", (e) => {
      if (e.key === "Enter") doLogin();
    });
  }
}

async function doLogin() {
  const val = document.getElementById("adminPass").value;
  if (!isConfigured()) { showToast(t("notConfigured")); return; }
  try {
    const result = await rpc("admin_login", { pw: val });
    if (result === true) {
      localStorage.setItem(KEY_ADMIN_PW, val);
      showToast(t("loginSuccess"));
      renderAdmin();
    } else {
      showToast(t("wrongPassword"));
    }
  } catch (e) {
    showToast(t("networkError"));
  }
}

async function loadAiSettings() {
  const box = document.getElementById("aiSettingsBox");
  if (!box) return;
  box.innerHTML = '<div class="chat-empty">' + esc(t("loading")) + "</div>";
  const pw = localStorage.getItem(KEY_ADMIN_PW) || "";
  let c;
  try {
    c = await rpc("admin_get_ai_config", { pw: pw });
  } catch (e) {
    box.innerHTML = '<div class="chat-empty">' + esc(t("networkError")) + "</div>";
    return;
  }
  box.innerHTML =
    '<div class="field"><label><input type="checkbox" id="aiEnabled"' + (c.enabled ? " checked" : "") + "> " + esc(t("aiEnabled")) + "</label></div>" +
    '<div class="field"><label>' + esc(t("aiModel")) + '</label><input id="aiModel" value="' + esc(c.model || "") + '"></div>' +
    '<div class="field"><label>' + esc(t("aiBaseUrl")) + '</label><input id="aiBaseUrl" value="' + esc(c.base_url || "") + '"></div>' +
    '<div class="field"><label>' + esc(t("aiTemperature")) + '</label><input id="aiTemp" type="number" step="0.1" min="0" max="1" value="' + esc(String(c.temperature != null ? c.temperature : 0.7)) + '"></div>' +
    '<div class="field"><label>' + esc(t("aiSystemPrompt")) + '</label><textarea id="aiPrompt" style="min-height:110px">' + esc(c.system_prompt || "") + "</textarea></div>" +
    '<div class="field"><label>' + esc(t("aiApiKey")) + (c.has_custom_key ? "（" + esc(t("aiKeySet")) + "）" : "") + '</label><input id="aiKey" type="password" autocomplete="new-password" placeholder="' + esc(t("aiApiKey")) + '"></div>' +
    '<button class="btn btn-primary" id="aiSave">' + esc(t("save")) + "</button>";
  document.getElementById("aiSave").addEventListener("click", saveAiSettings);
}

async function saveAiSettings() {
  const temp = parseFloat(document.getElementById("aiTemp").value);
  try {
    await adminRpc("admin_set_ai_config", {
      p_enabled: document.getElementById("aiEnabled").checked,
      p_model: document.getElementById("aiModel").value.trim(),
      p_base_url: document.getElementById("aiBaseUrl").value.trim(),
      p_system_prompt: document.getElementById("aiPrompt").value,
      p_temperature: isNaN(temp) ? null : temp,
      p_api_key: document.getElementById("aiKey").value.trim()
    });
    showToast(t("aiSaved"));
    loadAiSettings();
  } catch (e) {}
}

/* ================= 成员操作 ================= */
async function resolveMember() {
  const input = document.getElementById("memberNameInput");
  const name = (input.value || "").trim();
  if (!name) { showToast(t("nameRequired")); return; }
  if (!isConfigured()) { showToast(t("notConfigured")); return; }
  try {
    const result = await rpc("member_resolve", { p_name: name });
    localStorage.setItem(KEY_MEMBER, result.id);
    await refresh();
    showToast(result.created ? t("memberCreated") : t("memberLoginSuccess"));
    renderMembers();
  } catch (e) {
    showToast(t("networkError"));
  }
}

async function editMember(member) {
  const isNew = !member;
  const name = isNew ? "" : member.name;
  openModal(
    t(isNew ? "addMember" : "edit"),
    '<div class="field"><label>' + esc(t("name")) + '</label>' +
      '<input id="fName" value="' + esc(name) + '" placeholder="' + esc(t("memberNamePlaceholder")) + '"></div>',
    '<button class="btn btn-ghost" id="fCancel">' + esc(t("cancel")) + "</button>" +
      '<button class="btn btn-primary" id="fSave">' + esc(t("save")) + "</button>"
  );
  document.getElementById("fCancel").addEventListener("click", closeModal);
  document.getElementById("fSave").addEventListener("click", async () => {
    const n = document.getElementById("fName").value.trim();
    if (!n) { showToast(t("nameRequired")); return; }
    try {
      if (isNew) {
        await adminRpc("admin_create_member", { p_id: uid(), p_name: n });
      } else {
        await adminRpc("admin_update_member", { p_id: member.id, p_name: n });
      }
      closeModal();
      renderMembers();
      showToast(t("saved"));
    } catch (e) {}
  });
}

async function deleteMember(member) {
  if (!confirm(t("confirmDelete"))) return;
  try {
    await adminRpc("admin_delete_member", { p_id: member.id });
    data.members = data.members.filter((m) => m.id !== member.id);
    data.companies.forEach((c) => { c.member_ids = (c.member_ids || []).filter((id) => id !== member.id); });
    if (myMemberId() === member.id) localStorage.removeItem(KEY_MEMBER);
    renderMembers();
    showToast(t("deleted"));
  } catch (e) {}
}

/* ================= 公司操作 ================= */
function editCompany(company) {
  const isNew = !company;
  const name = isNew ? "" : company.name;
  const memberIds = company ? (company.member_ids || []) : [];
  const routeIds = company ? (company.route_ids || []) : [];

  const memberChecks = data.members.map((m) =>
    '<label class="check-item"><input type="checkbox" value="' + m.id + '"' +
    (memberIds.includes(m.id) ? " checked" : "") + ">" + esc(m.name) + "</label>"
  ).join("");
  const routeChecks = data.routes.map((r) =>
    '<label class="check-item"><input type="checkbox" value="' + r.id + '"' +
    (routeIds.includes(r.id) ? " checked" : "") + '><span class="route-dot" style="background:' + esc(r.color || '#2457d6') + ';width:10px;height:10px"></span>' +
    esc(r.number ? r.number + " " : "") + esc(r.name) + "</label>"
  ).join("");

  openModal(
    t(isNew ? "addCompany" : "edit"),
    '<div class="field"><label>' + esc(t("name")) + '</label>' +
      '<input id="fName" value="' + esc(name) + '" placeholder="' + esc(t("companyNamePlaceholder")) + '"></div>' +
      '<div class="field"><label>' + esc(t("selectMembers")) + "</label>" +
      '<div class="check-list" id="memberCheckList">' + (memberChecks || '<div style="color:var(--muted);font-size:13px">' + esc(t("emptyMembers")) + "</div>") + "</div></div>" +
      '<div class="field"><label>' + esc(t("selectRoutes")) + "</label>" +
      '<div class="check-list" id="routeCheckList">' + (routeChecks || '<div style="color:var(--muted);font-size:13px">' + esc(t("emptyRoutes")) + "</div>") + "</div></div>",
    '<button class="btn btn-ghost" id="fCancel">' + esc(t("cancel")) + "</button>" +
      '<button class="btn btn-primary" id="fSave">' + esc(t("save")) + "</button>"
  );
  document.getElementById("fCancel").addEventListener("click", closeModal);
  document.getElementById("fSave").addEventListener("click", async () => {
    const n = document.getElementById("fName").value.trim();
    if (!n) { showToast(t("nameRequired")); return; }
    const mIds = Array.from(document.querySelectorAll('#memberCheckList input[type="checkbox"]:checked')).map((c) => c.value);
    const rIds = Array.from(document.querySelectorAll('#routeCheckList input[type="checkbox"]:checked')).map((c) => c.value);
    try {
      if (isNew) {
        await adminRpc("admin_create_company", { p_id: uid(), p_name: n, p_member_ids: mIds, p_route_ids: rIds });
      } else {
        await adminRpc("admin_update_company", { p_id: company.id, p_name: n, p_member_ids: mIds, p_route_ids: rIds });
      }
      closeModal();
      renderCompany();
      showToast(t("saved"));
    } catch (e) {}
  });
}

async function deleteCompany(company) {
  if (!confirm(t("confirmDelete"))) return;
  try {
    await adminRpc("admin_delete_company", { p_id: company.id });
    data.companies = data.companies.filter((c) => c.id !== company.id);
    renderCompany();
    showToast(t("deleted"));
  } catch (e) {}
}

/* ================= 线路操作 ================= */
function editRoute(route) {
  const isNew = !route;
  const typeOptions = ROUTE_TYPES.map((rt) =>
    '<option value="' + rt.key + '"' + (route && route.type === rt.key ? " selected" : "") + ">" + esc(rt[lang]) + "</option>"
  ).join("");

  openModal(
    t(isNew ? "addRoute" : "edit"),
    '<div class="field"><label>' + esc(t("name")) + '</label>' +
      '<input id="fName" value="' + esc(route ? route.name : "") + '" placeholder="' + esc(t("routeNamePlaceholder")) + '"></div>' +
      '<div class="field"><label>' + esc(t("number")) + '</label>' +
      '<input id="fNumber" value="' + esc(route ? route.number : "") + '" placeholder="' + esc(t("routeNumberPlaceholder")) + '"></div>' +
      '<div class="field"><label>' + esc(t("type")) + '</label><select id="fType">' + typeOptions + "</select></div>" +
      '<div class="field"><label>' + esc(t("color")) + '</label>' +
      '<div class="color-wrap"><input type="color" id="fColor" value="' + esc(route && route.color ? route.color : "#2457d6") + '">' +
      '<span class="color-hex" id="fColorHex">' + esc(route && route.color ? route.color : "#2457d6") + "</span></div></div>",
    '<button class="btn btn-ghost" id="fCancel">' + esc(t("cancel")) + "</button>" +
      '<button class="btn btn-primary" id="fSave">' + esc(t("save")) + "</button>"
  );
  document.getElementById("fCancel").addEventListener("click", closeModal);
  const colorInput = document.getElementById("fColor");
  const colorHex = document.getElementById("fColorHex");
  colorInput.addEventListener("input", () => { colorHex.textContent = colorInput.value; });
  document.getElementById("fSave").addEventListener("click", async () => {
    const n = document.getElementById("fName").value.trim();
    if (!n) { showToast(t("nameRequired")); return; }
    const payload = {
      p_id: isNew ? uid() : route.id,
      p_name: n,
      p_number: document.getElementById("fNumber").value.trim(),
      p_type: document.getElementById("fType").value,
      p_color: colorInput.value
    };
    try {
      if (isNew) {
        await adminRpc("admin_create_route", payload);
      } else {
        await adminRpc("admin_update_route", payload);
      }
      closeModal();
      renderRoutes();
      showToast(t("saved"));
    } catch (e) {}
  });
}

async function deleteRoute(route) {
  if (!confirm(t("confirmDelete"))) return;
  try {
    await adminRpc("admin_delete_route", { p_id: route.id });
    data.routes = data.routes.filter((r) => r.id !== route.id);
    data.companies.forEach((c) => { c.route_ids = (c.route_ids || []).filter((id) => id !== route.id); });
    renderRoutes();
    showToast(t("deleted"));
  } catch (e) {}
}

/* ================= 首页编辑 ================= */
function uploadMap() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/png,image/jpeg,image/webp,image/*";
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const processed = await processImage(reader.result, 3000);
        await adminRpc("admin_save_home", {
          p_image: processed,
          p_intro_zh: data.home.introZh,
          p_intro_en: data.home.introEn
        });
        mapImage = processed;
        renderHome();
        showToast(t("saved"));
      } catch (e) {}
    };
    reader.readAsDataURL(file);
  });
  input.click();
}

function processImage(dataUrl, maxWidth) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.width <= maxWidth) { resolve(dataUrl); return; }
      const ratio = maxWidth / img.width;
      const w = maxWidth;
      const h = Math.round(img.height * ratio);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
      let out = dataUrl;
      try {
        out = canvas.toDataURL("image/png");
      } catch (e) {
        out = dataUrl;
      }
      if (out.length > 6 * 1024 * 1024) {
        try { out = canvas.toDataURL("image/jpeg", 0.95); } catch (e) {}
      }
      resolve(out);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function editIntro() {
  openModal(
    t("editIntro"),
    '<div class="field"><label>' + esc(t("introZhLabel")) + '</label>' +
      '<textarea id="fIntroZh">' + esc(data.home.introZh) + "</textarea></div>" +
      '<div class="field"><label>' + esc(t("introEnLabel")) + '</label>' +
      '<textarea id="fIntroEn">' + esc(data.home.introEn) + "</textarea></div>",
    '<button class="btn btn-ghost" id="fCancel">' + esc(t("cancel")) + "</button>" +
      '<button class="btn btn-primary" id="fSave">' + esc(t("save")) + "</button>"
  );
  document.getElementById("fCancel").addEventListener("click", closeModal);
  document.getElementById("fSave").addEventListener("click", async () => {
    try {
      await adminRpc("admin_save_home", {
        p_image: mapImage,
        p_intro_zh: document.getElementById("fIntroZh").value,
        p_intro_en: document.getElementById("fIntroEn").value
      });
      closeModal();
      renderHome();
      showToast(t("saved"));
    } catch (e) {}
  });
}

/* ================= 语言切换 ================= */
function applyLang() {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.getElementById("langBtn").textContent = lang === "zh" ? "EN" : "中";
  document.getElementById("authorLabel").textContent = t("authorLabel");
  document.getElementById("authorLink").textContent = lang === "zh" ? "@呱瓜多米" : "@Guagua Domi";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  renderActive();
}
$("#langBtn").addEventListener("click", () => {
  lang = lang === "zh" ? "en" : "zh";
  localStorage.setItem(KEY_LANG, lang);
  applyLang();
});

const mentionBanner = document.getElementById("mentionBanner");
if (mentionBanner) mentionBanner.addEventListener("click", () => switchPage("chat"));

/* ================= 启动 ================= */
(async function init() {
  applyLang();
  if (!isConfigured()) {
    showToast(t("notConfigured"));
    renderHome();
    return;
  }
  try {
    await refresh();
    await loadMapImage();
  } catch (e) {
    console.error("刷新数据失败:", e);
    showToast(t("networkError") + " [" + (e.message || e) + "]");
  }
  renderHome();
  startUnreadPolling();
})();
