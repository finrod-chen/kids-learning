// 芽芽小占卜頁面（/fortune）預覽版：每天抽一張小任務卡（家人、禮貌、自己、小冒險）。
// 任務庫（含注音）在 fortune-data.js。預覽版不存檔、不澆水，「再抽一次」只在預覽用。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { HOL_JS } from "./hol-lib.js";
import { HBG } from "./shared.js";
import { FORTUNE_DATA } from "./fortune-data.js";

export const FORTUNE_CSS = `
.fo-hero{text-align:center;margin:6px 0 4px}
.fo-sub{font-family:var(--ui);font-size:15px;color:var(--muted);text-align:center;margin-bottom:14px}
.fo-seedbtn{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;background:var(--card);border:3px solid var(--navy);border-radius:28px;padding:26px 16px;box-shadow:0 6px 0 var(--navy);margin:10px 0 18px}
.fo-seedbtn:active{transform:translateY(2px);box-shadow:0 4px 0 var(--navy)}
.fo-seed{font-size:92px;line-height:1;display:inline-block;animation:fo-bob 2.4s ease-in-out infinite}
.fo-seed.shake{animation:fo-shake .55s ease-in-out 1}
.fo-tap{font-size:26px;color:var(--navy);font-weight:700}
.fo-card{position:relative;background:var(--card);border:3px solid var(--navy);border-radius:28px;padding:22px 20px 20px;box-shadow:0 6px 0 var(--navy);margin:10px 0;text-align:center;animation:fo-pop .6s cubic-bezier(.2,1.4,.4,1) 1}
.fo-card.lucky{background:linear-gradient(160deg,#FFF6D6,#FFE7A3);border-color:#E0B24A;box-shadow:0 6px 0 #E0B24A}
.fo-cat{display:inline-flex;align-items:center;gap:6px;font-family:var(--ui);font-size:16px;color:var(--ink);padding:5px 14px;border-radius:999px;margin-bottom:6px}
.fo-em{font-size:60px;margin:2px 0}
.fo-task{font-size:32px;line-height:2.2;color:var(--navy);font-weight:700;overflow-wrap:anywhere}
.fo-lucky{font-size:34px;color:#C77700;font-weight:800;margin-bottom:2px}
.fo-luckyd{font-size:20px;color:#8a5a00;margin-bottom:6px}
.fo-spark{position:absolute;font-size:24px;animation:fo-twinkle 1.6s ease-in-out infinite}
.fo-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:14px}
.fo-ok{background:#2f8a4a;color:#fff;border:3px solid var(--navy);border-radius:999px;padding:12px 26px;font-size:24px;box-shadow:0 4px 0 var(--navy)}
.fo-ok:active{transform:translateY(2px);box-shadow:0 2px 0 var(--navy)}
.fo-say,.fo-again{background:var(--card);border:2px solid var(--navy);border-radius:999px;padding:10px 20px;font-size:20px;color:var(--ink)}
.fo-again{border-style:dashed;color:var(--muted);font-size:17px}
.fo-done{background:#DDF3E3;border:3px solid #2f8a4a;border-radius:22px;padding:16px;margin-top:14px;text-align:center;font-size:24px;color:#1f6a37;line-height:2.1}
.fo-note{font-family:var(--ui);font-size:13px;color:var(--muted);text-align:center;margin-top:16px}
@keyframes fo-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes fo-shake{0%{transform:rotate(0)}15%{transform:rotate(-14deg)}30%{transform:rotate(12deg)}45%{transform:rotate(-10deg)}60%{transform:rotate(8deg)}75%{transform:rotate(-4deg)}100%{transform:rotate(0)}}
@keyframes fo-pop{0%{transform:scale(.4) rotate(-6deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes fo-twinkle{0%,100%{opacity:.25;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
@media (prefers-reduced-motion:reduce){.fo-seed,.fo-card,.fo-spark{animation:none}}
`;

const head = spaHead({ title: "芽芽小占卜｜芽芽學堂", icon: "/img/main-32.png" }) + FORTUNE_CSS;

const SHELL_A = `
const JH = {"content-type":"application/json"};
window.zyDrawer = (t, z) => zy({t: t, z: z});
const FORT = ${JSON.stringify(FORTUNE_DATA)};
const PREVIEW = true;
const state = { view:"home", station:"fortune", grade:null, usersLoaded:false, user:null, users:[], sprout:{n:0,last:""}, pick:null, extra:0, did:false, speaking:false, fs:{g3:30,g1:34}, toast:null };
const app = document.getElementById("app");
function go(view, extra){ stopSpeak(); Object.assign(state, extra||{}); state.view = view; render(); window.scrollTo({top:0}); }
`;

const SHELL_B = `
const FCAT = Object.fromEntries(FORT.cats.map(c => [c.k, c]));
const FU = k => zy(FORT.ui[k]);
function fHash(s){ let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0); }
function pickToday(extra){
  const key = state.user.id + ":" + mathDate() + ":" + extra, h = fHash(key);
  const t = FORT.tasks[h % FORT.tasks.length];
  const lucky = fHash("lucky:" + key) % 10 === 0;
  return { id: t.id, lucky };
}
function header(){
  return '<div class="top">${HBG}<div class="brand"><span aria-hidden="true" style="font-size:32px">🔮</span><span>芽芽小占卜</span></div><a class="chip" href="/"><span aria-hidden="true">←</span>' + FU("home") + '</a></div>' + holGarland();
}
function viewHome(){
  return '<div class="hello hq fo-hero">' + FU("title") + '</div><div class="fo-sub">' + FU("sub") + '</div>' +
    '<button class="fo-seedbtn" data-act="draw" aria-label="抽今天的任務"><span class="fo-seed" id="seed" aria-hidden="true">🌰</span><span class="fo-tap">' + FU("tap") + '</span></button>' +
    '<div class="fo-note">預覽版：還不會存檔，也不會澆水。</div>';
}
function viewCard(){
  const p = state.pick, t = FORT.tasks.find(x => x.id === p.id), c = FCAT[t.c];
  let h = '<div class="fo-card' + (p.lucky ? " lucky" : "") + '">';
  if (p.lucky) h += '<span class="fo-spark" style="left:14px;top:12px" aria-hidden="true">✨</span><span class="fo-spark" style="right:16px;top:20px;animation-delay:.5s" aria-hidden="true">⭐</span><span class="fo-spark" style="left:24px;bottom:70px;animation-delay:1s" aria-hidden="true">✨</span>';
  if (p.lucky) h += '<div class="fo-lucky">' + FU("lucky") + '</div><div class="fo-luckyd">' + FU("luckyd") + '</div>';
  h += '<div class="fo-cat" style="background:' + c.bg + '">' + esc(c.e + " ") + zy(c.t) + '</div><div class="fo-em" aria-hidden="true">' + c.e + '</div>';
  h += '<div class="fo-task">' + zy(t.t) + '</div></div>';
  h += '<div class="fo-btns"><button class="fo-say" data-act="say">🔊 ' + FU("say") + '</button>';
  if (!state.did) h += '<button class="fo-ok" data-act="ok">' + FU("done") + '</button>';
  h += '</div>';
  if (state.did) h += '<div class="fo-done">🎉 ' + FU("praise") + '<br>' + FU("water") + '</div>';
  if (PREVIEW) h += '<div class="fo-btns"><button class="fo-again" data-act="again">' + FU("again") + '</button></div><div class="fo-note">預覽版：按「我做到了」還不會真的澆水。</div>';
  return h;
}
function render(){
  if (!state.usersLoaded || !state.user) return;
  app.innerHTML = header() + (state.view==="card" ? viewCard() : viewHome());
  app.className = "wrap " + (state.user.grade||"") + " s-fortune";
  app.style.removeProperty("--fs");
}
function reveal(){
  const seed = document.getElementById("seed"); if (!seed) return go("card");
  seed.classList.add("shake");
  setTimeout(() => go("card"), 620);
}
app.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act;
  if (act==="draw") { state.extra = 0; state.did = false; state.pick = pickToday(0); reveal(); }
  else if (act==="again") { state.extra++; state.did = false; state.pick = pickToday(state.extra); go("card"); }
  else if (act==="ok") { state.did = true; render(); }
  else if (act==="say") { const t = FORT.tasks.find(x => x.id === state.pick.id); if (state.speaking) stopSpeak(); else speakList([plain(t.t)]); }
});
holInit();
(async () => {
  let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch(_) {}
  const lockedMsg = '請先回<a href="/">首頁</a>解鎖，再進來喔。';
  const needUser = () => note('請先在<a href="/">首頁</a>選好是誰在用，再來占卜。');
  if (!uid) return needUser();
  try {
    const ru = await fetch("/api/users", {cache:"no-store"});
    if (ru.status === 401) return note(lockedMsg);
    if (!ru.ok) throw 1;
    state.users = await ru.json();
    const me = state.users.find(x => x.id === uid);
    if (!me) return needUser();
    state.user = me; state.usersLoaded = true;
    go("home");
  } catch (_) { note("小占卜打不開，請檢查網路後重新整理。"); }
})();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + WD_JS + HOL_JS + SHELL_B + "</script></body></html>";
