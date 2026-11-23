// 新首頁（精簡入口）：站內密碼、選小朋友、小芽、貼貼芽卡片與彈窗、各站連結、家長專區入口。
// 各站都已經有自己的網址，這裡只負責「進門」。PIN 畫面、家長閘、小芽卡片（home-lib.js）、
// 貼貼芽（stk-lib.js）、節日主題（hol-lib.js）的程式逐字切自舊首頁；這裡只有外殼。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { HOL_JS } from "./hol-lib.js";
import { STK_JS, STK_CSS } from "./stk-lib.js";
import { HOME_JS } from "./home-lib.js";
import { LIFE_DATA } from "./life-data.js";

const head = spaHead({ title: "芽芽學堂", icon: "/img/main-32.png" }) + STK_CSS;

const SHELL_A = `
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
  return '<div class="top"><div class="brand"><img class="blogo" src="/img/main.webp" alt="" width="44" height="44"><span>芽芽學堂</span></div>' + back + '</div>' + holGarland();
}
const PARENT_LINK = '<div class="foot"><a class="plink" href="/parent">家長專區</a></div>';
function viewWho(){
  const us = state.users;
  if (state.usersErr && !us.length) return '<div class="note">連不上網路，請檢查 Wi‑Fi 後重新整理。</div>';
  if (!us.length) return '<div class="hello hq">' + zy(WHO.add) + '</div><div class="note">還沒有小朋友，請爸爸媽媽到家長專區新增。</div>' + PARENT_LINK;
  return '<div class="hello hq">' + zy(WHO.who) + '</div><div class="whol">' + us.map(u => '<button class="grade '+u.grade+' whou" data-act="login" data-id="'+esc(u.id)+'"><span class="big">'+esc(u.nick)+'</span><span class="sub">'+U(u.grade)+'</span></button>').join("") + '</div>' + PARENT_LINK;
}
function viewHub(){
  const note = state.loadError ? '<div class="note">連不上網路，請檢查 Wi‑Fi 後重新整理。</div>' : "";
  let logo = '<img class="hlogo" src="/img/main.webp" alt="" width="132" height="132">';
  if (HOL) logo = '<span class="hlwrap">' + logo + '<span class="hbadge" aria-hidden="true">' + [...HOL.garland.replace(/\\uFE0F/g,"")][0] + '</span></span>';
  return '<div class="hero">' + logo + '<div class="hname">' + U("siteName") + '</div></div>'
    + '<button class="whochip" data-act="who"><span class="wav" aria-hidden="true">' + esc([...state.user.nick][0]||"") + '</span><span class="wnick">' + esc(state.user.nick) + '</span><span class="wsw">' + zy(WHO.swap) + '</span></button>'
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
  else if (act==="back") { state.gp = null; state.view = state.user ? "hub" : "who"; render(); }
  else if (act==="login") { const u = state.users.find(x => x.id===b.dataset.id); if (u) loginAs(u); }
  else if (act==="stkopen") location.href = "/stk";
});
holInit();
if ("serviceWorker" in navigator) window.addEventListener("load", () => { navigator.serviceWorker.register("/sw.js").catch(() => {}); });
(async () => { await checkPin(); if (!state.pinOk) { state.usersLoaded = true; state.view = "pin"; render(); return; } await initApp(); })();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SHELL_A + SPA_LIB_JS + WD_JS + HOL_JS + STK_JS + HOME_JS + SHELL_B + "</script></body></html>";
