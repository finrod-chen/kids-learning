// 聊聊芽頁面（/chat）：從首頁 SPA 搬出來的獨立頁面。
// 對話畫面、送出、語音朗讀、錄音（chat-lib.js）與節日主題（hol-lib.js）的程式逐字切自首頁；
// 這裡只有外殼：載入使用者與歷史對話、畫面、按鈕事件。對話走 /api/chat（跟苗苗聊天），「新話題」走 /api/chat/new。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { HOL_JS } from "./hol-lib.js";
import { CHAT_JS, CHAT_CSS } from "./chat-lib.js";
import { HBG } from "./shared.js";

const head = spaHead({ title: "聊聊芽｜芽芽學堂", icon: "/img/chat-32.png" }) + CHAT_CSS;

const SHELL_A = `
const JH = {"content-type":"application/json"};
// 側欄選單的站名用 zyDrawer(文字, 注音)；首頁 SPA 的 zy 吃的是 {t,z} 物件，所以包一層。
window.zyDrawer = (t, z) => zy({t: t, z: z});
const state = { view:"chat", station:"chat", grade:null, usersLoaded:false, user:null, users:[], loadError:false, speaking:false, fs:{g3:30,g1:34}, toast:null, watering:false, cc:null, sprout:{n:0,last:""} };
const app = document.getElementById("app");
function api(path, body){ return fetch(path, {method:"POST", headers:JH, body:JSON.stringify(body)}); }
`;

const SHELL_B = `
function header(){
  return '<div class="top">${HBG}<div class="brand"><img class="blogo" src="' + CH_LOGO + '" alt="" width="44" height="44"><span>聊聊芽</span></div><a class="chip" href="/"><span aria-hidden="true">←</span>' + U("home") + '</a></div>' + holGarland();
}
function note(msg){ app.className = "wrap"; app.innerHTML = header() + '<div class="note">' + msg + '</div>'; }
function render(){
  if (!state.usersLoaded || !state.user) return;
  app.innerHTML = header() + viewChat(); spToast();
  app.className = "wrap " + (state.user.grade||"") + " s-chat"; app.style.removeProperty("--fs");
  chBind();
}
app.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act;
  if (act==="chsend") { const ta = document.getElementById("chq"); if (ta) state.cc.input = ta.value; chSend(); }
  else if (act==="chsug") { const k = b.dataset.k; if (CHU[k]) chSend(CHU[k].t); }
  else if (act==="chmic") chMic();
  else if (act==="chsay") { chUnlock(); const m = (state.cc.list||[]).find(x => String(x.id)===b.dataset.id); if (m) { if (state.speaking) { stopSpeak(); chMark(null); } else chSpeak(m); } }
  else if (act==="chnew") {
    stopSpeak();
    const c = state.cc, l = c.list[c.list.length-1];
    if (l && l.role!=="div") { c.list.push({ id:"d"+Date.now(), role:"div", t:"" }); api("/api/chat/new", { uid: state.user.id }).catch(()=>{}); }
    c.err = ""; render(); chScroll();
  }
});
holInit();
(async () => {
  let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch(_) {}
  const lockedMsg = '請先回<a href="/">首頁</a>解鎖，再進來喔。';
  const needUser = () => note('請先在<a href="/">首頁</a>選好是誰在用，再點聊聊芽。');
  if (!uid) return needUser();
  try {
    const ru = await fetch("/api/users", {cache:"no-store"});
    if (ru.status === 401) return note(lockedMsg);
    if (!ru.ok) throw 1;
    state.users = await ru.json();
    const me = state.users.find(x => x.id === uid);
    if (!me) return needUser();
    state.user = me; state.grade = me.grade;
    state.usersLoaded = true;
    state.cc = { list:[], left:null, max:40, busy:false, input:"", err:"", rec:null, recSec:0, stt:false, auto:chAutoGet(), loaded:false };
    render();
    try {
      const r = await fetch("/api/chat?uid="+encodeURIComponent(me.id), { cache:"no-store" });
      if (r.status === 401) return note(lockedMsg);
      if (r.ok) { const j = await r.json(); state.cc.list = j.list || []; state.cc.left = j.left; state.cc.max = j.max || 40; }
      else state.cc.err = "fail";
    } catch(_) { state.cc.err = "fail"; }
    state.cc.loaded = true;
    render();
  } catch (_) { note("聊聊芽打不開，請檢查網路後重新整理。"); }
})();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + WD_JS + HOL_JS + CHAT_JS + SHELL_B + "</script></body></html>";
