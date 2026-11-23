// 生活芽頁面（/life）：安全、身體界線、健康、品德的小知識，每週解鎖一個單元（跟新聞芽一樣每週更新）。
// 單元內容（含注音）在 life-data.js；每個單元有幾句重點、小測驗、口訣。
// 進度存 /api/state 的 life（每個單元做對幾題、哪天做的），做完一個單元呼叫 /api/water 幫小芽澆水。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { HOL_JS } from "./hol-lib.js";
import { HBG } from "./shared.js";
import { LIFE_DATA } from "./life-data.js";

export const LIFE_CSS = `
.lf-wk{font-family:var(--ui);font-size:15px;color:var(--muted);text-align:center;margin:2px 0 10px}
.lf-this{display:flex;align-items:center;gap:16px;width:100%;text-align:left;background:var(--card);border:3px solid var(--navy);border-radius:26px;padding:18px 20px;box-shadow:0 6px 0 var(--navy);margin-bottom:18px}
.lf-this:active{transform:translateY(2px);box-shadow:0 4px 0 var(--navy)}
.lf-em{flex:none;display:flex;align-items:center;justify-content:center;width:84px;height:84px;border-radius:22px;font-size:46px}
.lf-tt{min-width:0;display:flex;flex-direction:column;gap:6px}
.lf-cat{font-family:var(--ui);font-size:15px;color:var(--muted)}
.lf-name{font-size:30px;font-weight:700;color:var(--navy);overflow-wrap:anywhere}
.lf-st{font-family:var(--ui);font-size:16px;color:var(--muted)}
.lf-st.done{color:#2f8a4a;font-weight:700}
.lf-h2{font-size:22px;color:var(--navy);margin:8px 2px 10px}
.lf-past{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.lf-chip{display:flex;align-items:center;gap:10px;text-align:left;background:var(--card);border:2px solid var(--navy);border-radius:18px;padding:12px;min-width:0}
.lf-chip:active{transform:scale(.98)}
.lf-chip .lf-em{width:48px;height:48px;font-size:28px;border-radius:14px}
.lf-chip .nm{font-size:20px;color:var(--ink);min-width:0;overflow-wrap:anywhere}
.lf-chip .ck{margin-left:auto;font-size:20px}
.lf-pts{background:var(--card);border:3px solid var(--navy);border-radius:24px;padding:16px 18px;margin:12px 0;display:flex;flex-direction:column;gap:14px}
.lf-pt{display:flex;gap:10px;font-size:24px;line-height:2.1;color:var(--ink)}
.lf-pt>span{display:block;flex:1 1 0;min-width:0}
.lf-pt i{flex:none;font-style:normal;width:30px;height:30px;border-radius:50%;background:var(--acc-soft);border:2px solid var(--navy);font-family:var(--ui);font-size:16px;display:flex;align-items:center;justify-content:center;margin-top:12px}
.lf-rule{background:#FFF3D6;border:3px solid #E0B24A;border-radius:22px;padding:14px 18px;margin:12px 0;font-size:24px;color:var(--ink);text-align:center}
.lf-rule .lb{font-family:var(--ui);font-size:15px;color:#9a6b00;margin-bottom:4px}
.lf-safe{background:#EAF3FF;border:2px solid #5B9BE0;border-radius:18px;padding:12px 16px;margin:10px 0;font-size:20px;line-height:1.9;color:var(--ink)}
.lf-qn{font-family:var(--ui);font-size:15px;color:var(--muted);text-align:center;margin-top:6px}
.lf-q{font-size:28px;line-height:2.1;color:var(--navy);margin:8px 0 14px;text-align:center}
.lf-opts{display:flex;flex-direction:column;gap:12px}
.lf-opt .zt,.lf-q .zt,.lf-rule .zt,.lf-safe .zt{display:block;min-width:0;max-width:100%}
.lf-opt{display:block;width:100%;text-align:left;background:var(--card);border:3px solid var(--navy);border-radius:20px;padding:14px 18px;font-size:24px;line-height:2;color:var(--ink)}
.lf-opt:active{transform:scale(.99)}
.lf-opt.ok{background:#DDF3E3;border-color:#2f8a4a}
.lf-opt.bad{background:#FDE4E4;border-color:#d0504f}
.lf-opt[disabled]{opacity:1}
.lf-why{background:var(--card);border:3px dashed var(--navy);border-radius:20px;padding:12px 16px;margin:14px 0;font-size:22px;line-height:2;color:var(--ink)}
.lf-why .hd{font-family:var(--ui);font-size:15px;margin-bottom:2px}
.lf-why .hd.ok{color:#2f8a4a}.lf-why .hd.bad{color:#b53a38}
.lf-stars{font-size:44px;text-align:center;margin:8px 0;letter-spacing:6px}
.lf-big{font-size:30px;text-align:center;color:var(--navy);margin:6px 0 10px}
.lf-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:14px}
`;

const head = spaHead({ title: "生活芽｜芽芽學堂", icon: "/img/life-32.png" }) + LIFE_CSS;

const SHELL_A = `
const JH = {"content-type":"application/json"};
window.zyDrawer = (t, z) => zy({t: t, z: z});
const LIFE = ${JSON.stringify(LIFE_DATA)};
const state = { view:"home", station:"life", grade:null, usersLoaded:false, user:null, users:[], sprout:{n:0,last:""}, life:{}, q:null, topic:null, speaking:false, fs:{g3:30,g1:34}, toast:null, watering:false };
const app = document.getElementById("app");
function api(path, body){ return fetch(path, {method:"POST", headers:JH, body:JSON.stringify(body)}); }
function go(view, extra){ stopSpeak(); Object.assign(state, extra||{}); state.view = view; render(); window.scrollTo({top:0}); }
`;

const SHELL_B = `
const LCAT = Object.fromEntries(LIFE.cats.map(c => [c.k, c]));
const LTOP = Object.fromEntries(LIFE.topics.map(t => [t.id, t]));
const LCOL = {s:"#E8F1FB", b:"#F3E8FB", h:"#FDEBEC", m:"#FFF3D6"};
function lifeWeekIdx(){
  const a = LIFE.w0, b = mathDate();
  const ms = s => Date.UTC(+s.slice(0,4), +s.slice(4,6)-1, +s.slice(6,8));
  return Math.max(0, Math.floor((ms(b) - ms(a)) / (7*86400000)));
}
function lifeUnlocked(){
  const k = lifeWeekIdx(), n = LIFE.order.length, list = [];
  for (let i = Math.min(k, n-1); i >= 0; i--) list.push(LIFE.order[i]);
  if (k >= n) { const cur = LIFE.order[k % n]; return [cur].concat(list.filter(x => x !== cur)); }
  return list;
}
function lifeDone(id){ const r = state.life[id]; return !!(r && r.n); }
function lifeWeekLabel(){
  const k = lifeWeekIdx(), d = new Date(Date.UTC(+LIFE.w0.slice(0,4), +LIFE.w0.slice(4,6)-1, +LIFE.w0.slice(6,8)) + k*7*86400000);
  return (d.getUTCMonth()+1) + "/" + d.getUTCDate() + " 這一週";
}
function water(){
  const u = state.user; if (!u || state.watering) return;
  if ((state.sprout||{}).last===mathDate()) return;
  state.watering = true;
  api("/api/water",{uid:u.id}).then(r=>r.ok?r.json():null).then(j=>{
    if (j && state.user && state.user.id===u.id) { state.sprout = {n:j.n,last:j.last}; if (j.watered) { state.toast = {harvest:j.n%21===0}; spToast(); } }
  }).catch(()=>{}).finally(()=>{ state.watering = false; });
}
function saveLife(){ const u = state.user; if (u) api("/api/state", {uid:u.id, key:"life", val:state.life}).catch(()=>{}); }
function emBox(t){ return '<span class="lf-em" style="background:' + LCOL[t.c] + '" aria-hidden="true">' + t.e + '</span>'; }
function viewHome(){
  const un = lifeUnlocked(), cur = LTOP[un[0]], past = un.slice(1).map(id => LTOP[id]);
  const done = lifeDone(cur.id);
  let h = '<div class="hello hq">' + zy(LIFE.ui.week) + '</div><div class="lf-wk">' + lifeWeekLabel() + '</div>';
  h += '<button class="lf-this" data-act="topic" data-id="' + cur.id + '">' + emBox(cur) + '<span class="lf-tt"><span class="lf-cat">' + esc(LCAT[cur.c].e + " " + LCAT[cur.c].t.t) + '</span><span class="lf-name">' + zy(cur.t) + '</span><span class="lf-st' + (done?" done":"") + '">' + (done ? "✓ 做過了，可以再複習" : "還沒做，來看看吧") + '</span></span></button>';
  if (past.length) {
    h += '<div class="lf-h2">' + zy(LIFE.ui.past) + '</div><div class="lf-past">' + past.map(t => '<button class="lf-chip" data-act="topic" data-id="' + t.id + '">' + emBox(t) + '<span class="nm">' + zy(t.t) + '</span>' + (lifeDone(t.id) ? '<span class="ck" aria-label="做過了">✅</span>' : '') + '</button>').join("") + '</div>';
  }
  return h;
}
function ptsPlain(t){ return t.pts.map(p => plain(p)); }
function viewTopic(){
  const t = LTOP[state.topic]; if (!t) return viewHome();
  let h = '<div class="lf-tt" style="align-items:center;text-align:center;margin:4px 0 6px">' + emBox(t) + '<span class="lf-cat">' + esc(LCAT[t.c].e + " " + LCAT[t.c].t.t) + '</span><span class="lf-name">' + zy(t.t) + '</span></div>';
  if (t.c === "b") h += '<div class="lf-safe">' + zy(LIFE.ui.safe) + '</div>';
  h += '<div class="tools">' + (synth ? '<button class="btn" data-act="say"><span class="ic" aria-hidden="true">🔊</span>' + U("listen") + '</button>' : '') + '</div>';
  h += '<div class="lf-pts">' + t.pts.map((p,i) => '<div class="lf-pt"><i>' + (i+1) + '</i><span>' + zy(p) + '</span></div>').join("") + '</div>';
  h += '<div class="lf-rule"><div class="lb">' + zy(LIFE.ui.kou) + '</div>' + zy(t.rule) + '</div>';
  h += '<div class="tools"><button class="btn primary" data-act="start">' + U("quiz") + '<span class="ic" aria-hidden="true">→</span></button></div>';
  return h;
}
function viewQuiz(){
  const q = state.q, t = LTOP[q.id], it = t.qs[q.i];
  let h = '<div class="lf-qn">' + esc(t.e + " ") + zy(t.t) + '　' + (q.i+1) + ' / ' + t.qs.length + '</div><div class="lf-q">' + zy(it.q) + '</div><div class="lf-opts">';
  h += it.o.map((o,i) => {
    const cls = q.pick === null ? "" : (i === it.a ? " ok" : (i === q.pick ? " bad" : ""));
    return '<button class="lf-opt' + cls + '" data-act="opt" data-i="' + i + '"' + (q.pick !== null ? " disabled" : "") + '>' + zy(o) + '</button>';
  }).join("") + '</div>';
  if (q.pick !== null) {
    const good = q.pick === it.a;
    h += '<div class="lf-why"><div class="hd ' + (good ? "ok" : "bad") + '">' + (good ? "答對了！" : "再想一想，正確答案是第 " + (it.a+1) + " 個") + '</div>' + zy(it.w) + '</div>';
    h += '<div class="tools"><button class="btn primary" data-act="next">' + (q.i + 1 < t.qs.length ? U("next") : U("result")) + '<span class="ic" aria-hidden="true">→</span></button></div>';
  }
  return h;
}
function viewDone(){
  const q = state.q, t = LTOP[q.id], n = t.qs.length;
  let h = '<div class="lf-stars" aria-label="答對 ' + q.ok + ' 題">' + "⭐".repeat(q.ok) + '<span style="opacity:.25">' + "⭐".repeat(n - q.ok) + '</span></div>';
  h += '<div class="lf-big">' + (q.ok === n ? U("great") : q.ok >= Math.ceil(n/2) ? U("good") : U("keep")) + '</div>';
  h += '<div class="lf-rule"><div class="lb">' + zy(LIFE.ui.kou) + '</div>' + zy(t.rule) + '</div>';
  if (t.c === "b") h += '<div class="lf-safe">' + zy(LIFE.ui.safe2) + '</div>';
  h += '<div class="lf-btns"><button class="btn" data-act="start">' + U("again") + '</button><button class="btn primary" data-act="home">' + zy(LIFE.ui.home) + '</button></div>';
  return h;
}
function header(){
  const back = state.view==="home"
    ? '<a class="chip" href="/"><span aria-hidden="true">←</span>' + U("home") + '</a>'
    : '<button class="chip" data-act="back"><span aria-hidden="true">←</span>' + U("back") + '</button>';
  return '<div class="top">${HBG}<div class="brand"><img class="blogo" src="/img/life-192.webp" alt="" width="44" height="44"><span>生活芽</span></div>' + back + '</div>' + holGarland();
}
function note(msg){ app.className = "wrap"; app.innerHTML = header() + '<div class="note">' + msg + '</div>'; }
function render(){
  if (!state.usersLoaded || !state.user) return;
  const v = state.view;
  app.innerHTML = header() + (v==="topic" ? viewTopic() : v==="quiz" ? viewQuiz() : v==="done" ? viewDone() : viewHome());
  spToast();
  app.className = "wrap " + (state.user.grade||"") + " s-life";
  app.style.removeProperty("--fs");
}
function startQuiz(id){ go("quiz", {topic:id, q:{id:id, i:0, ok:0, pick:null}}); }
app.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act, q = state.q;
  if (act==="topic") go("topic", {topic:b.dataset.id});
  else if (act==="home") go("home", {q:null, topic:null});
  else if (act==="back") { if (state.view==="topic") go("home", {q:null, topic:null}); else go("topic", {q:null}); }
  else if (act==="say") { if (state.speaking) stopSpeak(); else { const t = LTOP[state.topic]; speakList([plain(t.t)].concat(ptsPlain(t)).concat([plain(t.rule)])); } }
  else if (act==="start") startQuiz(b.dataset.id || (q && q.id) || state.topic);
  else if (act==="opt") { if (q.pick !== null) return; q.pick = Number(b.dataset.i); if (q.pick === LTOP[q.id].qs[q.i].a) q.ok++; render(); }
  else if (act==="next") {
    const t = LTOP[q.id];
    if (q.i + 1 < t.qs.length) { q.i++; q.pick = null; go("quiz"); return; }
    const prev = state.life[q.id] || {};
    state.life[q.id] = { ok: Math.max(prev.ok || 0, q.ok), n: t.qs.length, at: mathDate() };
    saveLife(); water(); go("done");
  }
});
holInit();
(async () => {
  let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch(_) {}
  const lockedMsg = '請先回<a href="/">首頁</a>解鎖，再進來喔。';
  const needUser = () => note('請先在<a href="/">首頁</a>選好是誰在用，再點生活芽。');
  if (!uid) return needUser();
  try {
    const ru = await fetch("/api/users", {cache:"no-store"});
    if (ru.status === 401) return note(lockedMsg);
    if (!ru.ok) throw 1;
    state.users = await ru.json();
    const me = state.users.find(x => x.id === uid);
    if (!me) return needUser();
    state.user = me;
    const rs = await fetch("/api/state?uid=" + encodeURIComponent(uid), {cache:"no-store"});
    if (rs.status === 401) return note(lockedMsg);
    if (rs.ok) { const j = await rs.json(); state.sprout = j.sprout || {n:0,last:""}; state.life = j.life || {}; }
    state.usersLoaded = true;
    go("home");
  } catch (_) { note("生活芽打不開，請檢查網路後重新整理。"); }
})();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + WD_JS + HOL_JS + SHELL_B + "</script></body></html>";
