// 貼貼芽頁面（/stk）：從首頁 SPA 搬出來的獨立頁面。
// 成就貼紙的資料、判斷、貼紙簿畫面與樣式（stk-lib.js）、節日主題（hol-lib.js）的程式逐字切自首頁；
// 這裡只有外殼：載入文章／答題／各站進度、判斷有沒有新貼紙（stkCheck）、畫面與點貼紙唸出名字。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { HOL_JS } from "./hol-lib.js";
import { STK_JS, STK_CSS } from "./stk-lib.js";
import { STK_EXTRA_JS } from "./stk-extra.js";
import { HBG } from "./shared.js";

const head = spaHead({ title: "貼貼芽｜芽芽學堂", icon: "/img/sticker-32.png" }) + STK_CSS;

const SHELL_A = `
const JH = {"content-type":"application/json"};
// 側欄選單的站名用 zyDrawer(文字, 注音)；首頁 SPA 的 zy 吃的是 {t,z} 物件，所以包一層。
window.zyDrawer = (t, z) => zy({t: t, z: z});
const state = { view:"stk", station:"stk", grade:null, usersLoaded:false, user:null, users:[], articles:[], answers:{}, loadError:false, speaking:false, fs:{g3:30,g1:34}, toast:null, watering:false, sprout:{n:0,last:""}, math:{}, news:{}, chores:{}, write:{}, chbank:{}, stick:null, stickOk:false, stickUid:null };
const app = document.getElementById("app");
function api(path, body){ return fetch(path, {method:"POST", headers:JH, body:JSON.stringify(body)}); }
function go(view){ state.view = view; render(); }
`;

const SHELL_B = `
function header(){
  return '<div class="top">${HBG}<div class="brand"><img class="blogo" src="/img/sticker.webp" alt="" width="44" height="44"><span>貼貼芽</span></div><a class="chip" href="/"><span aria-hidden="true">←</span>' + U("home") + '</a></div>' + holGarland();
}
function note(msg){ app.className = "wrap"; app.innerHTML = header() + '<div class="note">' + msg + '</div>'; }
function render(){
  if (!state.usersLoaded || !state.user) return;
  app.innerHTML = header() + viewStk(); spToast();
  app.className = "wrap s-stk"; app.style.removeProperty("--fs");
}
app.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  if (b.dataset.act==="stksay") {
    const s = SD.list.find(x => x.id===b.dataset.id); if (!s || !synth) return;
    const st = state.stick || stkBlank(), L = stkLv(st, s);
    speakList([plain(s.name) + (s.tiers && L>=0 ? "，"+SD.tiers[L].t : ""), stkDescP(s, L>=0 ? stkTgt(s,L) : s.goal)]);
    b.classList.remove("tap"); void b.offsetWidth; b.classList.add("tap");
  }
});
holInit();
(async () => {
  let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch(_) {}
  const lockedMsg = '請先回<a href="/">首頁</a>解鎖，再進來喔。';
  const needUser = () => note('請先在<a href="/">首頁</a>選好是誰在用，再點貼貼芽。');
  if (!uid) return needUser();
  try {
    const [ra, ru] = await Promise.all([fetch("/api/articles", {cache:"no-store"}), fetch("/api/users", {cache:"no-store"})]);
    if (ra.status === 401 || ru.status === 401) return note(lockedMsg);
    if (ra.ok) state.articles = await ra.json(); else state.loadError = true;
    if (!ru.ok) throw 1;
    state.users = await ru.json();
    const me = state.users.find(x => x.id === uid);
    if (!me) return needUser();
    state.user = me; state.grade = me.grade;
    const rs = await fetch("/api/state?uid=" + encodeURIComponent(uid), {cache:"no-store"});
    if (rs.status === 401) return note(lockedMsg);
    if (rs.ok) { const j = await rs.json(); state.sprout = j.sprout || {n:0,last:""}; state.math = j.math || {}; state.news = j.news || {}; state.chores = j.chores || {}; state.write = j.write || {}; state.stick = j.stick || null; state.chbank = j.chbank || {}; state.stickOk = true; state.stickUid = me.id; }
    try { const r = await fetch("/api/answers?uid=" + encodeURIComponent(uid), {cache:"no-store"}); if (r.ok) { const m = {}; (await r.json()).forEach(x => m[x.qid] = x); state.answers = m; } } catch(_) {}
    state.usersLoaded = true;
    stkCheck();
    render();
  } catch (_) { note("貼貼芽打不開，請檢查網路後重新整理。"); }
})();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + WD_JS + HOL_JS + STK_JS + STK_EXTRA_JS + SHELL_B + "</script></body></html>";
