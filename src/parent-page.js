// 家長專區統一入口（/parent）：輸入一次網站密碼，用分頁管理各站的家長功能。
// 各站的家長頁仍是原本的頁面（/xinqing/parent、/care/parent），以 ?embed=1 內嵌在分頁裡；
// 內嵌頁不再自己要密碼（共用同一個家長 cookie），高度由內嵌頁用 postMessage 回報。
// 新站搬進來時，只要在 TABS 加一筆、並讓該站的家長頁支援 ?embed=1。
import { baseHead } from "./base.js";
import { RT_JS } from "./runtime.js";

const base = baseHead({ title: "家長專區｜芽芽學堂", icon: "/img/parent-192.webp" });

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
.cpane{--acc:#1C8C86;--acc-soft:#D7F0EE}
@media (prefers-color-scheme: dark){.cpane{--acc:#6FD3CD;--acc-soft:#1E3B39}}
.cpane{display:grid;gap:12px;margin-top:12px}
.cwk{font-size:22px;font-weight:700;color:var(--acc);margin:14px 0 0}
.cnote{font-family:var(--ui);font-size:16px;color:var(--ink)}
.cbad{font-family:var(--ui);font-size:16px;color:var(--red)}
.cm{display:grid;gap:8px}
.cr{display:flex;flex-wrap:wrap;align-items:center;gap:10px;background:var(--card);border:2px solid var(--line);border-radius:16px;padding:8px 12px}
.ct{font:inherit;font-family:var(--ui);font-size:16px;font-weight:700;min-width:56px;min-height:44px;padding:4px 12px;border-radius:12px;border:2px solid var(--line);background:var(--card);color:var(--muted);cursor:pointer}
.ct.on{background:var(--acc);border-color:var(--acc);color:var(--card)}
.ce{font-size:30px}
.cn{flex:1;min-width:120px;font-size:22px;overflow-wrap:anywhere}
.cs{display:flex;align-items:center;gap:6px;font-family:var(--ui);font-size:16px}
.cs b{min-width:2ch;text-align:center}
.cs i{font-style:normal;color:var(--muted)}
.cb{font:inherit;width:44px;height:44px;border-radius:12px;border:2px solid var(--line);background:var(--card);color:var(--ink);font-size:20px;cursor:pointer;padding:0}
.cdel{font:inherit;font-family:var(--ui);font-size:15px;min-height:44px;padding:4px 14px;border-radius:12px;border:2px solid var(--line);background:var(--card);color:var(--red);cursor:pointer}
.cdel.plain{color:var(--ink)}
.cform{display:grid;gap:10px;background:var(--card);border:2px solid var(--line);border-radius:16px;padding:12px}
.cin{display:grid;grid-template-columns:72px minmax(0,1fr);gap:8px}
.cin3{display:grid;grid-template-columns:72px minmax(0,1fr) 96px;gap:8px}
.cfin{width:100%;min-width:0;font:inherit;font-family:var(--ui);font-size:18px;min-height:48px;padding:6px 10px;border:2px solid var(--line);border-radius:12px;background:var(--card);color:var(--ink);box-sizing:border-box}
.cfin.c{text-align:center}
.cfin:focus{outline:3px solid var(--focus);outline-offset:2px}
`;

const BODY = `</style></head><body><div class="wrap" id="app"><div class="note">載入中…</div></div>
<script>
${RT_JS}const TABS = [
  { k: "overview", t: "總覽", img: "/img/parent-192.webp" },
  { k: "xinqing", t: "心情芽", img: "/img/xinqingya-192.webp", src: "/xinqing/parent" },
  { k: "care", t: "照顧芽", img: "/img/care-192.webp", src: "/care/parent" },
  { k: "chores", t: "家事芽", img: "/img/chores.webp" }
];
let USERS = [], TAB = "overview", KID = "";
try { KID = localStorage.getItem("kids.uid") || ""; } catch (_) {}
const today = () => new Date(Date.now() + 8 * 36e5).toISOString().slice(0, 10).replace(/-/g, "");
function head() {
  return '<div class="top"><div class="brand"><img class="blogo" src="/img/parent-192.webp" alt="" width="44" height="44"><span>家長專區</span></div><a class="chip" href="/"><span aria-hidden="true">←</span>回首頁</a></div>';
}

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
  const on = document.querySelector(".ptab.on"); if (on && on.scrollIntoView) on.scrollIntoView({ inline: "center", block: "nearest" });
  const pane = $("#pane");
  if (TAB === "overview") return overview(pane);
  const t = TABS.find(x => x.k === TAB);
  if (TAB === "chores") return chores(pane);
  let h = "";
  if (TAB === "xinqing") h += kidsBar();
  h += '<iframe class="pframe" id="pf" title="' + esc(t.t) + '家長頁" src="' + t.src + "?embed=1" + (TAB === "xinqing" ? "&uid=" + encodeURIComponent(KID) : "") + '"></iframe>';
  pane.innerHTML = h;
  bindKids(pane);
}
function kidsBar() {
  return USERS.length ? '<div class="kids" role="group" aria-label="選擇孩子">' + USERS.map(u => '<button class="kchip' + (u.id === KID ? " on" : "") + '" data-k="' + esc(u.id) + '"><span class="wav" aria-hidden="true">' + esc([...u.nick][0] || "") + '</span>' + esc(u.nick) + '</button>').join("") + '</div>' : "";
}
function bindKids(root) { root.querySelectorAll(".kchip").forEach(b => b.onclick = () => { KID = b.dataset.k; show(); }); }
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
/* ---- 家事芽分頁：家事與點數、獎勵、兌換紀錄（點數與獎勵每個孩子各自儲存） ---- */
const C = { list: null, chpts: {}, chrw: [], chbank: { e: 0, s: 0, h: [] }, err: "", busy: false, dr: {} };
const CE = { save: "沒有存成功，請再試一次", name: "請先打上家事名稱", many: "家事太多了，最多 20 項", rname: "請先打上獎勵名稱", rprice: "點數請輸入 1 到 999", rmany: "獎勵太多了，最多 12 項" };
const cpts = id => { const v = C.chpts[id]; return Number.isInteger(v) && v >= 0 ? v : 1; };
const cbal = () => Math.max(0, (C.chbank.e || 0) - (C.chbank.s || 0));
const emo = (v, d) => [...String(v || "").trim()].slice(0, 3).join("") || d;
async function chores(pane) {
  if (!KID) { pane.innerHTML = '<div class="note">還沒有孩子，請先回首頁新增。</div>'; return; }
  pane.innerHTML = kidsBar() + '<div class="note">載入中…</div>'; bindKids(pane);
  C.err = ""; C.dr = {};
  const k = KID;
  try {
    const [rl, rs] = await Promise.all([fetch("/api/chores", { cache: "no-store" }), fetch("/api/state?uid=" + encodeURIComponent(k), { cache: "no-store" })]);
    if (!rl.ok || !rs.ok) throw 0;
    C.list = await rl.json();
    const j = await rs.json();
    C.chpts = j.chpts || {}; C.chrw = Array.isArray(j.chrw) ? j.chrw : []; C.chbank = j.chbank || { e: 0, s: 0, h: [] };
  } catch (_) { pane.innerHTML = kidsBar() + '<div class="note">讀不到資料，請重新整理再試。</div>'; bindKids(pane); return; }
  if (KID === k && TAB === "chores") cView();
}
function cView() {
  const pane = $("#pane"), me = USERS.find(u => u.id === KID), nick = me ? me.nick : "", d = C.dr || {};
  const err = C.err ? '<div class="cbad" role="alert">' + esc(CE[C.err] || CE.save) + '</div>' : "";
  const rows = C.list.map(x => '<div class="cr"><button class="ct' + (x.on === false ? "" : " on") + '" data-on="' + esc(x.id) + '" aria-pressed="' + (x.on !== false) + '">' + (x.on === false ? "關" : "開") + '</button><span class="ce">' + esc(x.e) + '</span><span class="cn">' + esc(x.t) + (x.z && x.z.length ? "" : "（無注音）") + '</span><span class="cs"><button class="cb" data-pt="' + esc(x.id) + '" data-d="-1" aria-label="減少點數">－</button><b>' + cpts(x.id) + '</b><button class="cb" data-pt="' + esc(x.id) + '" data-d="1" aria-label="增加點數">＋</button><i>點</i></span>' + (/^x/.test(x.id) ? '<button class="cdel" data-cdel="' + esc(x.id) + '">刪除</button>' : "") + '</div>').join("");
  const rws = C.chrw.map(x => '<div class="cr"><span class="ce">' + esc(x.e) + '</span><span class="cn">' + esc(x.t) + '</span><span class="cs"><b>' + x.p + '</b><i>點</i></span><button class="cdel" data-rdel="' + esc(x.id) + '">刪除</button></div>').join("");
  const his = (C.chbank.h || []).map((x, i) => '<div class="cr"><span class="ce">' + esc(x.e || "🎁") + '</span><span class="cn">' + esc(x.t) + " " + esc(x.d || "") + '</span><span class="cs"><b>−' + x.p + '</b><i>點</i></span><button class="cdel plain" data-undo="' + i + '">退回</button></div>').join("");
  pane.innerHTML = kidsBar() + '<div class="cpane"><div class="cnote">目前設定：<b>' + esc(nick) + '</b>　目前點數：<b>' + cbal() + '</b>　（點數與獎勵每個孩子各自儲存；家事清單大家共用）</div>' + err +
    '<div class="cwk">家事與每次可得點數</div><div class="cm">' + rows + '</div>' +
    '<div class="cform"><label for="c-n">新增家事</label><div class="cin"><input id="c-e" class="cfin c" maxlength="4" placeholder="✨" autocomplete="off" value="' + esc(d.ce || "") + '"><input id="c-n" class="cfin" maxlength="8" placeholder="例如：餵魚" autocomplete="off" value="' + esc(d.cn || "") + '"></div><button class="btn" id="c-add">＋ 新增</button></div>' +
    '<div class="cwk">獎勵（' + esc(nick) + '）</div><div class="cm">' + (rws || '<div class="cnote">還沒有獎勵</div>') + '</div>' +
    '<div class="cform"><label for="r-n">新增獎勵</label><div class="cin3"><input id="r-e" class="cfin c" maxlength="4" placeholder="🎁" autocomplete="off" value="' + esc(d.re || "") + '"><input id="r-n" class="cfin" maxlength="12" placeholder="例如：看電影" autocomplete="off" value="' + esc(d.rn || "") + '"><input id="r-p" class="cfin" type="number" inputmode="numeric" min="1" max="999" placeholder="點數" value="' + esc(d.rp || "") + '"></div><button class="btn" id="r-add">＋ 新增獎勵</button></div>' +
    (his ? '<div class="cwk">兌換紀錄</div><div class="cm">' + his + '</div>' : "") + '</div>';
  bindKids(pane);
  pane.querySelectorAll("[data-on]").forEach(b => b.onclick = () => cmut(L => { const x = L.find(v => v.id === b.dataset.on); if (x) x.on = x.on === false; }));
  pane.querySelectorAll("[data-cdel]").forEach(b => b.onclick = () => cmut(L => { const i = L.findIndex(v => v.id === b.dataset.cdel); if (i >= 0) L.splice(i, 1); }));
  pane.querySelectorAll("[data-pt]").forEach(b => b.onclick = () => cpt(b.dataset.pt, Number(b.dataset.d)));
  pane.querySelectorAll("[data-rdel]").forEach(b => b.onclick = () => rdel(b.dataset.rdel));
  pane.querySelectorAll("[data-undo]").forEach(b => b.onclick = () => rundo(Number(b.dataset.undo)));
  $("#c-add").onclick = cadd; $("#r-add").onclick = radd;
}
function cdraft() { const g = id => { const e = $("#" + id); return e ? e.value : ""; }; C.dr = { ce: g("c-e"), cn: g("c-n"), re: g("r-e"), rn: g("r-n"), rp: g("r-p") }; }
function cmut(fn) {
  if (C.busy) return;
  const L = JSON.parse(JSON.stringify(C.list));
  if (fn(L) === false) return;
  C.busy = true; C.err = ""; cdraft();
  fetch("/api/chores", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ list: L }) })
    .then(r => { if (r.status === 403) { gate(); throw 403; } return r.ok ? r.json() : Promise.reject(r.status); })
    .then(j => { C.list = j.list; C.dr.cn = ""; C.dr.ce = ""; })
    .catch(e => { if (e !== 403) C.err = "save"; })
    .then(() => { C.busy = false; if (TAB === "chores" && $("#pane") && $("#c-add")) cView(); else if (TAB === "chores" && C.err) cView(); });
}
function cadd() {
  cdraft();
  const n = (C.dr.cn || "").trim().slice(0, 8);
  if (!n) { C.err = "name"; return cView(); }
  if (C.list.length >= 20) { C.err = "many"; return cView(); }
  const e = emo(C.dr.ce, "✨");
  cmut(L => { L.push({ id: "x" + Date.now().toString(36).slice(-4), t: n, e: e, on: true }); });
}
function cpost(pairs, revert) {
  const k = KID;
  return Promise.all(pairs.map(p => fetch("/api/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ uid: k, key: p[0], val: p[1] }) }).then(r => { if (!r.ok) throw 1; })))
    .catch(() => { revert(); C.err = "save"; if (KID === k && TAB === "chores") cView(); });
}
function cpt(id, dv) {
  const prev = C.chpts, m = Object.assign({}, prev); m[id] = Math.max(0, Math.min(20, cpts(id) + dv));
  C.chpts = m; C.err = ""; cdraft(); cView();
  cpost([["chpts", m]], () => { if (C.chpts === m) C.chpts = prev; });
}
function radd() {
  cdraft();
  const t = (C.dr.rn || "").trim().slice(0, 12), p = parseInt(C.dr.rp, 10), prev = C.chrw;
  if (!t) { C.err = "rname"; return cView(); }
  if (!(p >= 1 && p <= 999)) { C.err = "rprice"; return cView(); }
  if (prev.length >= 12) { C.err = "rmany"; return cView(); }
  const R = prev.concat([{ id: "r" + Date.now().toString(36).slice(-4), t: t, e: emo(C.dr.re, "🎁"), p: p }]);
  C.chrw = R; C.err = ""; C.dr = {}; cView();
  cpost([["chrw", R]], () => { if (C.chrw === R) C.chrw = prev; });
}
function rdel(id) {
  const prev = C.chrw, R = prev.filter(x => x.id !== id);
  C.chrw = R; C.err = ""; cdraft(); cView();
  cpost([["chrw", R]], () => { if (C.chrw === R) C.chrw = prev; });
}
function rundo(i) {
  const pb = JSON.stringify(C.chbank), bk = JSON.parse(pb);
  if (!bk.h || !bk.h[i]) return;
  const x = bk.h.splice(i, 1)[0]; bk.s = Math.max(0, (bk.s || 0) - x.p);
  C.chbank = bk; C.err = ""; cdraft(); cView();
  cpost([["chbank", bk]], () => { if (C.chbank === bk) C.chbank = JSON.parse(pb); });
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
