// 說說芽頁面（/vocab）：從首頁 SPA 搬出來的獨立頁面。
// 單字頁、ABC 字母（vocab-lib.js）與小測驗（quiz-lib.js）、節日主題（hol-lib.js）的程式逐字切自首頁；
// 這裡只有外殼：載入文章／使用者／答題紀錄、畫面切換、按鈕事件。答題存 /api/answers，答完呼叫 /api/water 幫小芽澆水。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { HOL_JS } from "./hol-lib.js";
import { VOCAB_JS } from "./vocab-lib.js";
import { QUIZ_JS } from "./quiz-lib.js";
import { HBG } from "./shared.js";

const head = spaHead({ title: "說說芽｜芽芽學堂", icon: "/img/vocab-32.png" });

const SHELL_A = `
const JH = {"content-type":"application/json"};
// 側欄選單的站名用 zyDrawer(文字, 注音)；首頁 SPA 的 zy 吃的是 {t,z} 物件，所以包一層。
window.zyDrawer = (t, z) => zy({t: t, z: z});
const state = { view:"home", station:"vocab", grade:null, usersLoaded:false, user:null, users:[], articles:[], loadError:false, sprout:{n:0,last:""}, answers:{}, session:{}, art:null, vday:null, qi:0, picked:null, abcI:0, speaking:false, fs:{g3:30,g1:34}, toast:null, watering:false };
try { const f = JSON.parse(localStorage.getItem("fs")||"null"); if (f && f.g3 && f.g1) state.fs = f; } catch(_) {}
const app = document.getElementById("app");
function api(path, body){ return fetch(path, {method:"POST", headers:JH, body:JSON.stringify(body)}); }
async function loadAnswers(){ const uid = state.user && state.user.id; if (!uid) return; try { const r = await fetch("/api/answers?uid="+encodeURIComponent(uid), {cache:"no-store"}); if (r.ok) { const m = {}; (await r.json()).forEach(x => m[x.qid] = x); state.answers = m; } } catch(_) {} }
function go(view, extra){ stopSpeak(); Object.assign(state, extra||{}); state.view = view; render(); window.scrollTo({top:0}); if (["home","vocab"].includes(view)) loadAnswers().then(() => { if (state.view===view) render(); }); }
`;

const SHELL_B = `
function header(){
  const back = state.view==="home"
    ? '<a class="chip" href="/"><span aria-hidden="true">←</span>' + U("home") + '</a>'
    : '<button class="chip" data-act="back"><span aria-hidden="true">←</span>' + U("back") + '</button>';
  return '<div class="top">${HBG}<div class="brand"><img class="blogo" src="/img/vocab.webp" alt="" width="44" height="44"><span>說說芽</span></div>' + back + '</div>' + holGarland();
}
function note(msg){ app.className = "wrap"; app.innerHTML = header() + '<div class="note">' + msg + '</div>'; }
function render(){
  if (!state.usersLoaded || !state.user) return;
  const v = state.view;
  if (v==="done") water();
  app.innerHTML = header() + (v==="vocab" ? viewVocab() : v==="abc" ? viewAbc() : v==="quiz" ? viewQuiz() : v==="done" ? viewDone() : viewHome());
  spToast();
  app.className = "wrap " + (state.grade||"") + ((v==="vocab"||v==="quiz"||v==="done"||v==="abc") ? " s-vocab" : "");
  if (v==="quiz"||v==="done"||v==="vocab") app.style.setProperty("--fs", Math.round(state.fs[state.grade]*(innerWidth<600?0.72:1))+"px"); else app.style.removeProperty("--fs");
}
app.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act;
  if (act==="holsay" && HOL) speakList([plain(HOL.intro)]);
  else if (act==="holw" && HOL) speakList([HOL.en[Number(b.dataset.i)].w], null, null, "en-US");
  else if (act==="grade") go("vocab", {grade:b.dataset.g, vday:null});
  else if (act==="back") { const v = state.view; if (v==="vocab"||v==="abc") go("home", {grade:null}); else if (v==="quiz"||v==="done") go("vocab"); }
  else if (act==="vback") go("vocab");
  else if (act==="vday") go("vocab", {vday:b.dataset.w});
  else if (act==="quiz" || act==="again") go("quiz", {qi:0, picked:null, session:{}});
  else if (act==="sayw") { const w = state.art.words[Number(b.dataset.i)]; speakList([w.w], null, null, "en-US"); }
  else if (act==="sayex") { const w = state.art.words[Number(b.dataset.i)]; speakList([w.ex.en], null, null, "en-US"); }
  else if (act==="sayall") { const it = []; state.art.words.forEach(w => { it.push(w.w, w.ex.en); }); speakList(it, null, null, "en-US"); }
  else if (act==="size") { const g = state.grade; state.fs[g] = Math.max(22, Math.min(46, state.fs[g]+Number(b.dataset.d))); try { localStorage.setItem("fs", JSON.stringify(state.fs)); } catch(_) {} render(); }
  else if (act==="pick") {
    if (state.picked) return; const a = state.art, q = a.questions[state.qi];
    state.picked = b.dataset.k; state.session[q.id] = state.picked; saveAnswer(a, q, state.picked); render();
    if (synth) speakList([state.picked===q.answer ? "答對了！" : "再想一想喔。正確答案是 "+q.answer]);
  }
  else if (act==="nextq") { const n = state.art.questions.length; if (state.qi<n-1) go("quiz", {qi:state.qi+1, picked:null}); else go("done"); }
  else if (act==="abc") go("abc", {abcI:0});
  else if (act==="abcpick") { stopSpeak(); state.abcI = Number(b.dataset.i); render(); speakList([ABC[state.abcI].sp], null, null, "en-US"); }
  else if (act==="abcsay") speakList([ABC[state.abcI||0].sp], null, null, "en-US");
  else if (act==="abcsayw") speakList([ABC[state.abcI||0].w], null, null, "en-US");
  else if (act==="abcall") { const it = []; ABC.forEach(c => { it.push(c.sp, c.w); }); speakList(it, k => { if (k>=0) { const n = Math.floor(k/2); if (n!==state.abcI) { state.abcI = n; render(); } } }, null, "en-US"); }
});
holInit();
(async () => {
  let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch(_) {}
  const lockedMsg = '請先回<a href="/">首頁</a>解鎖，再進來喔。';
  const needUser = () => note('請先在<a href="/">首頁</a>選好是誰在用，再點說說芽。');
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
    go("home", {grade:null});
  } catch (_) { note("說說芽打不開，請檢查網路後重新整理。"); }
})();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + WD_JS + HOL_JS + VOCAB_JS + QUIZ_JS + SHELL_B + "</script></body></html>";
