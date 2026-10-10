// 香力 AI · Supabase Edge Function
// 作用：服务端调用智谱 GLM（OpenAI 兼容接口），API Key 只从环境变量/数据库读取，绝不返回给前端。
// 需要在 Supabase 后台为函数添加 Secret：AI_API_KEY，值为你的智谱 Key。

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const DEFAULT_SYSTEM = `你是“香力AI”，香力城市交通管理网站的官方智能助手。你非常熟悉 MTR（我的世界铁路模组）以及香力城市、香速铁道、各运营公司、线路类型（轻轨、高速列车、城际列车、市域快车、地铁、公交、捷运、普速列车、轮渡）等相关信息。请用简体中文、友好而专业地回答用户关于香力城市交通的问题，并在用户询问建设线路建议时给出实用、合理、有创意的规划建议。回答尽量简洁清晰。`;

const AI_ID = "__ai__";
const AI_NAME = "香力AI";

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" }
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);

  try {
    const body = await req.json();
    const memberId = String(body.p_member_id || "").trim();
    const prompt = String(body.prompt || "").trim();
    if (!memberId) return json({ error: "not registered" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    const { data: member } = await supabase
      .from("members").select("id,name").eq("id", memberId).maybeSingle();
    if (!member) return json({ error: "not registered" }, 401);

    const { data: cfg } = await supabase
      .from("ai_config").select("*").eq("id", 1).maybeSingle();

    if (cfg && cfg.enabled === false) {
      await insertAi(supabase, "（香力AI 当前已被管理员关闭）");
      return json({ ok: true, reply: "（香力AI 当前已被管理员关闭）" });
    }

    const apiKey = (cfg && cfg.api_key) ? cfg.api_key : (Deno.env.get("AI_API_KEY") || "");
    const baseUrl = ((cfg && cfg.base_url) || Deno.env.get("AI_BASE_URL") || "https://open.bigmodel.cn/api/paas/v4").replace(/\/+$/, "");
    const model = (cfg && cfg.model) || Deno.env.get("AI_MODEL") || "glm-4-flash";
    const systemPrompt = (cfg && cfg.system_prompt) || DEFAULT_SYSTEM;
    const temperature = cfg && cfg.temperature != null ? Number(cfg.temperature) : 0.7;

    if (!apiKey) {
      const msg = "（香力AI 尚未配置 API Key，请联系管理员）";
      await insertAi(supabase, msg);
      return json({ ok: true, reply: msg });
    }

    const { data: recent } = await supabase
      .from("messages")
      .select("member_id,member_name,content,created_at")
      .order("created_at", { ascending: false })
      .limit(16);

    const convo = (recent || []).reverse()
      .filter((m) => (m.content || "").trim().length > 0)
      .map((m) => ({
        role: m.member_id === AI_ID ? "assistant" : "user",
        content: m.member_id === AI_ID ? m.content : (m.member_name + "： " + m.content)
      }));

    const hasUser = convo.some((m) => m.role === "user");
    if (!hasUser && prompt) convo.push({ role: "user", content: prompt });

    const messages = [{ role: "system", content: systemPrompt }, ...convo];

    const resp = await fetch(baseUrl + "/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({ model, messages, temperature, max_tokens: 1024 })
    });

    const data = await resp.json();
    let reply = "";
    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      reply = String(data.choices[0].message.content || "");
    }
    if (!reply) {
      reply = "（香力AI 暂时无法回复：" + JSON.stringify(data).slice(0, 200) + "）";
    }

    await insertAi(supabase, reply);
    return json({ ok: true, reply });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});

async function insertAi(supabase, content) {
  const id = "ai-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  await supabase.from("messages").insert({
    id,
    member_id: AI_ID,
    member_name: AI_NAME,
    content,
    attachments: [],
    mentions: []
  });
}
