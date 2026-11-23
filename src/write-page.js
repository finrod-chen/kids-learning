// 寫寫芽頁面（/write）：從首頁 SPA 搬出來的獨立頁面。
// 生字、出題、寫字板、造句、測驗的程式全部是從首頁逐字切出來的（write-lib.js / write-data.js / spa-lib.js），
// 這裡只有「外殼」：載入使用者與紀錄、畫面切換、按鈕事件。資料沿用 /api/state 的 write，完成後呼叫 /api/water 幫小芽澆水。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { WRITE_JS } from "./write-lib.js";

const head = spaHead({ title: "寫寫芽｜芽芽學堂", icon: "/img/write-32.png" });

const SHELL_A = `
const JH = {"content-type":"application/json"};
// 側欄選單的站名用 zyDrawer(文字, 注音)；首頁 SPA 的 zy 吃的是 {t,z} 物件，所以包一層。
window.zyDrawer = (t, z) => zy({t: t, z: z});
const state = { view:"wr", station:"write", grade:null, usersLoaded:false, user:null, users:[], sprout:{n:0,last:""}, write:{}, fs:{g3:30,g1:34}, wr:null, toast:null, watering:false };
try { const f = JSON.parse(localStorage.getItem("fs")||"null"); if (f && f.g3 && f.g1) state.fs = f; } catch(_) {}
const app = document.getElementById("app");
function api(path, body){ return fetch(path, {method:"POST", headers:JH, body:JSON.stringify(body)}); }
function go(view, extra){ stopSpeak(); Object.assign(state, extra||{}); state.view = view; render(); window.scrollTo({top:0}); }
`;

const SHELL_B = `
function header(){
  return '<div class="top"><div class="brand"><img class="blogo" src="/img/write.webp" alt="" width="44" height="44"><span>寫寫芽</span></div><a class="chip" href="/"><span aria-hidden="true">←</span>' + U("home") + '</a></div>' + holGarland();
}
function note(msg){ app.className = "wrap"; app.innerHTML = header() + '<div class="note">' + msg + '</div>'; }
function render(){
  if (!(state.view==="wr" && state.usersLoaded && state.user)) return;
  app.innerHTML = header() + viewWr();
  spToast();
  app.className = "wrap " + (state.grade||"") + " s-write";
  app.style.setProperty("--fs", Math.round(state.fs[state.grade||"g3"]*(innerWidth<600?0.72:1))+"px");
  const t = state.wr;
  if (t && t.done) water();
  if (!(!t || t.done || "c" !== (wSteps(t.g)[t.step]||"").charAt(0) || (wStore()[wKey(t.g)] && !t.again))) wSetupPad();
}
app.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const s = b.dataset.act, a = state.wr;
  if (s==="holsay" && HOL) speakList([plain(HOL.intro)]);
  else if (s==="holw" && HOL) speakList([HOL.en[Number(b.dataset.i)].w], null, null, "en-US");
  else if (!a || state.view!=="wr") return;
  else if (s==="wsay") { const t = wInfo(); speakList([t.c, plain(t.w)]); }
  else if (s==="wplay") wPlay();
  else if (s==="wclear") { a.ink[a.step] = []; a.warn = false; render(); }
  else if (s==="wdone") {
    const t = wInfo(), n = (a.ink[a.step]||[]).length;
    if (!n) return;
    if (n < t.s && !a.warn) { a.warn = true; render(); requestAnimationFrame(()=>{ const w = document.querySelector(".wwarn"); if (w) w.scrollIntoView({behavior:"smooth", block:"nearest"}); }); }
    else wAdvance();
  }
  else if (s==="wnext") wAdvance();
  else if (s==="wcheck") wCheck();
  else if (s==="wpaper") { const t = document.getElementById("wsent"); if (t) a.sent = t.value; a.paper = true; a.chk = {use:[], len:true, end:true}; render(); }
  else if (s==="wref") { const t = document.getElementById("wsent"); if (t) a.sent = t.value; a.showRef = true; render(); }
  else if (s==="wsayref") speakList([plain(a.day.scene.ex)]);
  else if (s==="wsayq") { const t = a.qs[a.qi].c; speakList([plain(t.w)]); }
  else if (s==="wpick") {
    if (a.picked) return;
    const t = a.qs[a.qi].c;
    a.picked = b.dataset.c; if (a.picked===t.c) a.ok++;
    render();
    if (synth) speakList([a.picked===t.c ? "答對了！" : "再想一想喔。正確答案是 "+t.c]);
  }
  else if (s==="wqnext") {
    if (a.qi < a.qs.length-1) { a.qi++; a.picked = null; render(); window.scrollTo({top:0}); }
    else { a.done = true; wSave(); render(); window.scrollTo({top:0}); }
  }
  else if (s==="wagain") {
    const g = a.g, d = mathDate(), day = wDay(g, d);
    state.wr = {g, d, day, step:0, ink:[[],[]], warn:false, sent:"", chk:null, paper:false, qs:wQuiz(g, d, day.chars), qi:0, picked:null, ok:0, done:false, again:true};
    render(); window.scrollTo({top:0});
  }
}, true);
app.addEventListener("input", e => { if (e.target && e.target.id==="wsent" && state.wr) state.wr.sent = e.target.value; });
holInit();
(async () => {
  let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch(_) {}
  const lockedMsg = '請先回<a href="/">首頁</a>解鎖，再進來喔。';
  const needUser = () => note('請先在<a href="/">首頁</a>選好是誰在用，再點寫寫芽。');
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
    if (rs.ok) { const j = await rs.json(); state.sprout = j.sprout || {n:0,last:""}; state.write = j.write || {}; }
    state.usersLoaded = true;
    wOpen();
  } catch (_) { note("寫寫芽打不開，請檢查網路後重新整理。"); }
})();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + WD_JS + WRITE_JS + SHELL_B + "</script></body></html>";
