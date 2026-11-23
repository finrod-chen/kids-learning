// 家長學習紀錄頁（/learn/parent，只內嵌在 /parent 的「學習紀錄」分頁裡）：從首頁 SPA 搬出來。
// 每週各站作答、小芽、貼貼芽、苗苗最近提問的程式（parent-lib.js）逐字切自首頁，並共用貼貼芽（stk-lib.js）、聊聊芽（chat-lib.js）、算算芽（math-lib.js）的函式；
// 這裡只有外殼：載入孩子名單、切換孩子／週次、刪除孩子、修改 PIN。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { HOL_JS } from "./hol-lib.js";
import { STK_JS, STK_CSS } from "./stk-lib.js";
import { STK_EXTRA_JS } from "./stk-extra.js";
import { CHAT_JS, CHAT_CSS } from "./chat-lib.js";
import { MATH_JS } from "./math-lib.js";
import { WRITE_JS } from "./write-lib.js";
import { PARENT_JS } from "./parent-lib.js";

const head = spaHead({ title: "學習紀錄｜芽芽學堂", icon: "/img/parent-192.webp" }) + STK_CSS + CHAT_CSS + ".parent h2,.parent .pbar{display:none}\n";

const SHELL_A = `
const JH = {"content-type":"application/json"};
window.zyDrawer = (t, z) => zy({t: t, z: z});
const state = { view:"parent", station:null, grade:null, usersLoaded:false, user:null, users:[], articles:[], answers:{}, speaking:false, fs:{g3:30,g1:34}, toast:null, watering:false, pu:null, pw:0, pstate:null, pArts:null, pAns:null, sprout:{n:0,last:""}, math:{}, news:{}, chores:{}, write:{}, stick:null, stickOk:false, stickUid:null };
const app = document.getElementById("app");
function api(path, body){ return fetch(path, {method:"POST", headers:JH, body:JSON.stringify(body)}); }
function go(view, extra){ Object.assign(state, extra||{}); state.view = view; render(); }
function reloadTop(){ try { window.top.location.reload(); } catch(_) { location.reload(); } }
`;

const SHELL_B = `
function note(msg){ app.className = "wrap"; app.innerHTML = '<div class="note">' + msg + '</div>'; }
function render(){
  if (!state.usersLoaded) return;
  app.innerHTML = viewParent();
  app.className = "wrap"; app.style.removeProperty("--fs");
}
app.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act;
  if (act==="pweek") { state.pw=Math.max(-4,Math.min(0,(state.pw||0)+Number(b.dataset.d))); render(); }
  else if (act==="puser") { state.pu=b.dataset.id; state.pstate=null; state.pArts=null; state.pAns=null; render(); loadPData(); }
  else if (act==="pdel") { const u=state.users.find(x=>x.id===b.dataset.id); if (u && confirm("要刪除「"+u.nick+"」和他所有的學習紀錄嗎？刪除後無法復原。")) { api("/api/users/delete",{id:u.id}).then(r=>{ if(!r.ok){ if(r.status===403) reloadTop(); else alert("刪除失敗，請再試一次"); return; } try{ if (localStorage.getItem("kids.uid")===u.id) localStorage.removeItem("kids.uid"); }catch(_){} reloadTop(); }).catch(()=>{}); } }
  else if (act==="pinchg") { const o = prompt("請輸入目前的 6 碼 PIN"); if (o===null) return; const n = prompt("請輸入新的 6 碼 PIN"); if (n===null) return; if (!/^[0-9]{6}$/.test(n)) { alert("PIN 要是 6 個數字"); return; } api("/api/pin/change",{old:o,new:n}).then(r=>alert(r.ok ? "已修改。其他裝置需要重新輸入新的 PIN。" : "目前的 PIN 不正確，或試太多次了，請稍後再試。")).catch(()=>alert("連不上網路")); }
});
holInit();
(async () => {
  let uid = null; try { uid = new URLSearchParams(location.search).get("uid") || localStorage.getItem("kids.uid"); } catch(_) {}
  const lockedMsg = '請先回<a href="/">首頁</a>解鎖，再進來喔。';
  try {
    const ru = await fetch("/api/users", {cache:"no-store"});
    if (ru.status === 401) return note(lockedMsg);
    if (!ru.ok) throw 1;
    state.users = await ru.json();
    const me = state.users.find(x => x.id === uid) || state.users[0];
    if (!me) return note("還沒有孩子，請先回首頁新增。");
    state.user = me; state.pu = me.id; state.grade = me.grade;
    state.usersLoaded = true;
    render(); loadPData();
  } catch (_) { note("學習紀錄打不開，請重新整理再試。"); }
})();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + WD_JS + HOL_JS + STK_JS + STK_EXTRA_JS + CHAT_JS + MATH_JS + WRITE_JS + PARENT_JS + SHELL_B + "</script></body></html>";
