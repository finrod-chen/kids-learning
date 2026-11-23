// 照顧芽頁面（/care 小孩自己記今天照顧了哪位兄弟姐妹、/care/parent 家長檢視＋常用項目管理）。
// 外觀直接沿用心情芽頁面的 <head> 與樣式（米色方格紙、海軍藍粗框卡片、注音元件），只換主題色為暖橘。
// 所有要注音的文字（介面字、常用項目、孩子打的字）都由 Worker 用注音字典標好再傳來，這裡只負責畫。
import { baseHead } from "./base.js";
import { RT_JS } from "./runtime.js";

const base = baseHead({ title: "照顧芽｜芽芽學堂", icon: "/img/care-192.webp" });

const CSS = `
:root{--acc:#C8642A;--acc-soft:#FCE7D0}
@media (prefers-color-scheme: dark){:root{--acc:#F5A56B;--acc-soft:#3D2A1E}}
.card>.step:not(:first-child){margin-top:10px}
.picks{display:flex;flex-wrap:wrap;gap:12px}
.pick{display:flex;align-items:center;gap:12px;min-width:0;max-width:100%;background:var(--card);border:2px solid var(--line);border-radius:20px;padding:12px 18px;font-size:26px;min-height:68px;overflow-wrap:anywhere}
.pick .av2{flex:none;width:40px;height:40px;border-radius:50%;background:var(--acc);color:var(--card);display:grid;place-items:center;font-family:var(--ui);font-weight:700;font-size:22px}
.pick.on{border:3px solid var(--navy);background:var(--acc-soft);box-shadow:0 4px 0 var(--acc)}
.pick:active,.tg:active,.md:active,.xbtn:active{transform:scale(.97)}
.tags{display:flex;flex-wrap:wrap;gap:10px}
.tg{display:inline-flex;align-items:center;gap:8px;min-width:0;max-width:100%;background:var(--card);border:2px solid var(--line);border-radius:999px;padding:10px 16px;font-size:22px;min-height:52px;overflow-wrap:anywhere}
.tg.on{border-color:var(--navy);background:var(--acc-soft)}
.tg .e{font-size:28px;line-height:1}
textarea.what{width:100%;min-height:96px;border:2px solid var(--line);border-radius:18px;padding:12px 14px;font:inherit;font-size:24px;background:var(--card);color:var(--ink);resize:none;-webkit-appearance:none;appearance:none}
textarea.what:focus{outline:3px solid var(--focus);outline-offset:2px}
.moods{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.md{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0;background:var(--card);border:2px solid var(--line);border-radius:20px;padding:10px 4px;font-size:17px;min-height:104px;text-align:center}
.md .e{font-size:38px;line-height:1.1}
.md.on{border:3px solid var(--navy);background:var(--acc-soft);box-shadow:0 4px 0 var(--acc)}
.btn[disabled]{opacity:.45;box-shadow:none}
.ent{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:center;background:var(--acc-soft);border-radius:18px;padding:12px 14px}
.ent .e{font-size:34px;line-height:1}
.ent .tx{min-width:0;overflow-wrap:anywhere;font-size:22px;line-height:1.5}
.ent .sm{display:block;font-family:var(--ui);font-size:14px;color:var(--muted);margin-top:2px}
.xbtn{font-family:var(--ui);font-size:15px;color:var(--muted);border:2px solid var(--line);border-radius:12px;padding:6px 10px;background:var(--card);min-height:40px}
.wk{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;text-align:center}
.wk div{border:2px solid var(--line);border-radius:14px;padding:8px 2px;background:var(--card);font-size:16px;min-width:0}
.wk div b{display:block;font-family:"Nunito","Avenir Next",var(--ui);font-size:24px;color:var(--acc)}
.wk div.td{border:3px solid var(--navy);background:var(--acc-soft)}
.list{display:flex;flex-direction:column;gap:10px}
.prs{display:flex;flex-direction:column;gap:8px}
.pr{display:flex;align-items:center;gap:10px;font-family:var(--ui);font-size:16px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:8px 12px}
.pr .t{flex:1;min-width:0;overflow-wrap:anywhere}
.addrow{display:flex;gap:8px;flex-wrap:wrap}
.addrow input{font:inherit;font-family:var(--ui);font-size:16px;border:2px solid var(--line);border-radius:12px;padding:8px 10px;background:var(--card);color:var(--ink);min-width:0}
@media (max-width:600px){.pick{font-size:21px;min-height:60px;padding:10px 14px}.tg{font-size:19px;min-height:46px}.md{font-size:14px;min-height:92px}.md .e{font-size:32px}textarea.what{font-size:21px}.ent .tx{font-size:19px}}
`;

const BODY = `</style></head><body><div class="wrap" id="app"><div class="note">載入中…</div></div>
<script>
${RT_JS}const PARENT = location.pathname === "/care/parent";
const zz = o => o ? zy(o.t, o.z) : "";
let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch (_) {}
const EMBED = new URLSearchParams(location.search).get("embed") === "1";
let NICK = "";
function head() { return rtHead("/img/care-192.webp", PARENT ? "照顧芽・家長" : "照顧芽", '<a class="chip" href="/"><span aria-hidden="true">🏠</span>首頁</a>'); }
const api = async (path, body) => (await apiRaw(path, body)).json();
function needUser() { noteOnly('請先在<a href="/">首頁</a>選好是誰在用，再點照顧芽。'); }
const fmt = s => s.slice(4, 6) + "/" + s.slice(6);
const WD = ["日","一","二","三","四","五","六"];
const wdOf = s => new Date(Date.UTC(+s.slice(0, 4), +s.slice(4, 6) - 1, +s.slice(6, 8))).getUTCDay();

/* ---------- 小孩頁 ---------- */
let S = null, F = { to: "", what: "", mood: "", cheer: false, busy: false, err: "" };
async function kid() {
  S = await api("/api/care/today?uid=" + encodeURIComponent(uid));
  if (S.error) return needUser();
  NICK = S.user.nick;
  render();
}
function moodOf(k) { return (S.moods || []).find(m => m.k === k); }
function render() {
  const U = S.ui;
  let h = head();
  if (!S.sibs.length) { app.innerHTML = h + '<div class="note">' + zz(U.nosib) + '</div>'; return; }
  h += '<div class="hello">' + zz(U.hello) + '</div>';
  if (F.cheer) h += '<div class="fb"><span class="head">' + zz(U.thanks) + '</span></div>';
  h += '<section class="card"><span class="step">' + zz(U.s1) + '</span><div class="picks">' + S.sibs.map(s => '<button class="pick' + (F.to === s.id ? " on" : "") + '" data-to="' + esc(s.id) + '"><span class="av2" aria-hidden="true">' + esc(s.e || [...s.nick][0] || "") + '</span><span>' + esc(s.nick) + '</span></button>').join("") + '</div>';
  h += '<span class="step">' + zz(U.s2) + '</span><div class="tags">' + S.presets.map(p => '<button class="tg' + (F.what === p.t ? " on" : "") + '" data-p="' + esc(p.id) + '"><span class="e" aria-hidden="true">' + esc(p.e) + '</span>' + zy(p.t, p.z) + '</button>').join("") + '</div>';
  h += '<textarea class="what" id="what" maxlength="40" rows="3" placeholder="' + esc(U.ph) + '" aria-label="做了什麼">' + esc(F.what) + '</textarea>';
  h += '<span class="step">' + zz(U.s3) + '</span><div class="moods">' + S.moods.map(m => '<button class="md' + (F.mood === m.k ? " on" : "") + '" data-m="' + m.k + '"><span class="e" aria-hidden="true">' + m.e + '</span>' + zy(m.t, m.z) + '</button>').join("") + '</div>';
  if (F.err) h += '<div class="pinerr">' + esc(F.err) + '</div>';
  h += '<button class="btn" id="save"' + (F.to && F.what.trim() && !F.busy ? "" : " disabled") + '>' + zz(U.save) + '<span aria-hidden="true">✨</span></button></section>';
  const td = S.rows.filter(r => r.day === S.day);
  h += '<section class="card"><span class="step">' + zz(U.todayEnt) + '</span>' + (td.length ? '<div class="list">' + td.map(entry).join("") + '</div>' : '<div class="tip">' + zz(U.none) + '</div>') + '</section>';
  h += '<section class="card"><span class="step">' + zz(U.week) + '</span><div class="wk">' + S.week.map(w => '<div class="' + (w.day === S.day ? "td" : "") + '">' + WD[wdOf(w.day)] + '<b>' + (w.n || "·") + '</b></div>').join("") + '</div></section>';
  h += '<div class="foot"><a href="/parent#care">家長檢視</a></div>';
  app.innerHTML = h;
  const ta = $("#what"); ta.oninput = () => { F.what = ta.value; const s = $("#save"); if (s) s.disabled = !(F.to && F.what.trim() && !F.busy); };
  app.querySelectorAll(".pick").forEach(b => b.onclick = () => { sync(); F.to = b.dataset.to; F.cheer = false; render(); });
  app.querySelectorAll(".tg").forEach(b => b.onclick = () => { const p = S.presets.find(x => x.id === b.dataset.p); F.what = p ? p.t : ""; F.cheer = false; render(); });
  app.querySelectorAll(".md").forEach(b => b.onclick = () => { sync(); F.mood = F.mood === b.dataset.m ? "" : b.dataset.m; render(); });
  app.querySelectorAll(".xbtn").forEach(b => b.onclick = async () => { sync(); const r = await api("/api/care/delete", { uid, id: +b.dataset.id }); if (!r.error) { S = r; } render(); });
  $("#save").onclick = save;
}
function sync() { const ta = $("#what"); if (ta) F.what = ta.value; }
function entry(r) {
  const m = moodOf(r.mood);
  return '<div class="ent"><span class="e" aria-hidden="true">' + (m ? m.e : "🌱") + '</span><div class="tx">' + zy(r.what, r.z) + '<span class="sm">' + esc("幫了 " + r.to_nick) + (m ? " ・ " + esc(m.t) : "") + '</span></div><button class="xbtn" data-id="' + r.id + '" aria-label="刪掉這筆">刪掉</button></div>';
}
async function save() {
  sync();
  if (!F.to || !F.what.trim() || F.busy) return;
  F.busy = true; F.err = ""; render();
  try {
    const r = await api("/api/care/add", { uid, to: F.to, what: F.what, mood: F.mood });
    if (r.error) { F.err = r.error === "too_many" ? "今天已經記很多筆了，明天再記吧！" : "存不起來，請再試一次"; }
    else { S = r; F = { to: F.to, what: "", mood: "", cheer: true, busy: false, err: "" }; }
  } catch (_) { F.err = "連不上網路，請再試一次"; }
  F.busy = false; render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- 家長頁（要輸入網站密碼） ---------- */
let G = { d: "", err: "", busy: false };
function gate() {
  const msg = { bad: "密碼不對，請再試一次", lock: "輸錯太多次了，請 5 分鐘後再試", net: "連不上網路，請再試一次" };
  const keys = ["1","2","3","4","5","6","7","8","9","C","0","B"].map(k => '<button class="pk" data-v="' + k + '" aria-label="' + (k === "C" ? "清除" : k === "B" ? "倒退" : k) + '">' + (k === "B" ? "⌫" : k === "C" ? "清除" : k) + '</button>').join("");
  app.innerHTML = head() + '<div class="pgate"><div class="lock">🔒 家長專區</div><div class="hello hq">請爸爸媽媽輸入密碼</div><div class="pdots" aria-hidden="true">' + Array.from({ length: 6 }, (_, i) => '<span class="pdot' + (i < G.d.length ? " on" : "") + '"></span>').join("") + '</div>' + (G.err ? '<div class="pinerr" role="alert">' + msg[G.err] + '</div>' : "") + '<div class="pinpad">' + keys + '</div></div>';
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
    if (r.ok) { G = { d: "", err: "", busy: false }; return parentData(); }
    if (r.status === 401 && (await r.clone().json().catch(() => ({}))).error === "locked") { noteOnly('請先回<a href="/">首頁</a>解鎖，再進來喔。'); return; }
    G.err = r.status === 429 ? "lock" : "bad";
  } catch (_) { G.err = "net"; }
  G.d = ""; G.busy = false; gate();
}
async function parent() {
  if (EMBED) return parentData();
  try { await fetch("/api/parent/lock", { method: "POST" }); } catch (_) {}
  gate();
}
let PR = [], TG = [];
async function parentData() {
  const days = Math.min(90, Math.max(1, +(new URLSearchParams(location.search).get("days")) || 30));
  const r = await fetch("/api/care/log?days=" + days);
  if (r.status === 403) return gate();
  if (r.status === 401) return noteOnly('請先回<a href="/">首頁</a>解鎖，再進來喔。');
  const d = await r.json();
  PR = d.presets; TG = d.targets || [];
  const MO = Object.fromEntries(d.moods.map(m => [m.k, m]));
  const by = {}; d.rows.forEach(x => { (by[x.nick || "（已刪除）"] = by[x.nick || "（已刪除）"] || []).push(x); });
  let h = head() + '<section class="card"><div class="ptitle">最近 ' + days + ' 天的照顧紀錄</div>';
  const names = Object.keys(by);
  if (!names.length) h += '<div class="tip">還沒有紀錄。</div>';
  names.forEach(n => {
    const days0 = new Set(by[n].map(x => x.day)).size;
    h += '<div class="ptitle" style="font-size:20px">' + esc(n) + ' <span class="tag">共 ' + by[n].length + ' 筆，' + days0 + ' 天有記</span></div><div style="overflow-x:auto"><table class="tbl"><tr><th>日期</th><th>幫了誰</th><th>做了什麼</th><th>感覺</th></tr>' + by[n].slice(0, 60).map(x => '<tr><td>' + fmt(x.day) + '</td><td>' + esc(x.to_nick) + '</td><td>' + esc(x.what) + '</td><td>' + (MO[x.mood] ? MO[x.mood].e + " " + esc(MO[x.mood].t) : "") + '</td></tr>').join("") + '</table></div>';
  });
  h += (names.length ? '<button class="btn" id="csv">下載 CSV</button>' : "") + '</section>';
  h += '<section class="card"><div class="ptitle">被照顧的人</div><div class="tip">沒有帳號、不會自己操作的弟妹（例如幼幼班弟弟）。加了之後，哥哥姊姊在「幫了誰」就會看到他，最多 6 位。</div><div class="prs" id="tgs"></div><div class="addrow"><input id="ge" size="3" maxlength="4" placeholder="👶" aria-label="頭像表情"><input id="gn" size="10" maxlength="8" placeholder="暱稱（最多 8 字）" aria-label="暱稱"><button class="btn" id="gadd">新增</button></div><div class="pinerr" id="gerr"></div></section>';
  h += '<section class="card"><div class="ptitle">常用項目</div><div class="tip">小朋友在照顧芽看到的快速選項，最多 12 個。</div><div class="prs" id="prs"></div><div class="addrow"><input id="pe" size="3" maxlength="4" placeholder="😀" aria-label="圖示"><input id="pt" size="14" maxlength="12" placeholder="新增項目（最多 12 字）" aria-label="項目名稱"><button class="btn" id="padd">新增</button></div><div class="pinerr" id="perr"></div></section>';
  h += '<div class="foot"><a href="/care">回照顧芽</a></div>';
  app.innerHTML = h;
  drawPresets(); drawTargets();
  $("#gadd").onclick = () => { const n = $("#gn").value.trim(), e = $("#ge").value.trim() || "👶"; if (!n) return; saveTargets([...TG, { id: "g" + Date.now().toString(36), nick: n, e }]); };
  $("#padd").onclick = () => { const t = $("#pt").value.trim(), e = $("#pe").value.trim() || "✨"; if (!t) return; savePresets([...PR, { id: "p" + Date.now().toString(36), t, e }]); };
  const csvB = $("#csv");
  if (csvB) csvB.onclick = () => {
    const q = v => '"' + String(v).replace(/"/g, '""') + '"';
    const csv = "\\ufeff" + [["日期","誰","幫了誰","做了什麼","感覺"], ...d.rows.slice().reverse().map(x => [x.day.slice(0, 4) + "/" + x.day.slice(4, 6) + "/" + x.day.slice(6), x.nick || "", x.to_nick, x.what, MO[x.mood] ? MO[x.mood].t : ""])].map(a => a.map(q).join(",")).join("\\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = "照顧芽.csv"; a.click();
  };
}
function drawPresets() {
  $("#prs").innerHTML = PR.map(p => '<div class="pr"><span aria-hidden="true">' + esc(p.e) + '</span><span class="t">' + esc(p.t) + '</span><button class="xbtn" data-id="' + esc(p.id) + '">移除</button></div>').join("");
  $("#prs").querySelectorAll(".xbtn").forEach(b => b.onclick = () => savePresets(PR.filter(p => p.id !== b.dataset.id)));
}
function drawTargets() {
  $("#tgs").innerHTML = TG.length ? TG.map(p => '<div class="pr"><span aria-hidden="true">' + esc(p.e) + '</span><span class="t">' + esc(p.nick) + '</span><button class="xbtn" data-id="' + esc(p.id) + '">移除</button></div>').join("") : '<div class="tip">還沒有，請在下面新增。</div>';
  $("#tgs").querySelectorAll(".xbtn").forEach(b => b.onclick = () => saveTargets(TG.filter(p => p.id !== b.dataset.id)));
}
async function saveTargets(list) {
  const r = await fetch("/api/care/targets", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ targets: list }) });
  if (r.status === 403) return gate();
  const j = await r.json().catch(() => ({}));
  if (j.error) { $("#gerr").textContent = "存不起來，請檢查暱稱（不可空白、最多 8 字、最多 6 位）"; return; }
  TG = j.targets; drawTargets(); $("#gn").value = ""; $("#ge").value = ""; $("#gerr").textContent = "";
}
async function savePresets(list) {
  const r = await fetch("/api/care/presets", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ presets: list }) });
  if (r.status === 403) return gate();
  const j = await r.json().catch(() => ({}));
  if (j.error) { $("#perr").textContent = "存不起來，請檢查名稱（不可空白、最多 12 字、最多 12 個）"; return; }
  PR = j.presets; drawPresets(); $("#pt").value = ""; $("#pe").value = ""; $("#perr").textContent = "";
}
function start() { return PARENT ? parent() : (uid ? kid() : needUser()); }
start().catch(() => {});
</script></body></html>`;

export default base + CSS + BODY;
