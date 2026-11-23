// 新首頁用的程式（PIN 畫面、家長閘、小芽卡片），從舊首頁逐字切出，不要手改。
export const HOME_JS = `const BUI = {
  st:{t:"芽書櫃",z:["ㄧㄚˊ","ㄕㄨ","ㄍㄨㄟˋ"]},
  sub:{t:"登記看過的書，寫心得",z:["ㄉㄥ","ㄐㄧˋ","ㄎㄢˋ","ㄍㄨㄛˋ","ㄉㄜ˙","ㄕㄨ","","ㄒㄧㄝˇ","ㄒㄧㄣ","ㄉㄜˊ"]},
  title:{t:"我的書櫃",z:["ㄨㄛˇ","ㄉㄜ˙","ㄕㄨ","ㄍㄨㄟˋ"]},
  read1:{t:"已經看了",z:["ㄧˇ","ㄐㄧㄥ","ㄎㄢˋ","ㄌㄜ˙"]},
  read2:{t:"本書",z:["ㄅㄣˇ","ㄕㄨ"]},
  add:{t:"登記新書",z:["ㄉㄥ","ㄐㄧˋ","ㄒㄧㄣ","ㄕㄨ"]},
  fTitle:{t:"書名",z:["ㄕㄨ","ㄇㄧㄥˊ"]},
  fDate:{t:"看完的日期",z:["ㄎㄢˋ","ㄨㄢˊ","ㄉㄜ˙","ㄖˋ","ㄑㄧˊ"]},
  fNote:{t:"我的心得",z:["ㄨㄛˇ","ㄉㄜ˙","ㄒㄧㄣ","ㄉㄜˊ"]},
  fHint:{t:"寫一兩句話就好，也可以不寫",z:["ㄒㄧㄝˇ","ㄧ","ㄌㄧㄤˇ","ㄐㄩˋ","ㄏㄨㄚˋ","ㄐㄧㄡˋ","ㄏㄠˇ","","ㄧㄝˇ","ㄎㄜˇ","ㄧˇ","ㄅㄨˋ","ㄒㄧㄝˇ"]},
  save:{t:"存起來",z:["ㄘㄨㄣˊ","ㄑㄧˇ","ㄌㄞˊ"]},
  edit:{t:"修改",z:["ㄒㄧㄡ","ㄍㄞˇ"]},
  del:{t:"刪除",z:["ㄕㄢ","ㄔㄨˊ"]},
  empty:{t:"書櫃還是空的，來登記第一本書吧！",z:["ㄕㄨ","ㄍㄨㄟˋ","ㄏㄞˊ","ㄕˋ","ㄎㄨㄥ","ㄉㄜ˙","","ㄌㄞˊ","ㄉㄥ","ㄐㄧˋ","ㄉㄧˋ","ㄧ","ㄅㄣˇ","ㄕㄨ","ㄅㄚ˙",""]}
};
const CUI = {
  st:{t:"家事芽",z:["ㄐㄧㄚ","ㄕˋ","ㄧㄚˊ"]},
  sub:{t:"記錄今天幫忙做的家事",z:["ㄐㄧˋ","ㄌㄨˋ","ㄐㄧㄣ","ㄊㄧㄢ","ㄅㄤ","ㄇㄤˊ","ㄗㄨㄛˋ","ㄉㄜ˙","ㄐㄧㄚ","ㄕˋ"]},
  q:{t:"今天做了哪些家事？",z:["ㄐㄧㄣ","ㄊㄧㄢ","ㄗㄨㄛˋ","ㄌㄜ˙","ㄋㄚˇ","ㄒㄧㄝ","ㄐㄧㄚ","ㄕˋ",""]},
  week:{t:"這個星期",z:["ㄓㄜˋ","ㄍㄜˋ","ㄒㄧㄥ","ㄑㄧ"]},
  all:{t:"今天的家事都做完了，你好棒！",z:["ㄐㄧㄣ","ㄊㄧㄢ","ㄉㄜ˙","ㄐㄧㄚ","ㄕˋ","ㄉㄡ","ㄗㄨㄛˋ","ㄨㄢˊ","ㄌㄜ˙","","ㄋㄧˇ","ㄏㄠˇ","ㄅㄤˋ",""]},
  empty:{t:"還沒有家事，請爸爸媽媽新增",z:["ㄏㄞˊ","ㄇㄟˊ","ㄧㄡˇ","ㄐㄧㄚ","ㄕˋ","","ㄑㄧㄥˇ","ㄅㄚˋ","ㄅㄚ˙","ㄇㄚ","ㄇㄚ˙","ㄒㄧㄣ","ㄗㄥ"]}
};
const GQ = {t:"請爸爸媽媽輸入密碼", z:["ㄑㄧㄥˇ","ㄅㄚˋ","ㄅㄚ˙","ㄇㄚ","ㄇㄚ˙","ㄕㄨ","ㄖㄨˋ","ㄇㄧˋ","ㄇㄚˇ"]};
function gateKey(v){
  const p=state.gp; if(!p||p.busy) return;
  if(v==="C") p.d=""; else if(v==="B") p.d=p.d.slice(0,-1); else if(/^[0-9]$/.test(v)&&p.d.length<6) p.d+=v;
  p.err=""; render();
  if(p.d.length===6) gateGo();
}
async function gateGo(){
  const p=state.gp; if(!p) return; p.busy=true;
  try{ const r=await api("/api/parent",{pin:p.d}); if(r.ok){ const k=p.kind; state.gp=null; gateDone(k); return; } p.err=r.status===429?"lock":"bad"; }catch(_){ p.err="net"; }
  p.d=""; p.busy=false; render();
}
function viewGPin(){
  const p=state.gp;
  if(!p) return \`<div class="note">請按左上角回去</div>\`;
  const d=p.d||"";
  const sub={parent:"🔒 家長專區",who:"🔒 切換小朋友"}[p.kind]||"";
  const msg={bad:"密碼不對，請再試一次",lock:"輸錯太多次了，請 5 分鐘後再試",net:"連不上網路，請再試一次"};
  const keys=["1","2","3","4","5","6","7","8","9","C","0","B"].map(k=>\`<button class="pk" data-act="gpk" data-v="\${k}" aria-label="\${k==="C"?"清除":k==="B"?"倒退":k}">\${k==="B"?"⌫":k==="C"?"清除":k}</button>\`).join("");
  return \`<div class="chnote" style="text-align:center">\${sub}</div><div class="hello hq">\${zy(GQ)}</div><div class="pdots" aria-hidden="true">\${Array.from({length:6},(_,i)=>\`<span class="pdot\${i<d.length?" on":""}"></span>\`).join("")}</div>\${p.err?\`<div class="note pinerr">\${msg[p.err]}</div>\`:""}<div class="pinpad">\${keys}</div>\`;
}
const WHO = {"who":{"t":"你是誰？","z":["ㄋㄧˇ","ㄕˋ","ㄕㄟˊ",""]},"add":{"t":"新增小朋友","z":["ㄒㄧㄣ","ㄗㄥ","ㄒㄧㄠˇ","ㄆㄥˊ","ㄧㄡˇ"]},"swap":{"t":"換人","z":["ㄏㄨㄢˋ","ㄖㄣˊ"]},"nickq":{"t":"取一個暱稱","z":["ㄑㄩˇ","ㄧ","ㄍㄜˋ","ㄋㄧˋ","ㄔㄥ"]},"done":{"t":"完成","z":["ㄨㄢˊ","ㄔㄥˊ"]},"cancel":{"t":"取消","z":["ㄑㄩˇ","ㄒㄧㄠ"]}};
function spStage(n){ const c=n%21; return c===0?0 : c<3?1 : c<6?2 : c<10?3 : c<14?4 : c<18?5 : 6; }
function spSVG(st){
  const leaf=(x,y,r,z)=>\`<ellipse cx="\${x}" cy="\${y}" rx="\${z}" ry="\${z*0.5}" transform="rotate(\${r} \${x} \${y})" fill="#58B368"/>\`;
  const pair=(y,z)=>leaf(60-z*0.9,y,-28,z)+leaf(60+z*0.9,y,28,z);
  const top=[0,80,62,46,40,36,40][st];
  let g="";
  if (st===0) g=\`<ellipse cx="60" cy="96" rx="6" ry="4" fill="#8B5A2B"/>\`;
  else {
    g=\`<path d="M60 96 L60 \${top}" stroke="#3F9456" stroke-width="4" stroke-linecap="round" fill="none"/>\`;
    if (st===1) g+=pair(top+2,9);
    if (st>=2) g+=pair(82,11)+pair(top+4,st===2?10:12);
    if (st>=3) g+=pair(66,12);
    if (st===4) g+=\`<circle cx="60" cy="\${top-4}" r="7" fill="#F4A6C0"/><path d="M54 \${top} Q60 \${top+5} 66 \${top}" stroke="#58B368" stroke-width="3" fill="none"/>\`;
    if (st===5) { for (let i=0;i<5;i++){ const a=i*72*Math.PI/180; g+=\`<circle cx="\${60+Math.sin(a)*10}" cy="\${top-4-Math.cos(a)*10}" r="7" fill="#FF8FB1"/>\`; } g+=\`<circle cx="60" cy="\${top-4}" r="6" fill="#F7C948"/>\`; }
    if (st===6) g+=\`<path d="M60 \${top} L44 58 M60 \${top+8} L76 66" stroke="#3F9456" stroke-width="3" fill="none"/><circle cx="44" cy="68" r="10" fill="#E5484D"/><circle cx="76" cy="76" r="10" fill="#E5484D"/><circle cx="41" cy="64" r="2.5" fill="#fff" opacity=".6"/><circle cx="73" cy="72" r="2.5" fill="#fff" opacity=".6"/>\`;
  }
  return \`<svg viewBox="0 18 120 112" role="img" aria-hidden="true">\${g}<rect x="30" y="94" width="60" height="12" rx="5" fill="#B87444"/><path d="M36 106 H84 L78 126 H42 Z" fill="#C98B5B"/></svg>\`;
}
function spCard(g){
  const e = state.sprout || {n:0,last:""}, n = e.n||0, st = spStage(n), fr = Math.floor(n/21), wet = e.last===mathDate();
  const cnt = {t:\`已澆水\${n}天\`, z:[...SP.pre.z, ...[...String(n)].map(()=>""), ...SP.day.z]};
  return \`<div class="sp g3">\${spSVG(st)}<div class="spt"><div class="spn">\${zy(SP["s"+st])}</div><div class="spbar"><i style="width:\${Math.round(n%21/21*100)}%"></i></div><div class="spc">\${zy(cnt)}</div><div class="spw\${wet?" on":""}">\${zy(wet?SP.wet:SP.dry)}</div>\${fr?\`<div class="spf">\${"🍎".repeat(Math.min(fr,5))}\${fr>5?"×"+fr:""}</div>\`:""}</div></div>\`;
}
function viewSprouts(){
  return \`<section class="sprouts"><div class="sph">🌱 \${zy(SP.title)}</div><div class="sprow">\${spCard("all")}</div></section>\`;
}
const PIN = {"q":{"t":"請輸入密碼","z":["ㄑㄧㄥˇ","ㄕㄨ","ㄖㄨˋ","ㄇㄧˋ","ㄇㄚˇ"]},"e1":{"t":"密碼不對，再試一次","z":["ㄇㄧˋ","ㄇㄚˇ","ㄅㄨˋ","ㄉㄨㄟˋ","","ㄗㄞˋ","ㄕˋ","ㄧ","ㄘˋ"]},"e2":{"t":"試太多次了，請等幾分鐘再試","z":["ㄕˋ","ㄊㄞˋ","ㄉㄨㄛ","ㄘˋ","ㄌㄜ˙","","ㄑㄧㄥˇ","ㄉㄥˇ","ㄐㄧˇ","ㄈㄣ","ㄓㄨㄥ","ㄗㄞˋ","ㄕˋ"]},"e3":{"t":"連不上網路","z":["ㄌㄧㄢˊ","ㄅㄨˋ","ㄕㄤˋ","ㄨㄤˇ","ㄌㄨˋ"]}};
async function checkPin(){
  try { const r = await fetch("/api/pin",{cache:"no-store"}); if (r.ok) { const j = await r.json(); state.pinOk = !j.set || j.ok; } else state.pinOk = false; }
  catch(_){ state.pinOk = false; state.pinErr = "e3"; }
}
function pinKey(v){
  if (state.pinBusy) return;
  let d = state.pinIn || "";
  if (v==="C") d = ""; else if (v==="B") d = d.slice(0,-1); else if (/^[0-9]$/.test(v) && d.length<6) d += v;
  state.pinIn = d; state.pinErr = ""; render();
  if (d.length===6) pinSubmit();
}
function viewPin(){
  const d = state.pinIn || "";
  const keys = ["1","2","3","4","5","6","7","8","9","C","0","B"].map(k=>\`<button class="pk" data-act="pkey" data-v="\${k}" aria-label="\${k==="C"?"清除":k==="B"?"倒退":k}">\${k==="B"?"⌫":k==="C"?"清除":k}</button>\`).join("");
  return \`<div class="hello hq">\${zy(PIN.q)}</div><div class="pdots" aria-hidden="true">\${Array.from({length:6},(_,i)=>\`<span class="pdot\${i<d.length?" on":""}"></span>\`).join("")}</div>\${state.pinErr?\`<div class="note pinerr">\${zy(PIN[state.pinErr])}</div>\`:""}<div class="pinpad">\${keys}</div>\`;
}
`;
