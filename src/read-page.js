// 讀讀芽頁面（/read）：從首頁 SPA 搬出來的獨立頁面。
// 文章列表、閱讀、特色生字與筆順、生字小遊戲（read-lib.js）與小測驗（quiz-lib.js）、週次與成績（vocab-lib.js 的 gradeArts/weeksFor/artScore）、節日主題（hol-lib.js）的程式逐字切自首頁；
// 這裡只有外殼：載入文章／使用者／答題紀錄、畫面切換、按鈕事件。答題存 /api/answers，答完呼叫 /api/water 幫小芽澆水。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { HOL_JS } from "./hol-lib.js";
import { VOCAB_JS } from "./vocab-lib.js";
import { READ_JS } from "./read-lib.js";
import { QUIZ_JS } from "./quiz-lib.js";
import { HBG } from "./shared.js";

const head = spaHead({ title: "讀讀芽｜芽芽學堂", icon: "/img/reading-32.png" });

const SHELL_A = `
const JH = {"content-type":"application/json"};
// 側欄選單的站名用 zyDrawer(文字, 注音)；首頁 SPA 的 zy 吃的是 {t,z} 物件，所以包一層。
window.zyDrawer = (t, z) => zy({t: t, z: z});
const state = { view:"grade", station:"read", grade:null, week:null, ci:null, gorder:[], gi:0, gpick:null, gok:0, usersLoaded:false, user:null, users:[], articles:[], loadError:false, sprout:{n:0,last:""}, answers:{}, session:{}, art:null, vday:null, qi:0, picked:null, abcI:0, speaking:false, fs:{g3:30,g1:34}, toast:null, watering:false };
try { const f = JSON.parse(localStorage.getItem("fs")||"null"); if (f && f.g3 && f.g1) state.fs = f; } catch(_) {}
const app = document.getElementById("app");
function api(path, body){ return fetch(path, {method:"POST", headers:JH, body:JSON.stringify(body)}); }
async function loadAnswers(){ const uid = state.user && state.user.id; if (!uid) return; try { const r = await fetch("/api/answers?uid="+encodeURIComponent(uid), {cache:"no-store"}); if (r.ok) { const m = {}; (await r.json()).forEach(x => m[x.qid] = x); state.answers = m; } } catch(_) {} }
function go(view, extra){ stopSpeak(); Object.assign(state, extra||{}); state.view = view; render(); window.scrollTo({top:0}); if (["grade"].includes(view)) loadAnswers().then(() => { if (state.view===view) render(); }); }
`;

const SHELL_B = `
function header(){
  const back = state.view==="grade"
    ? '<a class="chip" href="/"><span aria-hidden="true">←</span>' + U("home") + '</a>'
    : '<button class="chip" data-act="back"><span aria-hidden="true">←</span>' + U("back") + '</button>';
  return '<div class="top">${HBG}<div class="brand"><img class="blogo" src="/img/reading.webp" alt="" width="44" height="44"><span>讀讀芽</span></div>' + back + '</div>' + holGarland();
}
function note(msg){ app.className = "wrap"; app.innerHTML = header() + '<div class="note">' + msg + '</div>'; }
function render(){
  if (!state.usersLoaded || !state.user) return;
  const v = state.view;
  if (v==="done") water();
  app.innerHTML = header() + (v==="read" ? viewRead() : v==="quiz" ? viewQuiz() : v==="done" ? viewDone() : v==="game" ? viewGame() : viewGrade());
  spToast();
  app.className = "wrap " + (state.grade||"");
  if (v==="read"||v==="quiz"||v==="done"||v==="game") app.style.setProperty("--fs", Math.round(state.fs[state.grade]*(innerWidth<600?0.72:1))+"px"); else app.style.removeProperty("--fs");
  if (v==="read" && state.ci!=null && state.art.chars) drawStrip(state.art.chars[state.ci]);
}
app.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act;
  if (act==="holsay" && HOL) speakList([plain(HOL.intro)]);
  else if (act==="holw" && HOL) speakList([HOL.en[Number(b.dataset.i)].w], null, null, "en-US");
  else if (act==="week") go("grade", {week:b.dataset.w});
  else if (act==="read") go("read", {art:state.articles.find(a => a.id===b.dataset.id), ci:null});
  else if (act==="back") { const v = state.view; if (v==="read") go("grade"); else if (v==="quiz"||v==="done") go("read"); else if (v==="game") go("read"); }
  else if (act==="quiz" || act==="again") go("quiz", {qi:0, picked:null, session:{}});
  else if (act==="char") { const i = Number(b.dataset.i); state.ci = state.ci===i ? null : i; stopSpeak(); render(); }
  else if (act==="sayc") { const c = state.art.chars[state.ci]; speakList([c.w.t, plain(c.tip)]); }
  else if (act==="game") { const idx = state.art.chars.map((_,i) => i); for (let i=idx.length-1;i>0;i--) { const j = Math.floor(Math.random()*(i+1)); [idx[i],idx[j]] = [idx[j],idx[i]]; } go("game", {gorder:idx, gi:0, gpick:null, gok:0}); }
  else if (act==="gpick") { if (state.gpick) return; const c = state.art.chars[state.gorder[state.gi]]; state.gpick = b.dataset.c; if (state.gpick===c.c) state.gok++; render(); if (synth) speakList([state.gpick===c.c ? "答對了！" : "再想一想喔。正確答案是 "+c.c]); }
  else if (act==="gnext") go("game", {gi:state.gi+1, gpick:null});
  else if (act==="sayg") { const c = state.art.chars[state.gorder[state.gi]]; speakList([c.w.t]); }
  else if (act==="listen") {
    if (state.speaking) { stopSpeak(); render(); return; }
    const a = state.art; const items = [plain(a.title), ...a.paras.map(plain)];
    speakList(items, i => { app.querySelectorAll(".para").forEach(p => p.classList.toggle("speaking", Number(p.dataset.p)===i-1)); const lb = document.getElementById("listenBtn"); if (lb) lb.innerHTML = '<span class="ic" aria-hidden="true">🔊</span>' + U(state.speaking?"stop":"listen"); });
  }
  else if (act==="sayp") { const i = Number(b.dataset.i); speakList([plain(state.art.paras[i])], k => { app.querySelectorAll(".para").forEach(p => p.classList.toggle("speaking", k===0 && Number(p.dataset.p)===i)); }); }
  else if (act==="size") { const g = state.grade; state.fs[g] = Math.max(22, Math.min(46, state.fs[g]+Number(b.dataset.d))); try { localStorage.setItem("fs", JSON.stringify(state.fs)); } catch(_) {} render(); }
  else if (act==="pick") {
    if (state.picked) return; const a = state.art, q = a.questions[state.qi];
    state.picked = b.dataset.k; state.session[q.id] = state.picked; saveAnswer(a, q, state.picked); render();
    if (synth) speakList([state.picked===q.answer ? "答對了！" : "再想一想喔。正確答案是 "+q.answer]);
  }
  else if (act==="nextq") { const n = state.art.questions.length; if (state.qi<n-1) go("quiz", {qi:state.qi+1, picked:null}); else go("done"); }
});
holInit();
(async () => {
  let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch(_) {}
  const lockedMsg = '請先回<a href="/">首頁</a>解鎖，再進來喔。';
  const needUser = () => note('請先在<a href="/">首頁</a>選好是誰在用，再點讀讀芽。');
  if (!uid) return needUser();
  try {
    const [ra, ru] = await Promise.all([fetch("/api/articles", {cache:"no-store"}), fetch("/api/users", {cache:"no-store"})]);
    if (ra.status === 401 || ru.status === 401) return note(lockedMsg);
    if (ra.ok) state.articles = await ra.json(); else state.loadError = true;
    if (!ru.ok) throw 1;
    state.users = await ru.json();
    const me = state.users.find(x => x.id === uid);
    if (!me) return needUser();
    state.user = me;
    const rs = await fetch("/api/state?uid=" + encodeURIComponent(uid), {cache:"no-store"});
    if (rs.status === 401) return note(lockedMsg);
    if (rs.ok) { const j = await rs.json(); state.sprout = j.sprout || {n:0,last:""}; }
    await loadAnswers();
    state.usersLoaded = true;
    state.grade = me.grade; go("grade", {grade:me.grade, week:null});
  } catch (_) { note("讀讀芽打不開，請檢查網路後重新整理。"); }
})();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + WD_JS + HOL_JS + VOCAB_JS + READ_JS + QUIZ_JS + SHELL_B + "</script></body></html>";
