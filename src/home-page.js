// 新首頁（精簡入口）：站內密碼、選小朋友、小芽、貼貼芽卡片與彈窗、各站連結、家長專區入口。
// 各站都已經有自己的網址，這裡只負責「進門」。PIN 畫面、家長閘、小芽卡片（home-lib.js）、
// 貼貼芽（stk-lib.js）、節日主題（hol-lib.js）的程式逐字切自舊首頁；這裡只有外殼。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { HOL_JS } from "./hol-lib.js";
import { STK_JS, STK_CSS } from "./stk-lib.js";
import { STK_EXTRA_JS } from "./stk-extra.js";
import { HOME_JS } from "./home-lib.js";
import { LIFE_DATA } from "./life-data.js";
import { MASCOT_DATA } from "./mascot-data.js";


const MASCOT_CSS = `
.top .whochip{margin-left:auto;align-self:center;padding:4px 12px 4px 6px;font-size:17px;gap:8px;box-shadow:0 2px 0 var(--line)}
.top .whochip .wav{width:30px;height:30px;font-size:16px}
.top .whochip .wsw{font-size:12px}
.mc{display:flex;flex-direction:column;align-items:center;gap:6px;margin:2px 0 12px}
.mc-btn{display:block;background:none;border:0;padding:0;-webkit-tap-highlight-color:transparent}
.mc-wrap{position:relative;display:inline-block}
.mc-img{display:block;width:190px;height:190px;object-fit:contain;filter:drop-shadow(0 8px 10px rgba(38,57,107,.18));animation:mc-bob 3s ease-in-out infinite;transform-origin:50% 90%}
.mc-btn.hop .mc-img{animation:mc-hop .6s ease-out 1}
.mc-btn:active .mc-img{transform:scale(.96)}
.mc-bubble{position:relative;background:var(--card);border:3px solid var(--navy);border-radius:24px;padding:12px 18px;max-width:100%;text-align:center;box-shadow:0 4px 0 var(--navy);font-size:24px;line-height:2.1;color:var(--ink);overflow-wrap:anywhere}
.mc-bubble:before{content:"";position:absolute;left:50%;top:-13px;width:20px;height:20px;background:var(--card);border-left:3px solid var(--navy);border-top:3px solid var(--navy);transform:translateX(-50%) rotate(45deg)}
.mc-tag{display:inline-block;font-family:var(--ui);font-size:15px;color:var(--muted);background:var(--acc-soft);border-radius:999px;padding:2px 12px;margin-bottom:2px}
.mc-hint{font-size:22px;color:var(--muted)}
@keyframes mc-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes mc-hop{0%{transform:translateY(0) scale(1)}30%{transform:translateY(-22px) scale(1.04,.96)}60%{transform:translateY(0) scale(.97,1.03)}100%{transform:translateY(0) scale(1)}}
@media (prefers-reduced-motion:reduce){.mc-img,.mc-btn.hop .mc-img{animation:none}}
@media (max-width:600px){.mc-img{width:170px;height:170px}.mc-bubble{font-size:22px}}
`;

const head = spaHead({ title: "芽芽學堂", icon: "/img/main-32.png" }) + STK_CSS + MASCOT_CSS;

const SHELL_A = `
const MASCOT = ${JSON.stringify(MASCOT_DATA)};
const JH = {"content-type":"application/json"};
const state = { view:"hub", station:null, grade:null, usersLoaded:false, user:null, users:[], usersErr:false, articles:[], answers:{}, loadError:false, speaking:false, fs:{g3:30,g1:34}, toast:null, watering:false, sprout:{n:0,last:""}, math:{}, news:{}, chores:{}, write:{}, chbank:{}, stick:null, stickOk:false, stickUid:null, pinIn:"", pinErr:"", pinBusy:false, pinOk:false, gp:null };
const app = document.getElementById("app");
function api(path, body){ return fetch(path, {method:"POST", headers:JH, body:JSON.stringify(body)}); }
function go(view){ if (view==="stk") { location.href = "/stk"; return; } state.view = view; render(); window.scrollTo({top:0}); }
`;

const SHELL_B = `
const LIFE_ST = ${JSON.stringify({st: LIFE_DATA.st, sub: LIFE_DATA.sub})};
const MOOD = {st:{t:"心情芽",z:"ㄒㄧㄣ|ㄑㄧㄥˊ|ㄧㄚˊ"}, sub:{t:"今天心情怎麼樣？一起來練習",z:"ㄐㄧㄣ|ㄊㄧㄢ|ㄒㄧㄣ|ㄑㄧㄥˊ|ㄗㄣˇ|ㄇㄜ˙|ㄧㄤˋ||ㄧˋ|ㄑㄧˇ|ㄌㄞˊ|ㄌㄧㄢˋ|ㄒㄧˊ"}};
const CARE = {st:{t:"照顧芽",z:"ㄓㄠˋ|ㄍㄨˋ|ㄧㄚˊ"}, sub:{t:"今天你幫了誰？記下來",z:"ㄐㄧㄣ|ㄊㄧㄢ|ㄋㄧˇ|ㄅㄤ|ㄌㄜ˙|ㄕㄟˊ||ㄐㄧˋ|ㄒㄧㄚˋ|ㄌㄞˊ"}};
const CHAT = {st:{t:"聊聊芽",z:"ㄌㄧㄠˊ|ㄌㄧㄠˊ|ㄧㄚˊ"}, sub:{t:"跟苗苗聊天，什麼都可以問",z:"ㄍㄣ|ㄇㄧㄠˊ|ㄇㄧㄠˊ|ㄌㄧㄠˊ|ㄊㄧㄢ||ㄕㄣˊ|ㄇㄜ˙|ㄉㄡ|ㄎㄜˇ|ㄧˇ|ㄨㄣˋ"}};
function stationList(){
  const g1 = state.user && state.user.grade==="g1";
  return [
    ["s-read","/read","/img/reading.webp",UI.readSt,UI.readSub],
    ["s-vocab","/vocab","/img/vocab.webp",UI.vocabSt,UI.vocabSub],
    ["s-write","/write","/img/write.webp",WD.ui.st,g1?WD.ui.subg1:WD.ui.sub],
    ["s-math","/math","/img/math.webp",UI.mUI.mathSt,UI.mUI.mathSub],
    ["s-news","/news","/img/news.webp",UI.nUI.newsSt,UI.nUI.newsSub],
    ["s-chat","/chat","/img/liaoliaoya-512.webp",CHAT.st,CHAT.sub],
    ["s-care","/care","/img/care-192.webp",CARE.st,CARE.sub],
    ["s-mood","/xinqing","/img/xinqingya-512.webp",MOOD.st,MOOD.sub],
    ["s-life","/life","/img/life-512.webp",LIFE_ST.st,LIFE_ST.sub],
    ["s-chores","/chores","/img/chores.webp",CUI.st,CUI.sub],
    ["s-shelf","/shelf","/img/bookshelf.webp",BUI.st,BUI.sub]
  ].map(s => '<a class="station '+s[0]+'" href="'+s[1]+'"><img class="slogo" src="'+s[2]+'" alt="" width="96" height="96"><span class="big">'+zy(s[3])+'</span><span class="sub">'+zy(s[4])+'</span></a>').join("\\n    ");
}
function header(){
  const back = (state.view==="gpin" || (state.view==="who" && state.user)) ? '<button class="chip" data-act="back"><span aria-hidden="true">←</span>' + U("back") + '</button>' : "";
  const chip = (state.view==="hub" && state.user) ? whoChip() : "";
  return '<div class="top"><div class="brand"><img class="blogo" src="/img/main.webp" alt="" width="44" height="44"><span>芽芽學堂</span></div>' + back + chip + '</div>' + holGarland();
}
const PARENT_LINK = '<div class="foot"><a class="plink" href="/parent">家長專區</a></div>';
function viewWho(){
  const us = state.users;
  if (state.usersErr && !us.length) return '<div class="note">連不上網路，請檢查 Wi‑Fi 後重新整理。</div>';
  if (!us.length) return '<div class="hello hq">' + zy(WHO.add) + '</div><div class="note">還沒有小朋友，請爸爸媽媽到家長專區新增。</div>' + PARENT_LINK;
  return '<div class="hello hq">' + zy(WHO.who) + '</div><div class="whol">' + us.map(u => '<button class="grade '+u.grade+' whou" data-act="login" data-id="'+esc(u.id)+'"><span class="big">'+esc(u.nick)+'</span><span class="sub">'+U(u.grade)+'</span></button>').join("") + '</div>' + PARENT_LINK;
}
function whoChip(){ return '<button class="whochip" data-act="who"><span class="wav" aria-hidden="true">' + esc([...state.user.nick][0]||"") + '</span><span class="wnick">' + esc(state.user.nick) + '</span><span class="wsw">' + zy(WHO.swap) + '</span></button>'; }
function fHash(s){ let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0); }
function mascotNext(){
  const n = MASCOT.items.length; let step = 7; const gcd = (a,b) => b ? gcd(b, a % b) : a; while (gcd(step, n) !== 1) step++;
  if (state.mi === undefined) state.mi = fHash(state.user.id + ":" + mathDate()) % n; else state.mi = (state.mi + step) % n;
  return MASCOT.items[state.mi];
}
function mascotHtml(){
  let logo = '<img class="mc-img" src="/img/mascot-512.webp" alt="" width="190" height="190">';
  if (HOL) logo = '<span class="hlwrap">' + logo + '<span class="hbadge" aria-hidden="true">' + [...HOL.garland.replace(/\\uFE0F/g,"")][0] + '</span></span>';
  const m = state.mm;
  const bub = m ? '<div class="mc-tag">' + MASCOT.tags[m.k] + " " + zy(MASCOT.ui[m.k]) + '</div><div>' + zy(m.t) + '</div>' : '<div class="mc-hint">' + zy(MASCOT.ui.hint) + '</div>';
  return '<div class="mc" id="mascot"><button class="mc-btn" data-act="mascot" aria-label="芽芽，點一下聽我說話"><span class="mc-wrap">' + logo + '</span></button><div class="mc-bubble" aria-live="polite">' + bub + '</div></div>';
}
function mascotTap(){
  state.mm = mascotNext();
  const el = document.getElementById("mascot"); if (!el) return;
  el.outerHTML = mascotHtml();
  const b = document.querySelector(".mc-btn"); if (b) { b.classList.add("hop"); setTimeout(() => b.classList.remove("hop"), 700); }
  try { stopSpeak(); speakList([plain(state.mm.t)]); } catch(_) {}
}
function viewHub(){
  const note = state.loadError ? '<div class="note">連不上網路，請檢查 Wi‑Fi 後重新整理。</div>' : "";
  return mascotHtml()
    + (HOL ? holCard() : "") + viewSprouts() + viewStkHub()
    + '<div class="hello hq">' + U("hubQ") + '</div><div class="stations">' + stationList() + '</div>' + note + PARENT_LINK;
}
function gateOpen(kind){
  const back = state.view==="gpin" ? "hub" : state.view;
  fetch("/api/pin", {cache:"no-store"}).then(r => r.ok ? r.json() : {set:true}).catch(() => ({set:true})).then(j => {
    if (!j.set) { gateDone(kind); return; }
    state.gp = {kind:kind, d:"", err:"", busy:false, back:back}; go("gpin");
  });
}
function gateDone(kind){
  if (kind==="parent") { location.href = "/parent"; return; }
  state.view = "who"; render();
}
function render(){
  if (!state.usersLoaded) { app.innerHTML = header() + '<div class="note">載入中…</div>'; return; }
  if (state.view!=="pin" && !state.user && state.view!=="who") state.view = "who";
  let html = header(), v = state.view;
  if (v==="pin") html += viewPin();
  else if (v==="gpin") html += viewGPin();
  else if (v==="who") html += viewWho();
  else html += viewHub();
  app.innerHTML = html;
  app.className = "wrap " + (state.user ? state.user.grade||"" : "");
  app.style.removeProperty("--fs");
  if (v==="hub") setTimeout(stkPop, 400);
}
async function pinSubmit(){
  state.pinBusy = true;
  try {
    const r = await api("/api/pin", {pin: state.pinIn});
    if (r.ok) { state.pinIn = ""; state.pinErr = ""; state.pinOk = true; state.pinBusy = false; state.usersLoaded = false; render(); await initApp(); return; }
    state.pinErr = r.status===429 ? "e2" : "e1";
  } catch(_){ state.pinErr = "e3"; }
  state.pinIn = ""; state.pinBusy = false; render();
}
async function loadUserData(){
  const u = state.user; if (!u) return;
  const q = encodeURIComponent(u.id);
  try { const r = await fetch("/api/articles", {cache:"no-store"}); if (r.ok) state.articles = await r.json(); else state.loadError = true; } catch(_) { state.loadError = true; }
  try { const r = await fetch("/api/state?uid="+q, {cache:"no-store"}); if (r.ok) { const j = await r.json(); state.sprout = j.sprout || {n:0,last:""}; state.math = j.math || {}; state.news = j.news || {}; state.chores = j.chores || {}; state.write = j.write || {}; state.stick = j.stick || null; state.chbank = j.chbank || {}; state.stickOk = true; state.stickUid = u.id; } } catch(_) {}
  try { const r = await fetch("/api/answers?uid="+q, {cache:"no-store"}); if (r.ok) { const m = {}; (await r.json()).forEach(x => m[x.qid] = x); state.answers = m; } } catch(_) {}
  try { stkCheck(); } catch(_) {}
}
async function loginAs(u){
  state.user = u; try { localStorage.setItem("kids.uid", u.id); } catch(_) {}
  state.sprout = {n:0,last:""}; state.stick = null; state.stickOk = false;
  state.view = "hub"; state.usersLoaded = false; render();
  await loadUserData(); state.usersLoaded = true; render(); window.scrollTo({top:0});
}
const DEEP = {read:"/read", vocab:"/vocab", math:"/math", news:"/news", chat:"/chat", write:"/write", stk:"/stk"};
async function initApp(){
  try { const r = await fetch("/api/users", {cache:"no-store"}); if (r.ok) { state.users = await r.json(); state.usersErr = false; } else state.usersErr = true; } catch(_) { state.usersErr = true; }
  let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch(_) {}
  state.user = state.users.find(u => u.id===uid) || null;
  if (state.user) { await loadUserData(); state.view = "hub"; } else state.view = "who";
  state.usersLoaded = true; render();
  try { const q = new URLSearchParams(location.search).get("s"); if (q && DEEP[q] && state.user) location.replace(DEEP[q]); } catch(_) {}
}
app.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act;
  if (act==="pkey") pinKey(b.dataset.v);
  else if (act==="gpk") gateKey(b.dataset.v);
  else if (act==="who") gateOpen("who");
  else if (act==="mascot") mascotTap();
  else if (act==="back") { state.gp = null; state.view = state.user ? "hub" : "who"; render(); }
  else if (act==="login") { const u = state.users.find(x => x.id===b.dataset.id); if (u) loginAs(u); }
  else if (act==="stkopen") location.href = "/stk";
});
holInit();
if ("serviceWorker" in navigator) window.addEventListener("load", () => { navigator.serviceWorker.register("/sw.js").catch(() => {}); });
(async () => { await checkPin(); if (!state.pinOk) { state.usersLoaded = true; state.view = "pin"; render(); return; } await initApp(); })();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + WD_JS + HOL_JS + STK_JS + STK_EXTRA_JS + HOME_JS + SHELL_B + "</script></body></html>";
