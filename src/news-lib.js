// 新聞芽的程式（本週新聞列表、文章閱讀、記錄已讀），從首頁逐字切出，不要手改。
export const NEWS_JS = `function newsWeek(){
  const ns=state.articles.filter(a=>a.kind==="news"); if(!ns.length) return [];
  const w=ns.map(a=>a.week).sort().pop();
  return ns.filter(a=>a.week===w).sort((a,b)=>a.order-b.order);
}
function nTag(a){ const N=UI.nUI, inn=a.tag==="國內"; return \`<span class="ntg \${inn?"in":"out"}">\${zy(inn?N.tin:N.tout)}</span>\`; }
function viewNewsHome(){
  const N=UI.nUI, ns=newsWeek();
  if (!ns.length) return \`<div class="note">\${state.loadError?"連不上網路，請檢查 Wi‑Fi 後重新整理。":zy(N.empty)}</div>\`;
  const list=ns.map(a=>\`<button class="nart" data-act="nopen" data-id="\${esc(a.id)}"><span class="nem" aria-hidden="true">\${a.emoji||"📰"}</span><span class="ntx">\${nTag(a)}<span class="t">\${zy(a.title)}</span></span></button>\`).join("");
  return \`<div><div class="h1">\${zy(N.week)}</div><div class="weeklbl">\${esc(ns[0].weekLabel)}</div></div><div class="arts">\${list}</div><div class="foot"><button data-act="parent">家長專區</button></div>\`;
}
function viewNRead(){
  const a=state.art, N=UI.nUI; if(!a) return "";
  const ns=newsWeek(), nx=ns[ns.findIndex(x=>x.id===a.id)+1];
  const paras=a.paras.map((p,i)=>\`<p class="para" data-p="\${i}">\${zy(p)}\${synth?\`<button class="say" data-act="sayp" data-i="\${i}" aria-label="唸這一段">🔊</button>\`:""}</p>\`).join("");
  const listen = synth ? \`<button class="btn" data-act="listen" id="listenBtn"><span class="ic" aria-hidden="true">🔊</span>\${U(state.speaking?"stop":"listen")}</button>\` : "";
  const img = a.img ? \`<figure class="nimg"><img src="\${esc(a.img.url)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.closest('figure').remove()"><figcaption>圖片來源：\${esc(a.img.credit)}</figcaption></figure>\` : "";
  const nextBtn = nx ? \`<button class="btn primary" data-act="nopen" data-id="\${esc(nx.id)}">\${zy(N.nextN)}<span class="ic" aria-hidden="true">→</span></button>\` : "";
  return \`<div class="tools">\${listen}\${sizeTools()}</div>
  <article class="sheet reader">\${nTag(a)}<div class="ttl">\${zy(a.title)}</div>\${img}\${paras}</article>
  <section class="nbox rel"><div class="nlb"><span aria-hidden="true">💡</span>\${zy(N.rel)}</div><div class="nbd">\${zy(a.rel)}</div></section>
  <section class="nbox talk"><div class="nlb"><span aria-hidden="true">💬</span>\${zy(N.talk)}</div><div class="nbd">\${zy(a.talk)}</div></section>
  <a class="nsrc" href="\${esc(a.src.url)}" target="_blank" rel="noopener noreferrer"><span class="nsl">\${zy(N.src)} ↗</span><span class="nsn">\${esc(a.src.name)}｜\${esc(a.src.title)}</span></a>
  <div class="tools">\${nextBtn}<button class="btn" data-act="back">\${zy(N.backL)}</button></div>\`;
}
function sizeTools(){ return \`<button class="btn" data-act="size" data-d="-4" aria-label="字小一點"><span class="ic">A−</span></button><button class="btn" data-act="size" data-d="4" aria-label="字大一點"><span class="ic">A+</span></button>\`; }
function newsRead(id){
  const u = state.user; if (!u) return;
  const d = mathDate(), n = state.news || (state.news = {}), a = n[d] || (n[d] = []);
  if (a.includes(id)) return;
  a.push(id); const ks = Object.keys(n).sort(); while (ks.length>21) delete n[ks.shift()];
  api("/api/state",{uid:u.id,key:"news",val:n}).catch(()=>{});
}
`;
