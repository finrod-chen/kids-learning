let PAGE = null, PAGE_AT = 0; const IMG = {};
const H = { "content-type": "application/json;charset=utf-8", "cache-control": "no-store" };
const J = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: H });
const QID = /^kids-(g[13])-(\d{4}W\d{2}|\d{8})-(sci|lit|vocab)-q(\d{1,2})$/;
const DAYS = 7;
const MAX_USERS = 8;
const STATE_KEYS = ["math", "news", "chores", "chpts", "chrw", "chbank", "write", "stick"];
const daysOf = (url) => { const n = Number(url.searchParams.get("days")); return n >= 1 ? Math.min(60, Math.floor(n)) : DAYS; };
function cutoff(days = DAYS) { const d = new Date(Date.now() + 8 * 3600000 - (days - 1) * 86400000); return d.toISOString().slice(0, 10).replace(/-/g, ""); }
function today() { return new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 10).replace(/-/g, ""); }
function rowOut(r) {
  const o = { qid: r.qid, articleId: r.article_id, week: r.week, grade: r.grade, firstChoice: r.first_choice, firstCorrect: !!r.first_correct,
    lastChoice: r.last_choice, lastCorrect: !!r.last_correct, tries: r.tries, firstAt: r.first_at, lastAt: r.last_at };
  if (r.uid) o.uid = r.uid;
  return o;
}
async function readBody(req, max) {
  const len = Number(req.headers.get("content-length") || 0);
  if (len > max) return { err: J({ error: "too_large" }, 413) };
  try { const t = await req.text(); if (t.length > max) return { err: J({ error: "too_large" }, 413) }; return { body: JSON.parse(t) }; }
  catch { return { err: J({ error: "bad_json" }, 400) }; }
}
const enc = new TextEncoder();
const hex = async (s) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(s)))].map(b => b.toString(16).padStart(2, "0")).join("");
let PINROW = null, PIN_AT = 0;
async function pinRow(env) {
  if (!PINROW || Date.now() - PIN_AT > 15000) {
    const r = await env.DB.prepare("SELECT code FROM tools WHERE name = 'pin'").first();
    PINROW = r ? JSON.parse(r.code) : null; PIN_AT = Date.now();
  }
  return PINROW;
}
function getCookie(req, n) { const m = (req.headers.get("cookie") || "").match(new RegExp("(?:^|; )" + n + "=([^;]*)")); return m ? m[1] : ""; }
async function authed(req, env) {
  const p = await pinRow(env); if (!p) return true;
  const t = getCookie(req, "kp"); return !!t && t === await hex(p.hash + ":" + p.ver);
}
async function cookieFor(p) { return "kp=" + await hex(p.hash + ":" + p.ver) + "; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax"; }
const JC = (d, c, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { ...H, "set-cookie": c } });
async function checkLock(env, ip) {
  const r = await env.DB.prepare("SELECT code FROM tools WHERE name = ?").bind("pf:" + ip).first();
  const o = r ? JSON.parse(r.code) : { n: 0, until: 0 };
  return { o, locked: o.until > Date.now() };
}
const getUser = (env, id) => env.DB.prepare("SELECT id, nick, grade FROM users WHERE id = ?").bind(String(id || "")).first();
const DEF_CHORES = [
  { id: "c1", t: "擺碗筷", z: ["ㄅㄞˇ", "ㄨㄢˇ", "ㄎㄨㄞˋ"], e: "🍚", on: true },
  { id: "c2", t: "洗碗", z: ["ㄒㄧˇ", "ㄨㄢˇ"], e: "🍽️", on: true },
  { id: "c3", t: "擦桌子", z: ["ㄘㄚ", "ㄓㄨㄛ", "ㄗ˙"], e: "🧽", on: true },
  { id: "c4", t: "掃地", z: ["ㄙㄠˇ", "ㄉㄧˋ"], e: "🧹", on: true },
  { id: "c5", t: "倒垃圾", z: ["ㄉㄠˋ", "ㄌㄜˋ", "ㄙㄜˋ"], e: "🗑️", on: true },
  { id: "c6", t: "摺衣服", z: ["ㄓㄜˊ", "ㄧ", "ㄈㄨˊ"], e: "👕", on: true },
  { id: "c7", t: "整理房間", z: ["ㄓㄥˇ", "ㄌㄧˇ", "ㄈㄤˊ", "ㄐㄧㄢ"], e: "🛏️", on: true },
  { id: "c8", t: "澆花", z: ["ㄐㄧㄠ", "ㄏㄨㄚ"], e: "🌻", on: true }
];
async function loadChores(env) {
  const r = await env.DB.prepare("SELECT code FROM tools WHERE name = 'chores'").first();
  if (r) { try { const a = JSON.parse(r.code); if (Array.isArray(a)) return a; } catch { } }
  return DEF_CHORES;
}
const BPMF = /^[ㄅ-ㄩˉˊˇˋ˙]{1,6}$/;
const cleanTxt = (s, n) => String(s || "").replace(/[\u0000-\u001f\u007f<>&"']/g, "").trim().slice(0, n);
function cleanChores(a) {
  if (!Array.isArray(a) || a.length > 20) return null;
  const out = [], seen = new Set();
  for (const x of a) {
    if (!x || typeof x !== "object") return null;
    const id = String(x.id || "");
    if (!/^[a-z][a-z0-9]{0,5}$/.test(id) || seen.has(id)) return null;
    const t = cleanTxt(x.t, 8); if (!t) return null;
    const o = { id, t, e: cleanTxt(x.e, 8) || "✨", on: x.on !== false };
    if (Array.isArray(x.z) && x.z.length === [...t].length && x.z.every(s => s === "" || (typeof s === "string" && BPMF.test(s)))) o.z = x.z;
    out.push(o); seen.add(id);
  }
  return out;
}
/* ---- 聊聊芽：苗苗 (chat via n8n) ---- */
const N8N = "https://n8n.finrod.xyz/webhook/";
const CHAT_DAY_MAX = 40;
let ZD = null;
async function zyDict(env) {
  if (ZD) return ZD;
  const r = await env.DB.prepare("SELECT code FROM tools WHERE name = 'zydict'").first();
  const c = new Map(), p = new Map(); let maxLen = 1;
  if (r && r.code) {
    try {
      const bin = atob(r.code); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
      const d = JSON.parse(await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream("gzip"))).text());
      const re = /([^㄀-ㄯˇˊˋ˙ˉ])([㄀-ㄯˇˊˋ˙ˉ]+)/gu; let m;
      while ((m = re.exec(d.c))) c.set(m[1], m[2]);
      for (const [k, v] of Object.entries(d.p)) { p.set(k, v.split(" ")); maxLen = Math.max(maxLen, [...k].length); }
    } catch (e) { }
    try {
      const pr = await env.DB.prepare("SELECT code FROM tools WHERE name = 'zydict:patch'").first();
      if (pr) { const P = JSON.parse(pr.code); (P.del || []).forEach(k => p.delete(k)); for (const [k, v] of Object.entries(P.set || {})) { p.set(k, v.split(" ")); maxLen = Math.max(maxLen, [...k].length); } }
    } catch (e) { }
  }
  ZD = { c, p, maxLen };
  return ZD;
}
const ZY_FIX = { "一": "ㄧ", "不": "ㄅㄨˋ" };
function zyAnno(D, text) {
  const t = [...text], z = new Array(t.length).fill("");
  let i = 0;
  while (i < t.length) {
    let hit = 0;
    for (let L = Math.min(D.maxLen, t.length - i); L >= 2; L--) {
      const w = D.p.get(t.slice(i, i + L).join(""));
      if (w) { for (let k = 0; k < L; k++) z[i + k] = w[k]; hit = L; break; }
    }
    if (hit) { i += hit; continue; }
    const ch = t[i];
    if (ch === "地" && i > 0 && t[i - 1] === t[i - 2] && /[一-鿿]/.test(t[i - 1])) z[i] = "ㄉㄜ˙";
    else z[i] = ZY_FIX[ch] || D.c.get(ch) || "";
    i++;
  }
  return z.join("|");
}
const cleanQ = (s, n) => String(s || "").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, n);
async function n8nCall(env, path, body, ms) {
  const r = await fetch(N8N + path, { method: "POST", headers: { "content-type": "application/json", "x-yaya-key": env.N8N_KEY || "" }, body: JSON.stringify(body), signal: AbortSignal.timeout(ms) });
  const t = await r.text();
  if (!r.ok || !t) throw new Error("n8n " + r.status);
  return JSON.parse(t);
}
function chatRow(r) {
  const o = { id: r.id, role: r.role, t: r.t, z: r.z || "", at: r.at };
  if (r.src) { try { o.src = JSON.parse(r.src); } catch { } }
  return o;
}
async function chatLeft(env, uid) {
  const c = await env.DB.prepare("SELECT COUNT(*) AS n FROM uchat WHERE uid = ? AND day = ? AND role = 'user'").bind(uid, today()).first();
  return Math.max(0, CHAT_DAY_MAX - (c ? c.n : 0));
}
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const p = url.pathname;
    if (req.method === "GET" && p === "/manifest.webmanifest") return new Response("{\"name\":\"芽芽學堂\",\"short_name\":\"芽芽學堂\",\"lang\":\"zh-Hant-TW\",\"start_url\":\"/\",\"scope\":\"/\",\"display\":\"standalone\",\"background_color\":\"#F8F4E6\",\"theme_color\":\"#F8F4E6\",\"icons\":[{\"src\":\"/img/main-192.webp\",\"sizes\":\"192x192\",\"type\":\"image/webp\",\"purpose\":\"any\"},{\"src\":\"/img/main-512.webp\",\"sizes\":\"512x512\",\"type\":\"image/webp\",\"purpose\":\"any\"}]}", { headers: { "content-type": "application/manifest+json;charset=utf-8", "cache-control": "public, max-age=3600" } });
    if (req.method === "GET" && p === "/sw.js") return new Response("/* 芽芽學堂 service worker — network-first for the page and data, cache-first for images and stroke data */\nconst V = \"yaya-v2\";\nconst PAGE = \"page-\" + V, DATA = \"data-\" + V, ASSET = \"asset-\" + V;\nself.addEventListener(\"install\", e => { self.skipWaiting(); });\nself.addEventListener(\"activate\", e => {\n  e.waitUntil((async () => {\n    const keep = [PAGE, DATA, ASSET];\n    for (const k of await caches.keys()) if (!keep.includes(k)) await caches.delete(k);\n    await self.clients.claim();\n  })());\n});\nasync function networkFirst(req, cacheName, key) {\n  const c = await caches.open(cacheName);\n  try {\n    const r = await fetch(req);\n    if (r.ok) c.put(key || req, r.clone()).catch(() => {});\n    return r;\n  } catch (err) {\n    const hit = await c.match(key || req);\n    if (hit) return hit;\n    throw err;\n  }\n}\nasync function cacheFirst(req, cacheName) {\n  const c = await caches.open(cacheName);\n  const hit = await c.match(req);\n  if (hit) return hit;\n  const r = await fetch(req);\n  if (r.ok || r.type === \"opaque\") c.put(req, r.clone()).catch(() => {});\n  return r;\n}\nself.addEventListener(\"fetch\", e => {\n  const req = e.request;\n  if (req.method !== \"GET\") return;\n  const u = new URL(req.url);\n  if (u.origin === location.origin) {\n    if (req.mode === \"navigate\" || u.pathname === \"/\" || u.pathname === \"/index.html\") {\n      if (u.pathname === \"/__next\") return;\n      e.respondWith(networkFirst(req, PAGE, \"/\"));\n      return;\n    }\n    if (u.pathname.startsWith(\"/api/\")) { e.respondWith(networkFirst(req, DATA)); return; }\n    if (u.pathname.startsWith(\"/img/\") || u.pathname === \"/favicon.ico\" || u.pathname === \"/apple-touch-icon.png\") { e.respondWith(cacheFirst(req, ASSET)); return; }\n    return;\n  }\n  if (u.hostname === \"raw.githubusercontent.com\" || u.hostname === \"fonts.googleapis.com\" || u.hostname === \"fonts.gstatic.com\") {\n    e.respondWith(cacheFirst(req, ASSET));\n  }\n});\n", { headers: { "content-type": "text/javascript;charset=utf-8", "cache-control": "no-cache", "service-worker-allowed": "/" } });
    if (req.method === "GET" && p === "/__next") {
      const r = await env.DB.prepare("SELECT code FROM tools WHERE name = 'page:next'").first();
      if (!r) return new Response("Not found", { status: 404 });
      return new Response(r.code, { headers: { "content-type": "text/html;charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" } });
    }
    if (req.method === "GET" && (p === "/" || p === "/index.html")) {
      if (!PAGE || Date.now() - PAGE_AT > 60000) {
        const r = await env.DB.prepare("SELECT code FROM tools WHERE name = 'page'").first();
        PAGE = r ? r.code : "<!doctype html><meta charset=utf-8><p>閱讀小站準備中</p>"; PAGE_AT = Date.now();
      }
      return new Response(PAGE, { headers: { "content-type": "text/html;charset=utf-8", "cache-control": "no-cache", "x-content-type-options": "nosniff", "referrer-policy": "no-referrer" } });
    }
    if (p === "/api/pin" && req.method === "GET") {
      const pr = await pinRow(env); return J({ set: !!pr, ok: await authed(req, env) });
    }
    if (p === "/api/pin" && req.method === "POST") {
      const pr = await pinRow(env);
      const { body, err } = await readBody(req, 256); if (err) return err;
      const pin = String(body.pin || "");
      if (!pr) return J({ error: "no_pin" }, 400);
      const ip = (req.headers.get("cf-connecting-ip") || "x").slice(0, 60);
      const { o, locked } = await checkLock(env, ip);
      if (locked) return J({ error: "locked" }, 429);
      if (/^\d{6}$/.test(pin) && await hex(pr.salt + pin) === pr.hash) {
        await env.DB.prepare("DELETE FROM tools WHERE name = ?").bind("pf:" + ip).run();
        return JC({ ok: true }, await cookieFor(pr));
      }
      o.n = (o.n || 0) + 1; if (o.n >= 5) { o.until = Date.now() + 5 * 60000; o.n = 0; }
      await env.DB.prepare("INSERT INTO tools (name, code, updated_at) VALUES (?1, ?2, ?3) ON CONFLICT(name) DO UPDATE SET code = excluded.code, updated_at = excluded.updated_at")
        .bind("pf:" + ip, JSON.stringify(o), new Date().toISOString()).run();
      await env.DB.prepare("DELETE FROM tools WHERE name LIKE 'pf:%' AND updated_at < ?").bind(new Date(Date.now() - 86400000).toISOString()).run();
      return J({ error: "bad_pin" }, 401);
    }
    if (p === "/api/pin/change" && req.method === "POST") {
      if (!(await authed(req, env))) return J({ error: "locked" }, 401);
      const pr = await pinRow(env);
      const { body, err } = await readBody(req, 256); if (err) return err;
      const ip = (req.headers.get("cf-connecting-ip") || "x").slice(0, 60);
      const { o, locked } = await checkLock(env, ip);
      if (locked) return J({ error: "locked" }, 429);
      const oldp = String(body.old || ""), nw = String(body.new || "");
      if (!pr || !/^\d{6}$/.test(nw) || await hex(pr.salt + oldp) !== pr.hash) {
        o.n = (o.n || 0) + 1; if (o.n >= 5) { o.until = Date.now() + 5 * 60000; o.n = 0; }
        await env.DB.prepare("INSERT INTO tools (name, code, updated_at) VALUES (?1, ?2, ?3) ON CONFLICT(name) DO UPDATE SET code = excluded.code, updated_at = excluded.updated_at")
          .bind("pf:" + ip, JSON.stringify(o), new Date().toISOString()).run();
        return J({ error: "bad_pin" }, 401);
      }
      const salt = crypto.randomUUID().replace(/-/g, "");
      const np = { salt, hash: await hex(salt + nw), ver: (pr.ver || 1) + 1 };
      await env.DB.prepare("UPDATE tools SET code = ?, updated_at = ? WHERE name = 'pin'").bind(JSON.stringify(np), new Date().toISOString()).run();
      PINROW = np; PIN_AT = Date.now();
      return JC({ ok: true }, await cookieFor(np));
    }
    if (p.startsWith("/api/") && !(await authed(req, env))) return J({ error: "locked" }, 401);
    if (req.method === "GET" && p === "/api/articles") {
      const { results } = await env.DB.prepare("SELECT data FROM articles WHERE week >= ? ORDER BY week DESC, id").bind(cutoff(daysOf(url))).all();
      return new Response("[" + results.map(r => r.data).join(",") + "]", { headers: H });
    }
    /* ---- chores (家事芽): shared list, parent-editable ---- */
    if (req.method === "GET" && p === "/api/chores") return J(await loadChores(env));
    if (req.method === "POST" && p === "/api/chores") {
      const { body, err } = await readBody(req, 4000); if (err) return err;
      const list = cleanChores(body.list); if (!list) return J({ error: "bad_input" }, 400);
      await env.DB.prepare("INSERT INTO tools (name, code, updated_at) VALUES ('chores', ?1, ?2) ON CONFLICT(name) DO UPDATE SET code = excluded.code, updated_at = excluded.updated_at")
        .bind(JSON.stringify(list), new Date().toISOString()).run();
      return J({ list });
    }
    /* ---- users (nickname + grade only) ---- */
    if (req.method === "GET" && p === "/api/users") {
      const { results } = await env.DB.prepare("SELECT id, nick, grade FROM users ORDER BY created_at, id").all();
      return J(results);
    }
    if (req.method === "POST" && p === "/api/users") {
      const { body, err } = await readBody(req, 512); if (err) return err;
      const nick = String(body.nick || "").replace(/[\u0000-\u001f\u007f<>&"']/g, "").trim().slice(0, 8);
      const grade = String(body.grade || "");
      if (!nick || !/^g[13]$/.test(grade)) return J({ error: "bad_input" }, 400);
      const c = await env.DB.prepare("SELECT COUNT(*) AS n FROM users").first();
      if (c.n >= MAX_USERS) return J({ error: "too_many" }, 409);
      const id = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
      await env.DB.prepare("INSERT INTO users (id, nick, grade, created_at) VALUES (?, ?, ?, ?)").bind(id, nick, grade, new Date().toISOString()).run();
      return J({ id, nick, grade });
    }
    if (req.method === "POST" && p === "/api/users/delete") {
      const { body, err } = await readBody(req, 256); if (err) return err;
      const id = String(body.id || "");
      await env.DB.batch([
        env.DB.prepare("DELETE FROM uanswers WHERE uid = ?").bind(id),
        env.DB.prepare("DELETE FROM ubooks WHERE uid = ?").bind(id),
        env.DB.prepare("DELETE FROM uchat WHERE uid = ?").bind(id),
        env.DB.prepare("DELETE FROM ustate WHERE uid = ?").bind(id),
        env.DB.prepare("DELETE FROM users WHERE id = ?").bind(id)]);
      return J({ ok: true });
    }
    /* ---- per-user state (math results, sprout) ---- */
    if (req.method === "GET" && p === "/api/state") {
      const uid = url.searchParams.get("uid");
      if (!(await getUser(env, uid))) return J({ error: "no_user" }, 404);
      const { results } = await env.DB.prepare("SELECT k, v FROM ustate WHERE uid = ?").bind(uid).all();
      const o = {}; results.forEach(r => { try { o[r.k] = JSON.parse(r.v); } catch { } });
      return J(o);
    }
    if (req.method === "POST" && p === "/api/state") {
      const { body, err } = await readBody(req, 6000); if (err) return err;
      const key = String(body.key || ""), uid = String(body.uid || "");
      if (!STATE_KEYS.includes(key) || !(await getUser(env, uid))) return J({ error: "bad_input" }, 400);
      const v = JSON.stringify(body.val === undefined ? null : body.val);
      if (v.length > 5000) return J({ error: "too_large" }, 413);
      await env.DB.prepare("INSERT INTO ustate (uid, k, v, updated_at) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(uid, k) DO UPDATE SET v = excluded.v, updated_at = excluded.updated_at")
        .bind(uid, key, v, new Date().toISOString()).run();
      return J({ ok: true });
    }
    if (req.method === "POST" && p === "/api/water") {
      const { body, err } = await readBody(req, 256); if (err) return err;
      const uid = String(body.uid || "");
      if (!(await getUser(env, uid))) return J({ error: "no_user" }, 404);
      const row = await env.DB.prepare("SELECT v FROM ustate WHERE uid = ? AND k = 'sprout'").bind(uid).first();
      let s = { n: 0, last: "" }; try { if (row) s = JSON.parse(row.v); } catch { }
      const d = today(); let watered = false;
      if (s.last !== d) { s = { n: (s.n || 0) + 1, last: d }; watered = true;
        await env.DB.prepare("INSERT INTO ustate (uid, k, v, updated_at) VALUES (?1, 'sprout', ?2, ?3) ON CONFLICT(uid, k) DO UPDATE SET v = excluded.v, updated_at = excluded.updated_at")
          .bind(uid, JSON.stringify(s), new Date().toISOString()).run(); }
      return J({ n: s.n, last: s.last, watered });
    }
    /* ---- bookshelf (芽書櫃): title + date + short note, per user ---- */
    if (req.method === "GET" && p === "/api/books") {
      const uid = String(url.searchParams.get("uid") || "");
      if (!(await getUser(env, uid))) return J({ error: "no_user" }, 404);
      const { results } = await env.DB.prepare("SELECT id, title, read_on AS date, note FROM ubooks WHERE uid = ? ORDER BY read_on DESC, created_at DESC LIMIT 500").bind(uid).all();
      return J(results);
    }
    if (req.method === "POST" && p === "/api/books") {
      const { body, err } = await readBody(req, 2048); if (err) return err;
      const uid = String(body.uid || "");
      if (!(await getUser(env, uid))) return J({ error: "no_user" }, 404);
      const clean = (s, n) => String(s || "").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "").trim().slice(0, n);
      const title = clean(body.title, 40);
      const note = clean(body.note, 200);
      const date = String(body.date || "");
      const okDate = /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(Date.parse(date + "T00:00:00Z")) && new Date(date + "T00:00:00Z").toISOString().slice(0, 10) === date;
      const tomorrow = new Date(Date.now() + 8 * 3600000 + 86400000).toISOString().slice(0, 10);
      if (!title || !okDate || date > tomorrow || date < "2000-01-01") return J({ error: "bad_input" }, 400);
      const now = new Date().toISOString();
      if (body.id) {
        const id = String(body.id);
        const r = await env.DB.prepare("UPDATE ubooks SET title = ?, read_on = ?, note = ?, updated_at = ? WHERE id = ? AND uid = ?").bind(title, date, note, now, id, uid).run();
        if (!r.meta.changes) return J({ error: "not_found" }, 404);
        return J({ id, title, date, note });
      }
      const c = await env.DB.prepare("SELECT COUNT(*) AS n FROM ubooks WHERE uid = ?").bind(uid).first();
      if (c.n >= 500) return J({ error: "too_many" }, 409);
      const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
      await env.DB.prepare("INSERT INTO ubooks (id, uid, title, read_on, note, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(id, uid, title, date, note, now, now).run();
      return J({ id, title, date, note });
    }
    if (req.method === "POST" && p === "/api/books/delete") {
      const { body, err } = await readBody(req, 256); if (err) return err;
      await env.DB.prepare("DELETE FROM ubooks WHERE id = ? AND uid = ?").bind(String(body.id || ""), String(body.uid || "")).run();
      return J({ ok: true });
    }
    /* ---- 聊聊芽：苗苗 ---- */
    if (req.method === "GET" && p === "/api/chat") {
      const uid = String(url.searchParams.get("uid") || "");
      const u = await getUser(env, uid); if (!u) return J({ error: "no_user" }, 404);
      const n = url.searchParams.get("all") === "1" ? 300 : 40;
      const { results } = await env.DB.prepare("SELECT * FROM uchat WHERE uid = ? ORDER BY id DESC LIMIT ?").bind(uid, n).all();
      return J({ list: results.reverse().map(chatRow), left: await chatLeft(env, uid), max: CHAT_DAY_MAX });
    }
    if (req.method === "POST" && p === "/api/chat/new") {
      const { body, err } = await readBody(req, 256); if (err) return err;
      const uid = String(body.uid || "");
      if (!(await getUser(env, uid))) return J({ error: "no_user" }, 404);
      const last = await env.DB.prepare("SELECT role FROM uchat WHERE uid = ? ORDER BY id DESC LIMIT 1").bind(uid).first();
      if (last && last.role !== "div") await env.DB.prepare("INSERT INTO uchat (uid, role, t, day, at) VALUES (?, 'div', '', ?, ?)").bind(uid, today(), new Date().toISOString()).run();
      return J({ ok: true });
    }
    if (req.method === "POST" && p === "/api/chat") {
      const { body, err } = await readBody(req, 2048); if (err) return err;
      const uid = String(body.uid || "");
      const u = await getUser(env, uid); if (!u) return J({ error: "no_user" }, 404);
      const q = cleanQ(body.q, 200); if (!q) return J({ error: "bad_input" }, 400);
      const left = await chatLeft(env, uid);
      if (left <= 0) return J({ error: "limit", left: 0 }, 429);
      const { results: prev } = await env.DB.prepare("SELECT role, t, at FROM uchat WHERE uid = ? ORDER BY id DESC LIMIT 12").bind(uid).all();
      const hist = [];
      const since = Date.now() - 6 * 3600000;
      for (const r of prev) { if (r.role === "div" || Date.parse(r.at) < since) break; if (r.role === "user" || r.role === "bot") hist.unshift({ role: r.role === "bot" ? "assistant" : "user", content: r.t }); }
      const D = await zyDict(env);
      const now = new Date().toISOString(), day = today();
      const ins = await env.DB.prepare("INSERT INTO uchat (uid, role, t, z, day, at) VALUES (?, 'user', ?, ?, ?, ?)").bind(uid, q, zyAnno(D, q), day, now).run();
      const qid = ins.meta.last_row_id;
      let out;
      try { out = await n8nCall(env, "yaya-chat-a1c047acebfa", { grade: u.grade, nick: u.nick, messages: [...hist.slice(-8), { role: "user", content: q }] }, 55000); }
      catch (e) { await env.DB.prepare("DELETE FROM uchat WHERE id = ?").bind(qid).run(); return J({ error: "ai_down" }, 502); }
      const a = String(out.answer || "").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "").replace(/[ \t]+/g, " ").replace(/\n{2,}/g, "\n").trim().slice(0, 800) || "苗苗剛剛恍神了一下，等一下再問我一次好嗎？";
      const src = Array.isArray(out.sources) ? out.sources.slice(0, 3).filter(s => s && /^https?:\/\//.test(s.url)).map(s => ({ title: cleanQ(s.title, 80), url: String(s.url).slice(0, 500) })) : [];
      const az = zyAnno(D, a);
      const at = new Date().toISOString();
      const bi = await env.DB.prepare("INSERT INTO uchat (uid, role, t, z, src, day, at) VALUES (?, 'bot', ?, ?, ?, ?, ?)").bind(uid, a, az, src.length ? JSON.stringify(src) : null, day, at).run();
      return J({ user: { id: qid, role: "user", t: q, z: zyAnno(D, q), at: now }, bot: { id: bi.meta.last_row_id, role: "bot", t: a, z: az, src, at }, searched: !!out.searched, left: left - 1 });
    }
    /* ---- answers ---- */
    if (req.method === "GET" && p === "/api/answers") {
      const uid = url.searchParams.get("uid");
      if (url.searchParams.get("all") === "1") {
        const { results } = await env.DB.prepare("SELECT * FROM uanswers WHERE week >= ?").bind(cutoff()).all();
        return J(results.map(rowOut));
      }
      if (uid) {
        const { results } = await env.DB.prepare("SELECT * FROM uanswers WHERE uid = ? AND week >= ?").bind(uid, cutoff(daysOf(url))).all();
        return J(results.map(rowOut));
      }
      const { results } = await env.DB.prepare("SELECT * FROM answers WHERE week >= ?").bind(cutoff()).all();
      return J(results.map(rowOut));
    }
    if (req.method === "POST" && p === "/api/answers") {
      const { body, err } = await readBody(req, 512); if (err) return err;
      const qid = String(body.qid || ""), choice = String(body.choice || "");
      const m = qid.match(QID);
      if (!m || !/^[A-D]$/.test(choice)) return J({ error: "bad_input" }, 400);
      const articleId = `${m[2]}-${m[1]}-${m[3]}`;
      const art = await env.DB.prepare("SELECT week, data FROM articles WHERE id = ?").bind(articleId).first();
      if (!art) return J({ error: "no_article" }, 404);
      const q = JSON.parse(art.data).questions.find(x => x.id === qid);
      if (!q || !q.options.some(o => o.k === choice)) return J({ error: "no_question" }, 404);
      const ok = choice === q.answer ? 1 : 0, now = new Date().toISOString();
      if (body.uid) {
        const uid = String(body.uid);
        if (!(await getUser(env, uid))) return J({ error: "no_user" }, 404);
        await env.DB.prepare(`INSERT INTO uanswers (uid, qid, article_id, week, grade, first_choice, first_correct, last_choice, last_correct, tries, first_at, last_at)
          VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?6, ?7, 1, ?8, ?8)
          ON CONFLICT(uid, qid) DO UPDATE SET last_choice = excluded.last_choice, last_correct = excluded.last_correct, tries = uanswers.tries + 1, last_at = excluded.last_at`)
          .bind(uid, qid, articleId, art.week, m[1], choice, ok, now).run();
        const row = await env.DB.prepare("SELECT * FROM uanswers WHERE uid = ? AND qid = ?").bind(uid, qid).first();
        return J(rowOut(row));
      }
      await env.DB.prepare(`INSERT INTO answers (qid, article_id, week, grade, first_choice, first_correct, last_choice, last_correct, tries, first_at, last_at)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?5, ?6, 1, ?7, ?7)
        ON CONFLICT(qid) DO UPDATE SET last_choice = excluded.last_choice, last_correct = excluded.last_correct, tries = answers.tries + 1, last_at = excluded.last_at`)
        .bind(qid, articleId, art.week, m[1], choice, ok, now).run();
      const row = await env.DB.prepare("SELECT * FROM answers WHERE qid = ?").bind(qid).first();
      return J(rowOut(row));
    }
    if (req.method === "GET" && (p.startsWith("/img/") || p === "/favicon.ico" || p === "/apple-touch-icon.png")) {
      const name = p === "/favicon.ico" ? "main-32.png" : p === "/apple-touch-icon.png" ? "apple.png" : p.slice(5);
      if (!/^[a-z0-9-]+\.(webp|png)$/.test(name)) return new Response("Not found", { status: 404 });
      let b = IMG[name];
      if (!b) {
        const r = await env.DB.prepare("SELECT code FROM tools WHERE name = ?").bind("img:" + name).first();
        if (!r) return new Response("Not found", { status: 404 });
        const bin = atob(r.code); b = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i);
        IMG[name] = b;
      }
      return new Response(b, { headers: { "content-type": name.endsWith(".webp") ? "image/webp" : "image/png", "cache-control": "public, max-age=86400" } });
    }
    if (p === "/favicon.ico") return new Response(null, { status: 204 });
    return new Response("Not found", { status: 404 });
  }
};
