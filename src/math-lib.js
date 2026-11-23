// 算算芽的程式（出題、直式輸入、九九乘法表、記錄），從首頁逐字切出（只拿掉底部的「家長專區」按鈕，統一從側邊選單進），不要手改。
export const MATH_JS = `const MATH_CFG = {
  n: 6,                              // 每天題數
  g1: { add:[1,9], sub:[1,9] },      // 一年級：個位數加減（加數 1~9；被減數 2~9，減數不大於被減數）
  g3: { a:[12,99], b:[2,9], skipTens:true } // 三年級：兩位數 × 一位數（不出整十的數）
};
function mathQs(g, date){
  const r=mrng(mseed(date+g)), ri=(lo,hi)=>lo+Math.floor(r()*(hi-lo+1)), qs=[], seen=new Set();
  let guard=0;
  while (qs.length<MATH_CFG.n && guard++<800){
    let q;
    if (g==="g1"){
      if (qs.length%2===0){ const a=ri(MATH_CFG.g1.add[0],MATH_CFG.g1.add[1]), b=ri(MATH_CFG.g1.add[0],MATH_CFG.g1.add[1]); q={t:"+",a,b,ans:a+b}; }
      else { const a=ri(Math.max(2,MATH_CFG.g1.sub[0]),MATH_CFG.g1.sub[1]), b=ri(1,a); q={t:"−",a,b,ans:a-b}; }
    } else {
      const a=ri(MATH_CFG.g3.a[0],MATH_CFG.g3.a[1]); if (MATH_CFG.g3.skipTens && a%10===0) continue;
      const b=ri(MATH_CFG.g3.b[0],MATH_CFG.g3.b[1]); q={t:"×",a,b,ans:a*b};
    }
    const k=q.t+q.a+"_"+q.b; if (seen.has(k)) continue; seen.add(k); qs.push(q);
  }
  return qs;
}
function mLoad(){ return state.math || {}; }
function mSave(o){ try { const ks=Object.keys(o).sort(); while (ks.length>40) delete o[ks.shift()]; state.math = o; if (state.user) api("/api/state",{uid:state.user.id,key:"math",val:o}).catch(()=>{}); } catch(_){} }
function mResult(g){ return mLoad()[mathDate()+"-"+g] || null; }
function mathStart(g){ state.mq={g, qs:mathQs(g,mathDate()), i:0, input:"", checked:false, res:[], done:false}; go("mq",{grade:g}); }
function mKey(v){
  const m=state.mq; if (!m||m.done||m.checked) return;
  if (v==="C") m.input="";
  else if (v==="B") m.input=m.input.slice(0,-1);
  else if (v==="OK"){ if (m.input==="") return; m.res[m.i]=(Number(m.input)===m.qs[m.i].ans)?1:0; m.checked=true; }
  else if (/^[0-9]$/.test(v)){ if (m.input.length>=4) return; m.input = m.input==="0" ? v : m.input+v; }
  render();
}
function mNext(){
  const m=state.mq; if (!m||!m.checked) return;
  if (m.i<m.qs.length-1){ m.i++; m.input=""; m.checked=false; }
  else { m.done=true; const all=mLoad(); all[mathDate()+"-"+m.g]={r:m.res,done:1}; mSave(all); }
  render(); window.scrollTo({top:0});
}
document.addEventListener("keydown", e=>{
  if (state.view!=="mq"||!state.mq||state.mq.done) return;
  if (/^[0-9]$/.test(e.key)) mKey(e.key);
  else if (e.key==="Backspace") mKey("B");
  else if (e.key==="Enter"){ e.preventDefault(); if (state.mq.checked) mNext(); else mKey("OK"); }
});
function viewMathHome(){
  const M=UI.mUI, n=MATH_CFG.n;
  const card = g => {
    const r=mResult(g), ok=r?r.r.filter(x=>x===1).length:0;
    const dots=Array.from({length:n},(_,i)=>\`<span class="dot \${r&&r.r[i]===1?"on":""}"></span>\`).join("");
    const st = r ? \`\${zy(M.did)} <span class="en">\${ok}/\${n}</span>\` : zy(M.notyet);
    return \`<button class="grade \${g}" data-act="grade" data-g="\${g}"><span class="big">\${U(g)}</span><span class="sub">\${zy(g==="g3"?M.kind3:M.kind1)}</span><span class="sub">\${st}</span><span class="dots">\${dots}</span></button>\`;
  };
  return \`<div class="hello">\${zy(M.mhello)}</div><div class="grades">\${card(state.user.grade)}</div>
  <button class="mcard" data-act="mtable"><span class="mbig en">9×9</span><span class="mtx"><span class="big">\${zy(M.table)}</span><span class="sub">\${zy(M.tableSub)}</span></span></button>
  \`;
}
function viewMq(){
  const m=state.mq, M=UI.mUI;
  if (m.done) return viewMDone();
  const q=m.qs[m.i], ok=m.res[m.i]===1;
  const dots=m.qs.map((_,k)=>\`<span class="dot \${(k<m.i||(k===m.i&&m.checked))?(m.res[k]===1?"on":"bad"):""} \${k===m.i?"cur":""}"></span>\`).join("");
  const cls = m.checked ? (ok?"ok":"no") : (m.input===""?"empty":"");
  const keys=[1,2,3,4,5,6,7,8,9].map(k=>\`<button class="key en" data-act="mkey" data-v="\${k}">\${k}</button>\`).join("");
  const pad = m.checked
    ? \`<div class="mfb \${ok?"ok":"no"}"><span class="mark" aria-hidden="true">\${ok?"○":"✗"}</span>\${ok?zy(M.right):zy(M.wrong)+\` <b class="en">\${q.ans}</b>\`}</div>
       <button class="btn primary mnext" data-act="mnext">\${m.i===m.qs.length-1?zy(M.finish):zy(M.next)}<span class="ic" aria-hidden="true">→</span></button>\`
    : \`<div class="kpad">\${keys}<button class="key fn" data-act="mkey" data-v="C">\${zy(M.clear)}</button><button class="key en" data-act="mkey" data-v="0">0</button><button class="key go" data-act="mkey" data-v="OK">\${zy(M.ok)}</button></div>\`;
  return \`<div class="mprog">\${dots}</div>
  <div class="mqn">\${zy(M.di)}<span class="en">\${m.i+1}</span>\${zy(M.ti)}</div>
  <div class="mexp en"><span>\${q.a}</span><span class="op">\${q.t}</span><span>\${q.b}</span><span class="op">=</span><span class="mans \${cls}">\${m.input===""?"?":m.input}</span></div>
  \${pad}\`;
}
function viewMDone(){
  const m=state.mq, M=UI.mUI, n=m.qs.length, ok=m.res.filter(x=>x===1).length;
  const msg = ok===n ? M.great : (ok>=n-2 ? M.good : M.keep);
  return \`<div class="sheet mdone"><div class="mscore en"><span class="n">\${ok}</span>/\${n}</div><div class="stars">\${"★".repeat(ok)}\${"☆".repeat(n-ok)}</div><div class="hello">\${zy(msg)}</div>
  <div class="tools"><button class="btn primary" data-act="back">\${zy(M.backM)}</button><button class="btn" data-act="mretry">\${zy(M.again)}</button></div></div>\`;
}
function mt(){ return state.mt || (state.mt={sel:2, hide:false, rev:{}}); }
function viewMTable(){
  const M=UI.mUI, t=mt(), sel=t.sel;
  const nums=[1,2,3,4,5,6,7,8,9];
  const shown=(a,b)=>!t.hide || t.rev[a+"x"+b];
  const picks=nums.map(n=>\`<button class="mpick en \${n===sel?"on":""}" data-act="mpick" data-n="\${n}" aria-pressed="\${n===sel}">\${n}</button>\`).join("");
  const rows=nums.map(i=>\`<button class="meq en" data-act="mreveal" data-k="\${sel}x\${i}"><span>\${sel} × \${i} =</span> <b class="\${shown(sel,i)?"":"q"}">\${shown(sel,i)?sel*i:"?"}</b></button>\`).join("");
  let grid=\`<div class="tg"><div class="th en">×</div>\${nums.map(b=>\`<div class="th en">\${b}</div>\`).join("")}\`;
  nums.forEach(a=>{ grid+=\`<div class="th en">\${a}</div>\`+nums.map(b=>\`<button class="tc en \${a===sel?"row":""} \${!shown(a,b)?"q":""}" data-act="mcell" data-a="\${a}" data-b="\${b}" aria-label="\${a}×\${b}">\${shown(a,b)?a*b:"·"}</button>\`).join(""); });
  grid+="</div>";
  return \`<div><div class="h1">\${zy(M.table)}</div></div>
  <div class="tools"><button class="btn" data-act="mhide">\${t.hide?zy(M.show):zy(M.hide)}</button></div>
  <div class="mt-sec"><div class="mt-lb">\${zy(M.pickN)}</div><div class="mpicks">\${picks}</div></div>
  <div class="meqs">\${rows}</div>
  <div class="tgwrap">\${grid}</div>\`;
}
const _wMq=viewMq;
viewMq=function(){const t=_wMq();return HOL?t.replace('<div class="mqn">',\`<div class="mqn"><span class="hmq" aria-hidden="true">\${[...HOL.garland.replace(/️/g,"")][0]}</span>\`):t};
`;
