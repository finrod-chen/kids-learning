// 算算芽頁面（/math）：從首頁 SPA 搬出來的獨立頁面。
// 出題、直式輸入、九九乘法表、記錄的程式（math-lib.js）與節日主題（hol-lib.js）逐字切自首頁；
// 這裡只有外殼：載入使用者與紀錄、畫面切換、按鈕事件。紀錄存 /api/state 的 math，做完一回呼叫 /api/water 幫小芽澆水。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { HOL_JS } from "./hol-lib.js";
import { MATH_JS } from "./math-lib.js";
import { HBG } from "./shared.js";

const head = spaHead({ title: "算算芽｜芽芽學堂", icon: "/img/math-32.png" });

const SHELL_A = `
const JH = {"content-type":"application/json"};
// 側欄選單的站名用 zyDrawer(文字, 注音)；首頁 SPA 的 zy 吃的是 {t,z} 物件，所以包一層。
window.zyDrawer = (t, z) => zy({t: t, z: z});
const state = { view:"home", station:"math", grade:null, usersLoaded:false, user:null, users:[], sprout:{n:0,last:""}, math:{}, mq:null, mt:null, speaking:false, fs:{g3:30,g1:34}, toast:null, watering:false };
const app = document.getElementById("app");
function api(path, body){ return fetch(path, {method:"POST", headers:JH, body:JSON.stringify(body)}); }
function go(view, extra){ stopSpeak(); Object.assign(state, extra||{}); state.view = view; render(); window.scrollTo({top:0}); }
`;

const SHELL_B = `
function header(){
  const back = state.view==="home"
    ? '<a class="chip" href="/"><span aria-hidden="true">←</span>' + U("home") + '</a>'
    : '<button class="chip" data-act="back"><span aria-hidden="true">←</span>' + U("back") + '</button>';
  return '<div class="top">${HBG}<div class="brand"><img class="blogo" src="/img/math.webp" alt="" width="44" height="44"><span>算算芽</span></div>' + back + '</div>' + holGarland();
}
function note(msg){ app.className = "wrap"; app.innerHTML = header() + '<div class="note">' + msg + '</div>'; }
function render(){
  if (!state.usersLoaded || !state.user) return;
  const v = state.view;
  if (v==="mq" && state.mq && state.mq.done) water();
  app.innerHTML = header() + (v==="mq" ? viewMq() : v==="mtable" ? viewMTable() : viewMathHome());
  spToast();
  app.className = "wrap " + (state.grade||"") + " s-math";
  app.style.removeProperty("--fs");
}
app.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act;
  if (act==="grade") mathStart(b.dataset.g);
  else if (act==="back") go("home", {grade:null});
  else if (act==="mkey") mKey(b.dataset.v);
  else if (act==="mnext") mNext();
  else if (act==="mretry") mathStart(state.mq.g);
  else if (act==="mtable") go("mtable", {grade:null});
  else if (act==="mpick") { mt().sel = Number(b.dataset.n); render(); }
  else if (act==="mreveal") { const t = mt(); t.rev[b.dataset.k] = !t.rev[b.dataset.k]; render(); }
  else if (act==="mcell") { const t = mt(); t.sel = Number(b.dataset.a); if (t.hide) t.rev[b.dataset.a+"x"+b.dataset.b] = true; render(); }
  else if (act==="mhide") { const t = mt(); t.hide = !t.hide; t.rev = {}; render(); }
});
holInit();
(async () => {
  let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch(_) {}
  const lockedMsg = '請先回<a href="/">首頁</a>解鎖，再進來喔。';
  const needUser = () => note('請先在<a href="/">首頁</a>選好是誰在用，再點算算芽。');
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
    if (rs.ok) { const j = await rs.json(); state.sprout = j.sprout || {n:0,last:""}; state.math = j.math || {}; }
    state.usersLoaded = true;
    go("home", {grade:null});
  } catch (_) { note("算算芽打不開，請檢查網路後重新整理。"); }
})();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + WD_JS + HOL_JS + MATH_JS + SHELL_B + "</script></body></html>";
