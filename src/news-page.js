// 新聞芽頁面（/news）：從首頁 SPA 搬出來的獨立頁面。
// 新聞列表與閱讀的程式（news-lib.js）逐字切自首頁；這裡只有外殼：載入文章與使用者、畫面切換、按鈕事件。
// 讀完一篇會記到 /api/state 的 news，並呼叫 /api/water 幫小芽澆水（和首頁版相同）。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { NEWS_JS } from "./news-lib.js";
import { HBG } from "./shared.js";

const head = spaHead({ title: "新聞芽｜芽芽學堂", icon: "/img/news-32.png" });

const SHELL_A = `
const JH = {"content-type":"application/json"};
// 側欄選單的站名用 zyDrawer(文字, 注音)；首頁 SPA 的 zy 吃的是 {t,z} 物件，所以包一層。
window.zyDrawer = (t, z) => zy({t: t, z: z});
const state = { view:"home", station:"news", grade:"g3", usersLoaded:false, user:null, users:[], articles:[], loadError:false, sprout:{n:0,last:""}, news:{}, art:null, speaking:false, fs:{g3:30,g1:34}, toast:null, watering:false };
try { const f = JSON.parse(localStorage.getItem("fs")||"null"); if (f && f.g3 && f.g1) state.fs = f; } catch(_) {}
const app = document.getElementById("app");
function api(path, body){ return fetch(path, {method:"POST", headers:JH, body:JSON.stringify(body)}); }
function go(view, extra){ stopSpeak(); Object.assign(state, extra||{}); state.view = view; render(); window.scrollTo({top:0}); }
`;

const SHELL_B = `
function header(){
  const back = state.view==="nread"
    ? '<button class="chip" data-act="back"><span aria-hidden="true">←</span>' + U("back") + '</button>'
    : '<a class="chip" href="/"><span aria-hidden="true">←</span>' + U("home") + '</a>';
  return '<div class="top">${HBG}<div class="brand"><img class="blogo" src="/img/news.webp" alt="" width="44" height="44"><span>新聞芽</span></div>' + back + '</div>';
}
function note(msg){ app.className = "wrap"; app.innerHTML = header() + '<div class="note">' + msg + '</div>'; }
function render(){
  if (!state.usersLoaded || !state.user) return;
  const v = state.view;
  if (v==="nread") water();
  if (v==="nread" && state.art) newsRead(state.art.id);
  app.innerHTML = header() + (v==="nread" ? viewNRead() : viewNewsHome());
  spToast();
  app.className = "wrap " + (state.grade||"") + " s-news";
  if (v==="nread") app.style.setProperty("--fs", Math.round(state.fs[state.grade]*(innerWidth<600?0.72:1))+"px"); else app.style.removeProperty("--fs");
}
app.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act;
  if (act==="nopen") go("nread", {art: state.articles.find(a => a.id===b.dataset.id)});
  else if (act==="back") go("home");
  else if (act==="size") { const g = state.grade; state.fs[g] = Math.max(22, Math.min(46, state.fs[g]+Number(b.dataset.d))); try { localStorage.setItem("fs", JSON.stringify(state.fs)); } catch(_) {} render(); }
  else if (act==="listen") {
    if (state.speaking) { stopSpeak(); render(); return; }
    const a = state.art; const items = [plain(a.title), ...a.paras.map(plain)];
    speakList(items, i => { app.querySelectorAll(".para").forEach(p => p.classList.toggle("speaking", Number(p.dataset.p)===i-1)); const lb = document.getElementById("listenBtn"); if (lb) lb.innerHTML = '<span class="ic" aria-hidden="true">🔊</span>' + U(state.speaking?"stop":"listen"); });
  }
  else if (act==="sayp") { const i = Number(b.dataset.i); speakList([plain(state.art.paras[i])], k => { app.querySelectorAll(".para").forEach(p => p.classList.toggle("speaking", k===0 && Number(p.dataset.p)===i)); }); }
});
(async () => {
  let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch(_) {}
  const lockedMsg = '請先回<a href="/">首頁</a>解鎖，再進來喔。';
  const needUser = () => note('請先在<a href="/">首頁</a>選好是誰在用，再點新聞芽。');
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
    if (rs.ok) { const j = await rs.json(); state.sprout = j.sprout || {n:0,last:""}; state.news = j.news || {}; }
    state.usersLoaded = true;
    go("home");
  } catch (_) { note("新聞芽打不開，請檢查網路後重新整理。"); }
})();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + NEWS_JS + SHELL_B + "</script></body></html>";
