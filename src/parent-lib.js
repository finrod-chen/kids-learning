// 家長學習紀錄的程式（每週各站作答、小芽、貼貼芽、苗苗最近提問），從首頁逐字切出，不要手改。
export const PARENT_JS = `function spStage(n){ const c=n%21; return c===0?0 : c<3?1 : c<6?2 : c<10?3 : c<14?4 : c<18?5 : 6; }
async function loadPData(){
  const id = state.pu; if (!id) return;
  try {
    const u = encodeURIComponent(id);
    const [ra, rb, rs] = await Promise.all([fetch("/api/articles?days=35",{cache:"no-store"}), fetch("/api/answers?uid="+u+"&days=35",{cache:"no-store"}), fetch("/api/state?uid="+u,{cache:"no-store"})]);
    if (ra.ok && rb.ok && rs.ok) {
      const arts = await ra.json(), ans = {}; (await rb.json()).forEach(x=>ans[x.qid]=x); const st = await rs.json();
      if (state.pu===id) { state.pArts = arts; state.pAns = ans; state.pstate = st; if (state.view==="parent") render(); }
    }
  } catch(_){}
}
function pDays(off){
  const t = new Date(Date.now()+8*3600000); t.setUTCHours(0,0,0,0);
  const s = t.getTime() - t.getUTCDay()*86400000 + off*7*86400000;
  return Array.from({length:7},(_,i)=>{ const d = new Date(s+i*86400000); return {k:d.toISOString().slice(0,10).replace(/-/g,""), lab:(d.getUTCMonth()+1)+"/"+d.getUTCDate(), w:"日一二三四五六"[i]}; });
}
function pScore(a, ans){ let done=0, ok=0; (a.questions||[]).forEach(q=>{ const r=ans[q.id]; if (r) { done++; if (r.firstCorrect) ok++; } }); return {done, ok, total:(a.questions||[]).length}; }
function pArtRow(a, ans){
  const s = pScore(a, ans);
  const st = s.done===0 ? \`<span class="pill na">還沒做</span>\` : \`<span class="pill \${s.ok===s.total?"ok":"no"}">\${s.ok}/\${s.total}</span>\${s.done<s.total?\` <span class="pill na">做到 \${s.done}/\${s.total}</span>\`:""}\`;
  const wrong = (a.questions||[]).filter(q=>{ const r=ans[q.id]; return r && !r.firstCorrect; }).map(q=>{ const r=ans[q.id]; return \`<div class="pw">\${esc((q.q&&q.q.t)||"")}　<span class="pill no">選 \${r.firstChoice}</span> 正解 \${q.answer}</div>\`; }).join("");
  const sub = a.kind==="vocab" ? (a.words||[]).map(w=>esc(w.w)).join("　") : esc(a.tag||"");
  return \`<div class="pit"><div class="pit1"><span class="pt">\${esc(a.title?a.title.t:"今日單字")}</span> \${st}</div>\${sub?\`<div class="psub">\${sub}</div>\`:""}\${wrong}</div>\`;
}
function pSection(icon, title, days, today, fn){
  const rows = days.map(d=>{ const h = fn(d); return \`<div class="pday\${d.k===today?" today":""}"><div class="pd">\${d.lab}<small>\${d.w}</small></div><div class="pbody">\${h||'<span class="pnone">—</span>'}</div></div>\`; }).join("");
  return \`<section class="psec"><h3>\${icon} \${title}</h3>\${rows}</section>\`;
}
function viewParent(){
  const gname = {g3:"三年級",g1:"一年級"};
  const pu = state.users.find(u=>u.id===state.pu) || state.user;
  if (!pu) return \`<div class="parent"><div class="note">還沒有使用者。</div></div>\`;
  const off = state.pw||0, days = pDays(off), today = mathDate(), g = pu.grade, ps = state.pstate || {};
  const loading = !state.pArts || !state.pAns || !state.pstate;
  let out = \`<div class="parent"><h2>家長專區</h2><div class="pbar">\${state.users.map(u=>\`<button data-act="puser" data-id="\${esc(u.id)}" aria-pressed="\${u.id===pu.id}">\${esc(u.nick)}（\${gname[u.grade]}）</button>\`).join("")}</div>\`;
  const sp = ps.sprout || {n:0,last:""}, n = sp.n||0, fr = Math.floor(n/21);
  out += \`<div class="psprout"><span class="pse" aria-hidden="true">🌱</span><div><div><b>小芽</b>・\${esc(SP["s"+spStage(n)].t)}\${fr?\`　🍎×\${fr}\`:""}</div><div class="psub">已澆水 \${n} 天・\${sp.last===today?"今天已澆水":"今天還沒澆水"}</div></div></div>\`;
  out += \`<div class="pnav"><button class="btn" data-act="pweek" data-d="-1" \${off<=-4?"disabled":""}>◀ 上週</button><div class="pwl">\${days[0].lab}（日）– \${days[6].lab}（六）\${off===0?"・本週":""}</div><button class="btn" data-act="pweek" data-d="1" \${off>=0?"disabled":""}>下週 ▶</button></div>\`;
  if (loading) out += \`<div class="note">載入中…</div>\`;
  else {
    const arts = state.pArts, ans = state.pAns;
    const byDay = kinds => d => arts.filter(a=>a.week===d.k && a.grade===g && kinds.includes(a.kind)).sort((a,b)=>(a.order||0)-(b.order||0)).map(a=>pArtRow(a,ans)).join("");
    out += pSection("📖","讀讀芽", days, today, byDay(["lit","sci"]));
    out += pSection("💬","說說芽", days, today, byDay(["vocab"]));
    const mm = ps.math || {};
    out += pSection("🧮","算算芽", days, today, d=>{
      const e = mm[d.k+"-"+g];
      if (!e) return d.k<=today ? \`<span class="pill na">還沒做</span>\` : "";
      const r = e.r||[]; let qs = []; try { qs = mathQs(g, d.k); } catch(_){}
      const ok = r.filter(x=>x===1).length;
      const wrong = r.map((x,i)=>x===1?null:(qs[i]?\`\${qs[i].a}\${qs[i].t}\${qs[i].b}=\${qs[i].ans}\`:\`第\${i+1}題\`)).filter(Boolean);
      return \`<span class="pill \${ok===r.length?"ok":"no"}">\${ok}/\${r.length}</span>\${wrong.length?\`<div class="pw">答錯：\${wrong.join("、")}</div>\`:""}\`;
    });
    const nm = ps.news || {}, newsArts = arts.filter(a=>a.kind==="news");
    const total = days.reduce((c,d)=>c+(nm[d.k]||[]).length,0);
    out += pSection("📰",\`新聞芽（本週讀了 \${total} 則）\`, days, today, d=>(nm[d.k]||[]).map(id=>{ const a=newsArts.find(x=>x.id===id); return \`<div class="pit1"><span class="pt">\${esc(a?a.title.t:id)}</span>\${a?\` <span class="pill na">\${esc(a.tag)}</span>\`:""}</div>\`; }).join(""));
  }
  return out + \`<div class="note">「第一次就答對」只算孩子第一次作答的結果，重做不會覆蓋。新聞芽記錄的是孩子打開閱讀過的文章。<br><button class="pdel" data-act="pdel" data-id="\${esc(pu.id)}">刪除「\${esc(pu.nick)}」和他的所有紀錄</button>　<button class="pdel" data-act="pinchg">修改 PIN</button></div></div>\`;
}
const _wParent=viewParent;viewParent=function(){const t=_wParent(),e='<div class="note">「第一次就答對」';if(!state.pArts||!state.pstate||t.indexOf(e)<0)return t;const s=state.users.find(t=>t.id===state.pu)||state.user;if(!s)return t;const a=state.pstate.write||{},n=pDays(state.pw||0),r=mathDate(),c=s.grade,i=pSection("✏️","寫寫芽",n,r,t=>{if(t.k<"20261027")return"";const e=a[t.k+"-"+c],s=e&&e.c||wDay(c,t.k).chars.map(t=>t.c).join("");return e?\`<span class="pill \${e.ok===e.n?"ok":"no"}">測驗 \${e.ok}/\${e.n}</span> <span class="psub">生字 \${esc(s)}</span>\${e.s?\`<div class="pw">造句：\${esc(e.s)}</div>\`:e.p?'<div class="pw">造句：寫在作業簿上</div>':""}\`:t.k<=r?\`<span class="pill na">還沒做</span> <span class="psub">生字 \${esc(s)}</span>\`:""});return t.replace(e,i+e)};
const _sParent = viewParent;
viewParent = function(){
  const h = _sParent(), mk = \`<div class="pnav">\`;
  if (!state.pstate || h.indexOf(mk)<0) return h;
  const pst = state.pstate.stick || {}, got = pst.got || {};
  const ids = SD.list.filter(s=>got[s.id]);
  const lvn = s=>{ const L=stkLv(pst,s); return s.tiers ? \`・\${STK_MED[L]}\${SD.tiers[L].t}\` : ""; };
  const row = \`<div class="psprout pstk"><img class="pse" src="/img/sticker.webp" alt="" width="40" height="40"><div><div><b>貼貼芽</b>・已收集 \${ids.length}/\${SD.list.length} 張</div>\${ids.length?\`<div class="pstkrow">\${ids.map(s=>\`<span class="pstkw\${stkRingCls(s,stkLv(pst,s))}"><img src="/img/stk-\${s.id}.webp" alt="\${esc(s.name.t+lvn(s))}" title="\${esc(s.name.t+lvn(s))}（\${stkMD(stkLast(pst,s.id))}）" width="40" height="40" loading="lazy"></span>\`).join("")}</div>\`:\`<div class="psub">還沒有貼紙</div>\`}</div></div>\`;
  return h.replace(mk, row+mk);
};
const _cParent = viewParent;
viewParent = function(){
  const h = _cParent(), mk = \`<div class="pnav">\`;
  if (h.indexOf(mk) < 0) return h;
  const row = chParentBlock();
  return row ? h.replace(mk, row + mk) : h;
};
function chParentBlock(){
  const pu = state.pu || (state.user && state.user.id); if (!pu) return "";
  const pc = state.pchat;
  if (!pc || pc.uid!==pu) {
    state.pchat = { uid:pu, list:null };
    fetch("/api/chat?all=1&uid="+encodeURIComponent(pu), { cache:"no-store" }).then(r=>r.ok?r.json():null).then(j=>{ if (state.pchat && state.pchat.uid===pu) { state.pchat.list = (j && j.list) || []; if (state.view==="parent") render(); } }).catch(()=>{});
    return "";
  }
  if (!pc.list) return "";
  const pairs = []; let q = null;
  pc.list.forEach(m=>{ if (m.role==="user") q = m; else if (m.role==="bot" && q) { pairs.push([q, m]); q = null; } });
  const rows = pairs.slice(-30).reverse().map(([a,b])=>\`<details class="lq-pchq"><summary><span class="lq-pchd">\${esc(String(a.at||"").slice(5,10).replace("-","/"))}</span>\${esc(a.t)}</summary><div class="lq-pcha">\${esc(b.t)}\${b.src&&b.src.length?\`<div class="lq-pchs">來源：\${b.src.map(s=>esc(s.title)).join("、")}</div>\`:""}</div></details>\`).join("");
  return \`<div class="psprout lq-pchat"><img class="pse" src="\${CH_LOGO}" alt="" width="40" height="40"><div style="min-width:0;flex:1"><div><b>聊聊芽</b>・最近 \${pairs.length} 題</div>\${rows ? \`<div class="lq-pchl">\${rows}</div>\` : \`<div class="psub">還沒有問過苗苗問題</div>\`}</div></div>\`;
}
`;
