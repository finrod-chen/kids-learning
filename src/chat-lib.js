// 聊聊芽的程式與樣式，從首頁逐字切出，不要手改。（openChat、家長專區的最近提問不在這裡：前者在 chat-page.js，後者在家長專區。）
export const CHAT_JS = `const CHU = {"st":{"t":"聊聊芽","z":"ㄌㄧㄠˊ|ㄌㄧㄠˊ|ㄧㄚˊ"},"sub":{"t":"跟苗苗聊天，什麼都可以問","z":"ㄍㄣ|ㄇㄧㄠˊ|ㄇㄧㄠˊ|ㄌㄧㄠˊ|ㄊㄧㄢ||ㄕㄣˊ|ㄇㄜ˙|ㄉㄡ|ㄎㄜˇ|ㄧˇ|ㄨㄣˋ"},"hi":{"t":"嗨！我是苗苗，有什麼想問的嗎？","z":"ㄏㄞ||ㄨㄛˇ|ㄕˋ|ㄇㄧㄠˊ|ㄇㄧㄠˊ||ㄧㄡˇ|ㄕㄣˊ|ㄇㄜ˙|ㄒㄧㄤˇ|ㄨㄣˋ|ㄉㄜ˙|ㄇㄚ˙|"},"hint":{"t":"可以打字，也可以用鍵盤上的麥克風說話喔！","z":"ㄎㄜˇ|ㄧˇ|ㄉㄚˇ|ㄗˋ||ㄧㄝˇ|ㄎㄜˇ|ㄧˇ|ㄩㄥˋ|ㄐㄧㄢˋ|ㄆㄢˊ|ㄕㄤˋ|ㄉㄜ˙|ㄇㄞˋ|ㄎㄜˋ|ㄈㄥ|ㄕㄨㄛ|ㄏㄨㄚˋ|ㄛ|"},"think":{"t":"苗苗想一想","z":"ㄇㄧㄠˊ|ㄇㄧㄠˊ|ㄒㄧㄤˇ|ㄧ|ㄒㄧㄤˇ"},"left1":{"t":"今天還可以問","z":"ㄐㄧㄣ|ㄊㄧㄢ|ㄏㄞˊ|ㄎㄜˇ|ㄧˇ|ㄨㄣˋ"},"left2":{"t":"題","z":"ㄊㄧˊ"},"limit":{"t":"今天問好多題了，明天再來找苗苗聊天吧！","z":"ㄐㄧㄣ|ㄊㄧㄢ|ㄨㄣˋ|ㄏㄠˇ|ㄉㄨㄛ|ㄊㄧˊ|ㄌㄜ˙||ㄇㄧㄥˊ|ㄊㄧㄢ|ㄗㄞˋ|ㄌㄞˊ|ㄓㄠˇ|ㄇㄧㄠˊ|ㄇㄧㄠˊ|ㄌㄧㄠˊ|ㄊㄧㄢ|ㄅㄚ˙|"},"newt":{"t":"新話題","z":"ㄒㄧㄣ|ㄏㄨㄚˋ|ㄊㄧˊ"},"say":{"t":"唸給我聽","z":"ㄋㄧㄢˋ|ㄍㄟˇ|ㄨㄛˇ|ㄊㄧㄥ"},"rec":{"t":"錄音中，說完再按一次","z":"ㄌㄨˋ|ㄧㄣ|ㄓㄨㄥ||ㄕㄨㄛ|ㄨㄢˊ|ㄗㄞˋ|ㄢˋ|ㄧ|ㄘˋ"},"stt":{"t":"苗苗在聽","z":"ㄇㄧㄠˊ|ㄇㄧㄠˊ|ㄗㄞˋ|ㄊㄧㄥ"},"sttfail":{"t":"苗苗沒聽清楚，再說一次好嗎？","z":"ㄇㄧㄠˊ|ㄇㄧㄠˊ|ㄇㄟˊ|ㄊㄧㄥ|ㄑㄧㄥ|ㄔㄨˇ||ㄗㄞˋ|ㄕㄨㄛ|ㄧ|ㄘˋ|ㄏㄠˇ|ㄇㄚ˙|"},"fail":{"t":"苗苗連不上網路，等一下再試試看","z":"ㄇㄧㄠˊ|ㄇㄧㄠˊ|ㄌㄧㄢˊ|ㄅㄨˋ|ㄕㄤˋ|ㄨㄤˇ|ㄌㄨˋ||ㄉㄥˇ|ㄧ|ㄒㄧㄚˋ|ㄗㄞˋ|ㄕˋ|ㄕˋ|ㄎㄢˋ"},"ask":{"t":"送出","z":"ㄙㄨㄥˋ|ㄔㄨ"},"s1":{"t":"為什麼天空是藍色的？","z":"ㄨㄟˋ|ㄕㄣˊ|ㄇㄜ˙|ㄊㄧㄢ|ㄎㄨㄥ|ㄕˋ|ㄌㄢˊ|ㄙㄜˋ|ㄉㄜ˙|"},"s2":{"t":"恐龍為什麼會消失？","z":"ㄎㄨㄥˇ|ㄌㄨㄥˊ|ㄨㄟˋ|ㄕㄣˊ|ㄇㄜ˙|ㄏㄨㄟˋ|ㄒㄧㄠ|ㄕ|"},"s3":{"t":"今天天氣怎麼樣？","z":"ㄐㄧㄣ|ㄊㄧㄢ|ㄊㄧㄢ|ㄑㄧˋ|ㄗㄣˇ|ㄇㄜ˙|ㄧㄤˋ|"},"s4":{"t":"跟我說一個動物冷知識","z":"ㄍㄣ|ㄨㄛˇ|ㄕㄨㄛ|ㄧ|ㄍㄜˋ|ㄉㄨㄥˋ|ㄨˋ|ㄌㄥˇ|ㄓ|ㄕˊ"},"src":{"t":"苗苗查到的資料","z":"ㄇㄧㄠˊ|ㄇㄧㄠˊ|ㄔㄚˊ|ㄉㄠˋ|ㄉㄜ˙|ㄗ|ㄌㄧㄠˋ"},"auto":{"t":"自動唸","z":"ㄗˋ|ㄉㄨㄥˋ|ㄋㄧㄢˋ"},"div":{"t":"新的話題","z":"ㄒㄧㄣ|ㄉㄜ˙|ㄏㄨㄚˋ|ㄊㄧˊ"},"mic":{"t":"說話","z":"ㄕㄨㄛ|ㄏㄨㄚˋ"},"ph":{"t":"在這裡打字問苗苗","z":"ㄗㄞˋ|ㄓㄜˋ|ㄌㄧˇ|ㄉㄚˇ|ㄗˋ|ㄨㄣˋ|ㄇㄧㄠˊ|ㄇㄧㄠˊ"},"micno":{"t":"請大人幫忙打開麥克風權限","z":"ㄑㄧㄥˇ|ㄉㄚˋ|ㄖㄣˊ|ㄅㄤ|ㄇㄤˊ|ㄉㄚˇ|ㄎㄞ|ㄇㄞˋ|ㄎㄜˋ|ㄈㄥ|ㄑㄩㄢˊ|ㄒㄧㄢˋ"},"pt":{"t":"聊聊芽・最近問了什麼","z":"ㄌㄧㄠˊ|ㄌㄧㄠˊ|ㄧㄚˊ||ㄗㄨㄟˋ|ㄐㄧㄣˋ|ㄨㄣˋ|ㄌㄜ˙|ㄕㄣˊ|ㄇㄜ˙"}};
const CH_LOGO = "/img/liaoliaoya-512.webp";
const CH_MIC = false;
function chZ(o){ return zy({ t:o.t, z:o.z }); }
function chAutoGet(){ try { return localStorage.getItem("ch.auto") !== "0"; } catch(_) { return true; } }
function chAutoSet(v){ try { localStorage.setItem("ch.auto", v ? "1" : "0"); } catch(_) {} }
function chPlain(t){ return String(t||"").replace(/\\p{Extended_Pictographic}|️/gu, "").trim(); }
let chUnlocked = false;
function chUnlock(){
  if (chUnlocked || !synth) return; chUnlocked = true;
  try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; synth.speak(u); } catch(_) {}
}
function chMark(id){
  app.querySelectorAll(".lq-chb.speaking").forEach(el=>el.classList.remove("speaking"));
  if (id!=null) { const el = app.querySelector(\`.lq-chb[data-bid="\${id}"]\`); if (el) el.classList.add("speaking"); }
}
function chSpeak(m){
  if (!synth || !m) return;
  const t = chPlain(m.t); if (!t) return;
  speakList([t], i=>chMark(i>=0 ? m.id : null), ()=>chMark(null));
}
function chBubble(m){
  if (m.role==="div") return \`<div class="lq-chdiv"><span>\${chZ(CHU.div)}</span></div>\`;
  const body = \`<div class="zt">\${zy({ t:m.t, z:m.z||"" })}</div>\`;
  if (m.role==="user") return \`<div class="lq-chrow me"><div class="lq-chb me">\${body}</div></div>\`;
  const src = (m.src && m.src.length) ? \`<details class="lq-chsrc"><summary>\${chZ(CHU.src)}</summary>\${m.src.map(s=>\`<a href="\${esc(s.url)}" target="_blank" rel="noopener noreferrer">\${esc(s.title||s.url)}</a>\`).join("")}</details>\` : "";
  const say = synth ? \`<div class="lq-chtools"><button class="lq-chsay" data-act="chsay" data-id="\${m.id}"><span aria-hidden="true">🔊</span>\${chZ(CHU.say)}</button></div>\` : "";
  return \`<div class="lq-chrow bot"><img class="lq-chava" src="\${CH_LOGO}" alt="" width="44" height="44"><div class="lq-chb bot" data-bid="\${m.id}">\${body}\${say}\${src}</div></div>\`;
}
function viewChat(){
  const c = state.cc || {};
  const list = c.list || [];
  let lastDiv = -1; list.forEach((m,i)=>{ if (m.role==="div") lastDiv = i; });
  const fresh = list.slice(lastDiv+1).filter(m=>m.role!=="div").length===0;
  const head = \`<section class="lq-chhead"><img class="lq-chav" src="\${CH_LOGO}" alt="" width="72" height="72"><div class="lq-chhi"><div>\${state.user ? esc(state.user.nick)+"，" : ""}\${chZ(CHU.hi)}</div><div class="lq-chhint">\${chZ(CHU.hint)}</div></div></section>\`;
  const msgs = \`<div class="lq-chlist">\${list.map(chBubble).join("")}\${c.busy ? \`<div class="lq-chrow bot"><img class="lq-chava" src="\${CH_LOGO}" alt="" width="44" height="44"><div class="lq-chb bot lq-think"><span class="lq-dots" aria-hidden="true"><i></i><i></i><i></i></span>\${chZ(CHU.think)}</div></div>\` : ""}</div>\`;
  const sugg = (fresh && !c.busy && c.loaded) ? \`<div class="lq-chsug">\${["s1","s2","s3","s4"].map(k=>\`<button class="chip" data-act="chsug" data-k="\${k}">\${chZ(CHU[k])}</button>\`).join("")}</div>\` : "";
  const errK = c.err==="fail" ? "fail" : c.err==="stt" ? "sttfail" : c.err==="mic" ? "micno" : "";
  const err = errK ? \`<div class="note lq-chnote">\${chZ(CHU[errK])}</div>\` : "";
  const loading = !c.loaded ? \`<div class="note">載入中…</div>\` : "";
  let bar;
  if (c.left===0) bar = \`<div class="lq-chbar"><div class="note lq-chnote">\${chZ(CHU.limit)}</div></div>\`;
  else {
    const status = c.rec ? \`<div class="lq-chrec"><span class="lq-recdot" aria-hidden="true"></span>\${chZ(CHU.rec)}<b>\${c.recSec||0}</b></div>\` : c.stt ? \`<div class="lq-chrec"><span class="lq-dots" aria-hidden="true"><i></i><i></i><i></i></span>\${chZ(CHU.stt)}</div>\` : "";
    bar = \`<div class="lq-chbar">\${status}<div class="lq-chin"><textarea id="chq" rows="2" maxlength="200" enterkeyhint="send" placeholder="\${esc(CHU.ph.t)}" aria-label="\${esc(CHU.ph.t)}"\${c.busy||c.rec||c.stt?" disabled":""}></textarea>\${CH_MIC ? \`<button class="lq-chmic\${c.rec?" on":""}" data-act="chmic" aria-label="\${esc(CHU.mic.t)}"\${c.busy||c.stt?" disabled":""}><span aria-hidden="true">\${c.rec?"⏹️":"🎤"}</span></button>\` : ""}<button class="btn primary lq-chsend" data-act="chsend"\${c.busy||c.rec||c.stt?" disabled":""}>\${chZ(CHU.ask)}</button></div><div class="lq-chopts"><button class="chip" data-act="chnew">＋ \${chZ(CHU.newt)}</button>\${c.left!=null ? \`<span class="lq-chleft">\${chZ(CHU.left1)} <b>\${c.left}</b> \${chZ(CHU.left2)}</span>\` : ""}\${synth ? \`<label class="lq-chauto"><input type="checkbox" id="chauto"\${c.auto?" checked":""}>\${chZ(CHU.auto)}</label>\` : ""}</div></div>\`;
  }
  return head + loading + msgs + sugg + err + bar;
}
async function chSend(qOverride){
  const c = state.cc; if (!c || c.busy) return;
  const q = String(qOverride!=null ? qOverride : c.input).replace(/\\s+/g," ").trim().slice(0,200);
  if (!q) return;
  chUnlock(); stopSpeak();
  c.busy = true; c.err = ""; if (qOverride==null) c.input = "";
  c.list.push({ id:"tmp", role:"user", t:q, z:"" });
  render(); chScroll();
  let ok = false;
  try {
    const r = await api("/api/chat", { uid: state.user.id, q });
    const j = await r.json().catch(()=>({}));
    c.list = c.list.filter(m=>m.id!=="tmp");
    if (r.ok && j.bot) { c.list.push(j.user, j.bot); c.left = j.left; ok = true; if (c.auto) setTimeout(()=>chSpeak(j.bot), 60); }
    else if (j.error==="limit") { c.left = 0; }
    else { c.err = "fail"; c.input = q; }
  } catch(_) { c.list = c.list.filter(m=>m.id!=="tmp"); c.err = "fail"; c.input = q; }
  c.busy = false;
  if (state.view==="chat") { render(); chScroll(); }
  return ok;
}
function chBlobB64(blob){
  return new Promise((res, rej)=>{ const fr = new FileReader(); fr.onload = ()=>res(String(fr.result).split(",")[1]||""); fr.onerror = rej; fr.readAsDataURL(blob); });
}
function chStopRec(){ const c = state.cc; if (c && c.rec) { try { c.rec.stop(); } catch(_) {} } }
async function chMic(){
  const c = state.cc; if (!c || c.busy || c.stt) return;
  if (c.rec) { chStopRec(); return; }
  chUnlock(); stopSpeak(); c.err = "";
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio:true }); }
  catch(_) { c.err = "mic"; render(); return; }
  const types = ["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg"];
  const mime = (MediaRecorder.isTypeSupported ? types.find(t=>MediaRecorder.isTypeSupported(t)) : "") || "";
  let rec;
  try { rec = mime ? new MediaRecorder(stream, { mimeType:mime }) : new MediaRecorder(stream); }
  catch(_) { stream.getTracks().forEach(t=>t.stop()); c.err = "mic"; render(); return; }
  const chunks = [];
  rec.ondataavailable = e=>{ if (e.data && e.data.size) chunks.push(e.data); };
  rec.onstop = async ()=>{
    stream.getTracks().forEach(t=>t.stop()); clearInterval(c.recT);
    const sec = c.recSec; c.rec = null;
    const type = (rec.mimeType || mime || "audio/mp4").split(";")[0];
    const blob = new Blob(chunks, { type });
    if (state.view!=="chat") return;
    if (sec < 1 || blob.size < 800) { render(); return; }
    c.stt = true; render(); chScroll();
    try {
      const b64 = await chBlobB64(blob);
      const r = await api("/api/stt", { uid: state.user.id, audio: b64, mime: type });
      const j = await r.json().catch(()=>({}));
      c.stt = false;
      if (r.ok && j.text) { chSend(j.text); return; }
      c.err = "stt";
    } catch(_) { c.stt = false; c.err = "stt"; }
    if (state.view==="chat") render();
  };
  c.rec = rec; c.recSec = 0;
  rec.start();
  c.recT = setInterval(()=>{ c.recSec++; if (c.recSec >= 15) chStopRec(); else { const el = app.querySelector(".lq-chrec b"); if (el) el.textContent = c.recSec; } }, 1000);
  render(); chScroll();
}
function chScroll(){ requestAnimationFrame(()=>{ try { window.scrollTo({ top: document.documentElement.scrollHeight }); } catch(_) {} }); }
function chBind(){
  const c = state.cc; if (!c) return;
  const ta = document.getElementById("chq");
  if (ta) {
    ta.value = c.input || "";
    ta.addEventListener("input", ()=>{ c.input = ta.value; });
    ta.addEventListener("keydown", e=>{ if (e.key==="Enter" && !e.shiftKey && !e.isComposing && e.keyCode!==229) { e.preventDefault(); c.input = ta.value; chSend(); } });
  }
  const au = document.getElementById("chauto");
  if (au) au.addEventListener("change", ()=>{ c.auto = au.checked; chAutoSet(au.checked); if (!au.checked) stopSpeak(); });
}
`;
export const CHAT_CSS = `/* ===== 聊聊芽 ===== */
.s-chat{--acc:#1F8A8A;--acc-soft:#D8F0EE}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .s-chat{--acc:#6FD3CC;--acc-soft:#1E3836}}
:root[data-theme="dark"] .s-chat{--acc:#6FD3CC;--acc-soft:#1E3836}
@media (min-width:560px){.station.s-chat{grid-column:1/-1;display:grid;grid-template-columns:auto 1fr;grid-template-areas:"logo big" "logo sub";column-gap:26px;row-gap:4px;align-items:center;min-height:0;padding:22px 28px}.station.s-chat .slogo{grid-area:logo}.station.s-chat .big{grid-area:big;align-self:end}.station.s-chat .sub{grid-area:sub;align-self:start}}
.lq-chhead{display:flex;gap:14px;align-items:center;background:var(--card);border:2px solid var(--acc-soft);border-radius:24px;padding:14px 18px;min-width:0}
.lq-chav{width:72px;height:72px;flex:none}
.lq-chhi{font-size:26px;min-width:0;flex:1}
.lq-chhint{font-size:18px;color:var(--muted);margin-top:6px}
.lq-chlist{display:flex;flex-direction:column;gap:14px;min-width:0}
.lq-chrow{display:flex;gap:10px;align-items:flex-end;min-width:0;max-width:100%}
.lq-chrow.me{justify-content:flex-end}
.lq-chava{width:44px;height:44px;flex:none}
.lq-chb{max-width:min(84%,660px);min-width:0;box-sizing:border-box;border-radius:22px;padding:12px 16px;overflow-wrap:anywhere;word-break:break-word}
.lq-chb .zt{display:block}
.lq-chb.me{background:var(--acc);color:#fff;border-bottom-right-radius:6px;font-size:24px}
.lq-chb.me .h,.lq-chb.me .b,.lq-chb.me .pu{color:inherit}
.lq-chb.bot{background:var(--card);border:2px solid var(--acc-soft);border-bottom-left-radius:6px;font-size:28px;transition:border-color .2s,box-shadow .2s}
.wrap.g1 .lq-chb.bot{font-size:32px}
.lq-chb.speaking{border-color:var(--acc);box-shadow:0 0 0 4px var(--acc-soft)}
.lq-chb.lq-think{display:flex;align-items:center;gap:10px;font-size:22px;color:var(--muted)}
.lq-chtools{margin-top:8px}
.lq-chsay{display:inline-flex;align-items:center;gap:6px;font-size:18px;padding:6px 14px;border-radius:999px;background:var(--acc-soft);color:var(--acc);min-height:44px}
.lq-chsrc{margin-top:8px;font-size:15px;color:var(--muted);font-family:var(--ui)}
.lq-chsrc summary{cursor:pointer;font-size:16px}
.lq-chsrc a{display:block;margin-top:6px;color:var(--muted);overflow-wrap:anywhere;text-decoration:underline}
.lq-chdiv{display:flex;align-items:center;gap:10px;color:var(--muted);font-size:18px}
.lq-chdiv:before,.lq-chdiv:after{content:"";flex:1;border-top:2px dashed var(--line)}
.lq-chsug{display:flex;flex-wrap:wrap;gap:10px}
.lq-chsug .chip{font-size:20px;max-width:100%;text-align:left}
.lq-chnote{font-size:20px}
.lq-chbar{position:-webkit-sticky;position:sticky;bottom:0;z-index:5;background:var(--paper);padding:12px 0 calc(10px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:10px;border-top:2px dashed var(--line);min-width:0}
.lq-chin{display:flex;gap:10px;align-items:stretch;min-width:0}
.lq-chin textarea{flex:1;min-width:0;box-sizing:border-box;font:inherit;font-size:22px;line-height:1.4;padding:12px 14px;border-radius:18px;border:2px solid var(--line);background:var(--card);color:var(--ink);resize:none;-webkit-appearance:none;appearance:none}
.lq-chin textarea:focus{outline:none;border-color:var(--acc)}
.lq-chin textarea:disabled{opacity:.6}
.lq-chmic{flex:none;width:66px;border-radius:18px;background:var(--card);border:2px solid var(--acc);font-size:30px;-webkit-appearance:none;appearance:none}
.lq-chmic.on{background:var(--red);border-color:var(--red);animation:chpulse 1s ease-in-out infinite}
.lq-chmic:disabled,.lq-chsend:disabled{opacity:.45}
.lq-chsend{flex:none;min-width:92px;font-size:22px;padding:10px 14px}
.lq-chopts{display:flex;align-items:center;gap:10px 14px;flex-wrap:wrap}
.lq-chopts .chip{font-size:18px;min-height:44px}
.lq-chleft{font-size:17px;color:var(--muted)}
.lq-chleft b{color:var(--acc);font-size:20px}
.lq-chauto{display:inline-flex;align-items:center;gap:6px;font-size:18px;margin-left:auto}
.lq-chauto input{width:24px;height:24px;accent-color:var(--acc)}
.lq-chrec{display:flex;align-items:center;gap:10px;font-size:20px;color:var(--red);font-weight:700}
.lq-chrec b{font-family:var(--ui);min-width:1.5em}
.lq-recdot{width:14px;height:14px;border-radius:50%;background:var(--red);animation:chpulse 1s ease-in-out infinite}
.lq-dots{display:inline-flex;gap:5px}
.lq-dots i{display:block;width:10px;height:10px;border-radius:50%;background:var(--acc);animation:chdot 1.1s ease-in-out infinite}
.lq-dots i:nth-child(2){animation-delay:.15s}.lq-dots i:nth-child(3){animation-delay:.3s}
@keyframes chdot{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-5px)}}
@keyframes chpulse{50%{transform:scale(1.08)}}
@media (prefers-reduced-motion:reduce){.lq-dots i,.lq-chmic.on,.lq-recdot{animation:none}}
@media (max-width:600px){
  .lq-chav{width:56px;height:56px}.lq-chhi{font-size:21px}.lq-chhint{font-size:16px}
  .lq-chb.bot{font-size:23px}.wrap.g1 .lq-chb.bot{font-size:25px}.lq-chb.me{font-size:20px}
  .lq-chava{width:36px;height:36px}
  .lq-chin textarea{font-size:19px}
  .lq-chmic{width:54px;font-size:26px}.lq-chsend{min-width:70px;font-size:19px}
  .lq-chsug .chip{font-size:17px}
}
@media (max-width:600px){.lq-chbar{gap:8px;padding-top:10px}.lq-chin textarea{height:58px;padding:10px 12px}.lq-chopts{flex-wrap:wrap;gap:6px 8px}.lq-chleft{order:3;flex-basis:100%}.lq-chopts .chip{font-size:15px;padding:6px 10px;min-height:38px;white-space:nowrap}.lq-chleft{font-size:13px;white-space:nowrap}.lq-chleft b{font-size:16px}.lq-chauto{font-size:14px;white-space:nowrap}.lq-chauto input{width:20px;height:20px}}
.lq-chav,.lq-chava{border-radius:22%}.lq-chava{border-radius:28%}
/* 家長專區：聊聊芽 */
.lq-pchat img.pse{width:40px;height:40px}
.lq-pchl{display:flex;flex-direction:column;gap:6px;margin-top:6px;max-height:420px;overflow:auto;-webkit-overflow-scrolling:touch}
.lq-pchq{border:1.5px solid var(--line);border-radius:12px;padding:6px 10px;background:var(--card)}
.lq-pchq summary{cursor:pointer;font-size:16px;overflow-wrap:anywhere}
.lq-pchd{color:var(--muted);font-family:var(--ui);font-size:13px;margin-right:6px}
.lq-pcha{font-size:15px;color:var(--ink);margin-top:6px;white-space:pre-wrap;overflow-wrap:anywhere}
.lq-pchs{font-size:13px;color:var(--muted);margin-top:4px}

`;
