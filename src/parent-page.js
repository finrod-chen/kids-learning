// 家長專區統一入口（/parent）：輸入一次網站密碼，用分頁管理各站的家長功能。
// 各站的家長頁仍是原本的頁面（/xinqing/parent、/care/parent），以 ?embed=1 內嵌在分頁裡；
// 內嵌頁不再自己要密碼（共用同一個家長 cookie），高度由內嵌頁用 postMessage 回報。
// 新站搬進來時，只要在 TABS 加一筆、並讓該站的家長頁支援 ?embed=1。
import XQ_PAGE from "./xinqingya-page.js";

const base = XQ_PAGE.slice(0, XQ_PAGE.indexOf("</style>"))
  .replace("<title>心情芽｜芽芽學堂</title>", "<title>家長專區｜芽芽學堂</title>")
  .replace('href="/img/xinqingya-192.webp"', 'href="/img/main-192.webp"');

const CSS = `
.ptabs{display:flex;gap:8px;overflow-x:auto;padding:2px 2px 8px;margin:0 -2px}
.ptab{flex:none;display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:6px 16px 6px 8px;border-radius:999px;background:var(--card);border:2px solid var(--line);font-family:var(--ui);font-size:17px;color:var(--ink);text-decoration:none}
.ptab img{width:32px;height:32px;border-radius:10px;flex:none}
.ptab.txt{padding-left:16px}
.ptab.on{border:3px solid var(--navy);background:var(--acc-soft);font-weight:700}
.ptab:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
.pframe{display:block;width:100%;border:0;min-height:420px;background:transparent}
.kids{display:flex;gap:8px;flex-wrap:wrap}
.kchip{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:4px 14px 4px 6px;border-radius:999px;background:var(--card);border:2px solid var(--line);font-family:var(--ui);font-size:16px;color:var(--ink)}
.kchip .wav{width:30px;height:30px;font-size:16px}
.kchip.on{border:3px solid var(--navy);background:var(--acc-soft);font-weight:700}
.ov{display:grid;gap:12px}
.ovk{display:flex;flex-direction:column;gap:6px}
.ovk .nm{display:flex;align-items:center;gap:10px;font-size:22px;font-weight:700;color:var(--navy)}
.ovk .row{display:flex;gap:8px 18px;flex-wrap:wrap;font-family:var(--ui);font-size:16px;color:var(--ink)}
.ovk .row b{color:var(--acc)}
.ovk .no{color:var(--muted)}
`;

const BODY = `</style></head><body><div class="wrap" id="app"><div class="note">載入中…</div></div>
<script>
const $ = s => document.querySelector(s), app = $("#app");
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const TABS = [
  { k: "overview", t: "總覽" },
  { k: "xinqing", t: "心情芽", img: "/img/xinqingya-192.webp", src: "/xinqing/parent" },
  { k: "care", t: "照顧芽", img: "/img/care-192.webp", src: "/care/parent" }
];
let USERS = [], TAB = "overview", KID = "";
try { KID = localStorage.getItem("kids.uid") || ""; } catch (_) {}
const today = () => new Date(Date.now() + 8 * 36e5).toISOString().slice(0, 10).replace(/-/g, "");
function head() {
  return '<div class="top"><div class="brand"><img class="blogo" src="/img/main-192.webp" alt="" width="44" height="44"><span>家長專區</span></div><a class="chip" href="/"><span aria-hidden="true">←</span>回首頁</a></div>';
}
function noteOnly(msg) { app.innerHTML = head() + '<div class="note">' + msg + '</div>'; }

/* ---- 密碼閘：進來先鎖一次，輸入一次後各分頁共用 ---- */
let G = { d: "", err: "", busy: false };
function gate() {
  const msg = { bad: "密碼不對，請再試一次", lock: "輸錯太多次了，請 5 分鐘後再試", net: "連不上網路，請再試一次" };
  const keys = ["1","2","3","4","5","6","7","8","9","C","0","B"].map(k => '<button class="pk" data-v="' + k + '" aria-label="' + (k === "C" ? "清除" : k === "B" ? "倒退" : k) + '">' + (k === "B" ? "⌫" : k === "C" ? "清除" : k) + '</button>').join("");
  app.innerHTML = head() + '<div class="pgate"><div class="lock">家長專區</div><div class="hello hq">請爸爸媽媽輸入密碼</div><div class="pdots" aria-hidden="true">' + Array.from({ length: 6 }, (_, i) => '<span class="pdot' + (i < G.d.length ? " on" : "") + '"></span>').join("") + '</div><div class="pinerr" role="alert">' + (G.err ? msg[G.err] : "&nbsp;") + '</div><div class="pinpad">' + keys + '</div></div>';
  app.querySelectorAll(".pk").forEach(b => b.onclick = () => gateKey(b.dataset.v));
}
function gateKey(v) {
  if (G.busy) return;
  if (v === "C") G.d = ""; else if (v === "B") G.d = G.d.slice(0, -1); else if (/^[0-9]$/.test(v) && G.d.length < 6) G.d += v;
  G.err = ""; gate();
  if (G.d.length === 6) gateGo();
}
async function gateGo() {
  G.busy = true;
  try {
    const r = await fetch("/api/parent", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pin: G.d }) });
    if (r.ok) { G = { d: "", err: "", busy: false }; return enter(); }
    if (r.status === 401 && (await r.clone().json().catch(() => ({}))).error === "locked") { noteOnly('請先回<a href="/">首頁</a>解鎖，再進來喔。'); return; }
    G.err = r.status === 429 ? "lock" : "bad";
  } catch (_) { G.err = "net"; }
  G.d = ""; G.busy = false; gate();
}

/* ---- 分頁 ---- */
function tabFromHash() { const k = location.hash.slice(1); return TABS.some(t => t.k === k) ? k : "overview"; }
function shell() {
  const tabs = TABS.map(t => '<a class="ptab' + (t.k === TAB ? " on" : "") + (t.img ? "" : " txt") + '" href="#' + t.k + '"' + (t.k === TAB ? ' aria-current="page"' : "") + '>' + (t.img ? '<img src="' + t.img + '" alt="" width="32" height="32">' : "") + esc(t.t) + '</a>').join("");
  app.innerHTML = head() + '<nav class="ptabs" aria-label="家長專區分頁">' + tabs + '</nav><div id="pane"></div>';
}
async function enter() {
  try {
    const r = await fetch("/api/users");
    if (r.status === 401) return noteOnly('請先回<a href="/">首頁</a>解鎖，再進來喔。');
    USERS = await r.json();
  } catch (_) { return noteOnly("連不上網路，請重新整理再試。"); }
  if (!USERS.some(u => u.id === KID)) KID = USERS[0] ? USERS[0].id : "";
  show();
}
function show() {
  TAB = tabFromHash(); shell();
  const pane = $("#pane");
  if (TAB === "overview") return overview(pane);
  const t = TABS.find(x => x.k === TAB);
  let h = "";
  if (TAB === "xinqing" && USERS.length) h += '<div class="kids" role="group" aria-label="選擇孩子">' + USERS.map(u => '<button class="kchip' + (u.id === KID ? " on" : "") + '" data-k="' + esc(u.id) + '"><span class="wav" aria-hidden="true">' + esc([...u.nick][0] || "") + '</span>' + esc(u.nick) + '</button>').join("") + '</div>';
  h += '<iframe class="pframe" id="pf" title="' + esc(t.t) + '家長頁" src="' + t.src + "?embed=1" + (TAB === "xinqing" ? "&uid=" + encodeURIComponent(KID) : "") + '"></iframe>';
  pane.innerHTML = h;
  pane.querySelectorAll(".kchip").forEach(b => b.onclick = () => { KID = b.dataset.k; show(); });
}
async function overview(pane) {
  pane.innerHTML = '<div class="note">載入中…</div>';
  const day = today();
  try {
    const [cr, ...xr] = await Promise.all([fetch("/api/care/log?days=1"), ...USERS.map(u => fetch("/api/xq/log?uid=" + encodeURIComponent(u.id) + "&days=1"))]);
    if (cr.status === 403 || xr.some(r => r.status === 403)) return gate();
    const care = await cr.json(), xq = await Promise.all(xr.map(r => r.json()));
    const cards = USERS.map((u, i) => {
      const x = xq[i] || {}, row = (x.log || []).find(r => r.day === day), deeds = ((x.deeds || {})[day] || []).length;
      const n = (care.rows || []).filter(r => r.day === day && r.uid === u.id).length;
      const mood = row ? (row.temp != null ? "心情溫度 <b>" + row.temp + "</b>" : "還沒量心情") + "・" + (row.done ? "心情芽完成" : "心情芽未完成") : '<span class="no">今天還沒做心情芽</span>';
      return '<section class="card ovk"><div class="nm"><span class="wav" aria-hidden="true">' + esc([...u.nick][0] || "") + '</span>' + esc(u.nick) + '</div><div class="row"><span>' + mood + '</span><span>好事 <b>' + deeds + '</b> 件</span><span>照顧紀錄 <b>' + n + '</b> 筆</span></div></section>';
    }).join("");
    pane.innerHTML = '<div class="hello">今天的狀況</div><div class="ov">' + (cards || '<div class="note">還沒有孩子，請先回首頁新增。</div>') + '</div>';
  } catch (_) { pane.innerHTML = '<div class="note">讀不到資料，請重新整理再試。</div>'; }
}
window.addEventListener("hashchange", () => { if (USERS.length || $("#pane")) show(); });
window.addEventListener("message", e => {
  if (e.origin !== location.origin || !e.data || !e.data.shellH) return;
  const f = $("#pf"); if (f && f.contentWindow === e.source) f.style.height = Math.max(420, e.data.shellH + 8) + "px";
});
(async () => {
  try { await fetch("/api/parent/lock", { method: "POST" }); } catch (_) {}
  gate();
})();
</script></body></html>`;

export default base + CSS + BODY;
