// 貼貼芽的程式與樣式（成就貼紙：資料、判斷、貼紙簿畫面、首頁入口卡、得到貼紙的彈窗），從首頁逐字切出，不要手改。
export const STK_JS = `const SD = {"ui":{"st":{"t":"貼貼芽","z":["ㄊㄧㄝ","ㄊㄧㄝ","ㄧㄚˊ"]},"sub":{"t":"收集成就貼紙","z":["ㄕㄡ","ㄐㄧˊ","ㄔㄥˊ","ㄐㄧㄡˋ","ㄊㄧㄝ","ㄓˇ"]},"have":{"t":"已收集","z":["ㄧˇ","ㄕㄡ","ㄐㄧˊ"]},"zhang":{"t":"張","z":["ㄓㄤ"]},"next":{"t":"下一張","z":["ㄒㄧㄚˋ","ㄧ","ㄓㄤ"]},"none":{"t":"完成任務就能得到貼紙喔","z":["ㄨㄢˊ","ㄔㄥˊ","ㄖㄣˋ","ㄨˋ","ㄐㄧㄡˋ","ㄋㄥˊ","ㄉㄜˊ","ㄉㄠˋ","ㄊㄧㄝ","ㄓˇ","ㄛ"]},"all":{"t":"全部收集完成了，好厲害！","z":["ㄑㄩㄢˊ","ㄅㄨˋ","ㄕㄡ","ㄐㄧˊ","ㄨㄢˊ","ㄔㄥˊ","ㄌㄜ˙","","ㄏㄠˇ","ㄌㄧˋ","ㄏㄞˋ",""]},"got":{"t":"得到新貼紙！","z":["ㄉㄜˊ","ㄉㄠˋ","ㄒㄧㄣ","ㄊㄧㄝ","ㄓˇ",""]},"ok":{"t":"好棒！","z":["ㄏㄠˇ","ㄅㄤˋ",""]},"see":{"t":"看貼紙簿","z":["ㄎㄢˋ","ㄊㄧㄝ","ㄓˇ","ㄅㄨˋ"]},"on":{"t":"得到","z":["ㄉㄜˊ","ㄉㄠˋ"]},"lock":{"t":"還沒得到","z":["ㄏㄞˊ","ㄇㄟˊ","ㄉㄜˊ","ㄉㄠˋ"]},"tap":{"t":"點貼紙可以聽說明","z":["ㄉㄧㄢˇ","ㄊㄧㄝ","ㄓˇ","ㄎㄜˇ","ㄧˇ","ㄊㄧㄥ","ㄕㄨㄛ","ㄇㄧㄥˊ"]},"stations":{"t":"讀讀、說說、算算、新聞、寫寫、家事、書櫃","z":["ㄉㄨˊ","ㄉㄨˊ","","ㄕㄨㄛ","ㄕㄨㄛ","","ㄙㄨㄢˋ","ㄙㄨㄢˋ","","ㄒㄧㄣ","ㄨㄣˊ","","ㄒㄧㄝˇ","ㄒㄧㄝˇ","","ㄐㄧㄚ","ㄕˋ","","ㄕㄨ","ㄍㄨㄟˋ"]},"up":{"t":"升級成","z":["ㄕㄥ","ㄐㄧˊ","ㄔㄥˊ"]},"max":{"t":"最高級了","z":["ㄗㄨㄟˋ","ㄍㄠ","ㄐㄧˊ","ㄌㄜ˙"]},"nextlv":{"t":"下一級","z":["ㄒㄧㄚˋ","ㄧ","ㄐㄧˊ"]}},"tiers":[{"t":"銅牌","z":["ㄊㄨㄥˊ","ㄆㄞˊ"]},{"t":"銀牌","z":["ㄧㄣˊ","ㄆㄞˊ"]},{"t":"金牌","z":["ㄐㄧㄣ","ㄆㄞˊ"]},{"t":"鑽石","z":["ㄗㄨㄢˋ","ㄕˊ"]}],"list":[{"id":"water","name":{"t":"第一次澆水","z":["ㄉㄧˋ","ㄧ","ㄘˋ","ㄐㄧㄠ","ㄕㄨㄟˇ"]},"desc":{"t":"完成一個站，幫小芽澆第一次水","z":["ㄨㄢˊ","ㄔㄥˊ","ㄧ","ㄍㄜˋ","ㄓㄢˋ","","ㄅㄤ","ㄒㄧㄠˇ","ㄧㄚˊ","ㄐㄧㄠ","ㄉㄧˋ","ㄧ","ㄘˋ","ㄕㄨㄟˇ"]},"cat":"water","goal":1},{"id":"fruit","name":{"t":"收成果實","z":["ㄕㄡ","ㄔㄥˊ","ㄍㄨㄛˇ","ㄕˊ"]},"desc":{"t":"小芽澆水21天，收成一顆果實","z":["ㄒㄧㄠˇ","ㄧㄚˊ","ㄐㄧㄠ","ㄕㄨㄟˇ","","","ㄊㄧㄢ","","ㄕㄡ","ㄔㄥˊ","ㄧ","ㄎㄜ","ㄍㄨㄛˇ","ㄕˊ"]},"cat":"water","goal":21,"tiers":[21,50,100,200],"dp":{"t":"小芽澆水滿","z":["ㄒㄧㄠˇ","ㄧㄚˊ","ㄐㄧㄠ","ㄕㄨㄟˇ","ㄇㄢˇ"]},"ds":{"t":"天","z":["ㄊㄧㄢ"]}},{"id":"streak7","name":{"t":"連續學習","z":["ㄌㄧㄢˊ","ㄒㄩˋ","ㄒㄩㄝˊ","ㄒㄧˊ"]},"desc":{"t":"連續7天都來學習","z":["ㄌㄧㄢˊ","ㄒㄩˋ","","ㄊㄧㄢ","ㄉㄨ","ㄌㄞˊ","ㄒㄩㄝˊ","ㄒㄧˊ"]},"cat":"streak","goal":7,"tiers":[7,14,30,60],"dp":{"t":"連續","z":["ㄌㄧㄢˊ","ㄒㄩˋ"]},"ds":{"t":"天都來學習","z":["ㄊㄧㄢ","ㄉㄨ","ㄌㄞˊ","ㄒㄩㄝˊ","ㄒㄧˊ"]}},{"id":"bookworm","name":{"t":"小書蟲","z":["ㄒㄧㄠˇ","ㄕㄨ","ㄔㄨㄥˊ"]},"desc":{"t":"讀讀芽讀完10篇文章","z":["ㄉㄨˊ","ㄉㄨˊ","ㄧㄚˊ","ㄉㄨˊ","ㄨㄢˊ","","","ㄆㄧㄢ","ㄨㄣˊ","ㄓㄤ"]},"cat":"rd","goal":10,"tiers":[10,30,60,100],"dp":{"t":"讀讀芽讀完","z":["ㄉㄨˊ","ㄉㄨˊ","ㄧㄚˊ","ㄉㄨˊ","ㄨㄢˊ"]},"ds":{"t":"篇文章","z":["ㄆㄧㄢ","ㄨㄣˊ","ㄓㄤ"]}},{"id":"words","name":{"t":"單字小達人","z":["ㄉㄢ","ㄗˋ","ㄒㄧㄠˇ","ㄉㄚˊ","ㄖㄣˊ"]},"desc":{"t":"說說芽完成10次","z":["ㄕㄨㄛ","ㄕㄨㄛ","ㄧㄚˊ","ㄨㄢˊ","ㄔㄥˊ","","","ㄘˋ"]},"cat":"vc","goal":10,"tiers":[10,30,60,100],"dp":{"t":"說說芽完成","z":["ㄕㄨㄛ","ㄕㄨㄛ","ㄧㄚˊ","ㄨㄢˊ","ㄔㄥˊ"]},"ds":{"t":"次","z":["ㄘˋ"]}},{"id":"quizking","name":{"t":"答題小王","z":["ㄉㄚˊ","ㄊㄧˊ","ㄒㄧㄠˇ","ㄨㄤˊ"]},"desc":{"t":"10篇文章第一次就全部答對","z":["","","ㄆㄧㄢ","ㄨㄣˊ","ㄓㄤ","ㄉㄧˋ","ㄧ","ㄘˋ","ㄐㄧㄡˋ","ㄑㄩㄢˊ","ㄅㄨˋ","ㄉㄚˊ","ㄉㄨㄟˋ"]},"cat":"pf","goal":10,"tiers":[10,25,50,100],"dp":{"t":"","z":[]},"ds":{"t":"篇文章第一次就全部答對","z":["ㄆㄧㄢ","ㄨㄣˊ","ㄓㄤ","ㄉㄧˋ","ㄧ","ㄘˋ","ㄐㄧㄡˋ","ㄑㄩㄢˊ","ㄅㄨˋ","ㄉㄚˊ","ㄉㄨㄟˋ"]}},{"id":"math","name":{"t":"算術小高手","z":["ㄙㄨㄢˋ","ㄕㄨˋ","ㄒㄧㄠˇ","ㄍㄠ","ㄕㄡˇ"]},"desc":{"t":"算算芽完成10次","z":["ㄙㄨㄢˋ","ㄙㄨㄢˋ","ㄧㄚˊ","ㄨㄢˊ","ㄔㄥˊ","","","ㄘˋ"]},"cat":"mt","goal":10,"tiers":[10,30,60,100],"dp":{"t":"算算芽完成","z":["ㄙㄨㄢˋ","ㄙㄨㄢˋ","ㄧㄚˊ","ㄨㄢˊ","ㄔㄥˊ"]},"ds":{"t":"次","z":["ㄘˋ"]}},{"id":"write","name":{"t":"寫出第一個字","z":["ㄒㄧㄝˇ","ㄔㄨ","ㄉㄧˋ","ㄧ","ㄍㄜˋ","ㄗˋ"]},"desc":{"t":"完成第一次寫寫芽","z":["ㄨㄢˊ","ㄔㄥˊ","ㄉㄧˋ","ㄧ","ㄘˋ","ㄒㄧㄝˇ","ㄒㄧㄝˇ","ㄧㄚˊ"]},"cat":"wr","goal":1},{"id":"writer","name":{"t":"小作家","z":["ㄒㄧㄠˇ","ㄗㄨㄛˋ","ㄐㄧㄚ"]},"desc":{"t":"寫寫芽完成10天","z":["ㄒㄧㄝˇ","ㄒㄧㄝˇ","ㄧㄚˊ","ㄨㄢˊ","ㄔㄥˊ","","","ㄊㄧㄢ"]},"cat":"wr","goal":10,"tiers":[10,30,60,100],"dp":{"t":"寫寫芽完成","z":["ㄒㄧㄝˇ","ㄒㄧㄝˇ","ㄧㄚˊ","ㄨㄢˊ","ㄔㄥˊ"]},"ds":{"t":"天","z":["ㄊㄧㄢ"]}},{"id":"news","name":{"t":"小記者","z":["ㄒㄧㄠˇ","ㄐㄧˋ","ㄓㄜˇ"]},"desc":{"t":"新聞芽讀了10則新聞","z":["ㄒㄧㄣ","ㄨㄣˊ","ㄧㄚˊ","ㄉㄨˊ","ㄌㄜ˙","","","ㄗㄜˊ","ㄒㄧㄣ","ㄨㄣˊ"]},"cat":"nw","goal":10,"tiers":[10,30,60,100],"dp":{"t":"新聞芽讀了","z":["ㄒㄧㄣ","ㄨㄣˊ","ㄧㄚˊ","ㄉㄨˊ","ㄌㄜ˙"]},"ds":{"t":"則新聞","z":["ㄗㄜˊ","ㄒㄧㄣ","ㄨㄣˊ"]}},{"id":"chores","name":{"t":"家事小幫手","z":["ㄐㄧㄚ","ㄕˋ","ㄒㄧㄠˇ","ㄅㄤ","ㄕㄡˇ"]},"desc":{"t":"完成20件家事","z":["ㄨㄢˊ","ㄔㄥˊ","","","ㄐㄧㄢˋ","ㄐㄧㄚ","ㄕˋ"]},"cat":"ch","goal":20,"tiers":[20,50,100,200],"dp":{"t":"完成","z":["ㄨㄢˊ","ㄔㄥˊ"]},"ds":{"t":"件家事","z":["ㄐㄧㄢˋ","ㄐㄧㄚ","ㄕˋ"]}},{"id":"redeem","name":{"t":"第一次兌換","z":["ㄉㄧˋ","ㄧ","ㄘˋ","ㄉㄨㄟˋ","ㄏㄨㄢˋ"]},"desc":{"t":"用家事點數換一次獎勵","z":["ㄩㄥˋ","ㄐㄧㄚ","ㄕˋ","ㄉㄧㄢˇ","ㄕㄨˋ","ㄏㄨㄢˋ","ㄧ","ㄘˋ","ㄐㄧㄤˇ","ㄌㄧˋ"]},"cat":"redeem","goal":1},{"id":"shelf","name":{"t":"小小藏書家","z":["ㄒㄧㄠˇ","ㄒㄧㄠˇ","ㄘㄤˊ","ㄕㄨ","ㄐㄧㄚ"]},"desc":{"t":"芽書櫃記錄10本書","z":["ㄧㄚˊ","ㄕㄨ","ㄍㄨㄟˋ","ㄐㄧˋ","ㄌㄨˋ","","","ㄅㄣˇ","ㄕㄨ"]},"cat":"bk","goal":10,"tiers":[10,25,50,100],"dp":{"t":"芽書櫃記錄","z":["ㄧㄚˊ","ㄕㄨ","ㄍㄨㄟˋ","ㄐㄧˋ","ㄌㄨˋ"]},"ds":{"t":"本書","z":["ㄅㄣˇ","ㄕㄨ"]}},{"id":"allstations","name":{"t":"全站探險家","z":["ㄑㄩㄢˊ","ㄓㄢˋ","ㄊㄢˋ","ㄒㄧㄢˇ","ㄐㄧㄚ"]},"desc":{"t":"每一個站都完成過一次","z":["ㄇㄟˇ","ㄧ","ㄍㄜˋ","ㄓㄢˋ","ㄉㄡ","ㄨㄢˊ","ㄔㄥˊ","ㄍㄨㄛˋ","ㄧ","ㄘˋ"]},"cat":"all","goal":7},{"id":"holiday","name":{"t":"節日快樂","z":["ㄐㄧㄝˊ","ㄖˋ","ㄎㄨㄞˋ","ㄌㄜˋ"]},"desc":{"t":"在節日的時候來學習","z":["ㄗㄞˋ","ㄐㄧㄝˊ","ㄖˋ","ㄉㄜ˙","ㄕˊ","ㄏㄡˋ","ㄌㄞˊ","ㄒㄩㄝˊ","ㄒㄧˊ"]},"cat":"hol","goal":1,"tiers":[1,3,6,10],"dp":{"t":"在","z":["ㄗㄞˋ"]},"ds":{"t":"個不同的節日來學習","z":["ㄍㄜˋ","ㄅㄨˋ","ㄊㄨㄥˊ","ㄉㄜ˙","ㄐㄧㄝˊ","ㄖˋ","ㄌㄞˊ","ㄒㄩㄝˊ","ㄒㄧˊ"]}}]};
const SU = SD.ui;
const STK_CATS = ["rd","vc","pf","mt","nw","wr","ch"];
const STK_KEEP = 14;
const STK_MED = ["🥉","🥈","🥇","💎"];
function stkLv(st, s){ const g=(st&&st.got)||{}; if (!g[s.id]) return -1; return s.tiers ? Math.min(3, Math.max(0, ((st.lv||{})[s.id])||0)) : 0; }
function stkTgt(s, L){ return s.tiers ? s.tiers[Math.min(L+1, 3)] : s.goal; }
function stkDescZ(s, n){ return s.tiers ? \`\${zy(s.dp)}<span class="en">\${n}</span>\${zy(s.ds)}\` : zy(s.desc); }
function stkDescP(s, n){ return s.tiers ? plain(s.dp)+n+plain(s.ds) : plain(s.desc); }
function stkLast(st, id){ const a=[(st.got||{})[id]].concat(((st.lvd||{})[id])||[]).filter(Boolean).sort(); return a.pop()||""; }
function stkHolId(d, k){ let y=+d.slice(0,4); if (k==="newyear" && d.slice(4,6)==="12") y++; return y+"-"+k; }
function stkToday(){ return mathDate(); }
function stkDN(d){ return Date.UTC(+d.slice(0,4), +d.slice(4,6)-1, +d.slice(6,8))/86400000; }
function stkDS(n){ return new Date(n*86400000).toISOString().slice(0,10).replace(/-/g,""); }
function stkTW(iso){ try { return new Date(new Date(iso).getTime()+8*3600000).toISOString().slice(0,10).replace(/-/g,""); } catch(_){ return ""; } }
function stkKD(k){
  k = String(k||"");
  if (/^\\d{8}/.test(k)) return k.slice(0,8);
  const m = k.match(/^(\\d{4})W(\\d{2})/);
  if (m) { const y=+m[1], w=+m[2], j4=new Date(Date.UTC(y,0,4)), dow=(j4.getUTCDay()+6)%7; return stkDS(Math.floor(j4.getTime()/86400000) - dow + (w-1)*7); }
  return "";
}
function stkLive(){
  const L = {}; STK_CATS.forEach(c=>L[c]={});
  const days = {};
  const ans = state.answers || {};
  (state.articles||[]).forEach(a=>{
    if (!a || !a.questions || !a.questions.length) return;
    const cat = a.kind==="vocab" ? "vc" : (a.kind==="sci"||a.kind==="lit") ? "rd" : null; if (!cat) return;
    const rs = a.questions.map(q=>ans[q.id]); if (!rs.every(Boolean)) return;
    const d = rs.map(r=>stkTW(r.firstAt)).filter(Boolean).sort().pop() || stkKD(a.id);
    L[cat][a.id] = d; if (rs.every(r=>r.firstCorrect)) L.pf[a.id] = d;
    rs.forEach(r=>{ const x=stkTW(r.firstAt); if (x) days[x]=1; });
  });
  const mm = state.math || {}; Object.keys(mm).forEach(k=>{ const e=mm[k]; if (e && e.done && /^\\d{8}-g/.test(k)) { L.mt[k]=k.slice(0,8); days[k.slice(0,8)]=1; } });
  const nm = state.news || {}; Object.keys(nm).sort().forEach(d=>{ const a=nm[d]; if (!Array.isArray(a)||!/^\\d{8}$/.test(d)) return; if (a.length) days[d]=1; a.forEach(id=>{ if (!(id in L.nw)) L.nw[id]=d; }); });
  const wm = state.write || {}; Object.keys(wm).forEach(k=>{ const e=wm[k]; if (e && e.done && /^\\d{8}-g/.test(k)) { L.wr[k]=k.slice(0,8); days[k.slice(0,8)]=1; } });
  const cm = state.chores || {}; Object.keys(cm).forEach(d=>{ const a=cm[d]; if (!Array.isArray(a)||!/^\\d{8}$/.test(d)) return; if (a.length) days[d]=1; a.forEach(id=>{ L.ch[d+":"+id]=d; }); });
  const sp = state.sprout || {}; if (sp.last && /^\\d{8}$/.test(sp.last)) days[sp.last]=1;
  return {L, days:Object.keys(days)};
}
function stkBlank(){ return {v:1, got:{}, nw:[], c:{}, d:[]}; }
function stkCount(st, c){ const e=(st.c||{})[c]; return e ? (e.n||0)+(e.k||[]).length : 0; }
function stkMerge(st, live){
  const today = stkToday(), tn = stkDN(today), cut = stkDS(tn-STK_KEEP);
  STK_CATS.forEach(c=>{
    const e = st.c[c] || (st.c[c] = {n:0, f:"", k:[]});
    const have = new Set(e.k), lv = live.L[c];
    Object.keys(lv).forEach(k=>{ const kd = stkKD(k) || lv[k]; if (!have.has(k) && !(e.f && kd && kd<=e.f)) { e.k.push(k); have.add(k); } });
    if (c==="ch") e.k = e.k.filter(k=>{ const kd=stkKD(k); return !(kd && kd>=cut && !(k in lv)); });
    const keep = [];
    e.k.forEach(k=>{ const kd=stkKD(k); if (kd && kd<cut) { e.n=(e.n||0)+1; if (!e.f || kd>e.f) e.f=kd; } else keep.push(k); });
    e.k = keep.slice(-60);
  });
  const dset = new Set((st.d||[]).concat(live.days));
  st.d = [...dset].filter(d=>/^\\d{8}$/.test(d) && d<=today && stkDN(d)>=tn-30).sort();
}
function stkRuns(ds){
  let best=0, run=0, prev=null;
  ds.forEach(d=>{ const n=stkDN(d); run = (prev!==null && n===prev+1) ? run+1 : 1; prev=n; if (run>best) best=run; });
  let cur=0; const tn=stkDN(stkToday()), set=new Set(ds.map(stkDN));
  let s = set.has(tn) ? tn : (set.has(tn-1) ? tn-1 : null);
  while (s!==null && set.has(s)) { cur++; s--; }
  return {best, cur};
}
function stkVals(st){
  const sp = state.sprout || {}, n = sp.n||0, bk = state.stkBk && state.user && state.stkBk.uid===state.user.id ? state.stkBk.n : 0;
  const b = state.chbank || {}, runs = stkRuns(st.d||[]);
  const cnt = {}; STK_CATS.forEach(c=>cnt[c]=stkCount(st,c)); cnt.bk = bk;
  const all = ["rd","vc","mt","nw","wr","ch","bk"].filter(c=>cnt[c]>0).length;
  const hol = (st.d||[]).some(d=>d>="20261027" && typeof holKeyFor==="function" && holKeyFor(d)) ? 1 : 0;
  const v = {};
  SD.list.forEach(s=>{
    let x = 0, show = null;
    if (s.cat==="water") x = n;
    else if (s.cat==="streak") { const tn = stkDN(stkToday()), sl = st.sr && st.sr.e>=tn-1 ? st.sr.e-st.sr.s+1 : 0; x = Math.max(st.best||0, runs.best, sl); show = Math.max(sl, runs.cur); }
    else if (s.cat==="redeem") x = ((b.s||0)>0 || (b.h||[]).length) ? 1 : 0;
    else if (s.cat==="all") x = all;
    else if (s.cat==="hol") x = Math.max(hol, (st.hol||[]).length);
    else x = cnt[s.cat]||0;
    v[s.id] = {x, show: show===null ? x : show};
  });
  return v;
}
function stkGot(){ const st=state.stick; return (st && st.got) || {}; }
let stkBusy = false, stkSaved = "";
function stkCheck(){
  const u = state.user; if (!u || !state.stickOk || state.stickUid!==u.id || stkBusy) return;
  stkBusy = true;
  try {
    const st = state.stick && state.stick.v ? state.stick : stkBlank();
    st.got = st.got||{}; st.nw = Array.isArray(st.nw)?st.nw:[]; st.c = st.c||{}; st.d = Array.isArray(st.d)?st.d:[];
    st.lv = st.lv||{}; st.lvd = st.lvd||{}; st.hol = Array.isArray(st.hol)?st.hol:[];
    const before = JSON.stringify(st);
    stkMerge(st, stkLive());
    const rr = stkRuns(st.d); if (rr.best > (st.best||0)) st.best = rr.best;
    /* 連續紀錄另外記起點，超過 30 天的資料被裁掉也能接著算 */
    if (rr.cur > 0) {
      const td = stkToday(), tn = stkDN(td), E = st.d.indexOf(td)>=0 ? tn : tn-1, S = E-rr.cur+1, o = st.sr;
      const s0 = (o && o.e>=S-1 && o.s<S) ? o.s : S;
      st.sr = {s:s0, e:E}; if (E-s0+1 > st.best) st.best = E-s0+1;
    }
    if (typeof holKeyFor==="function") st.d.forEach(d=>{ const k = d>="20261027" && holKeyFor(d); if (k) { const h = stkHolId(d, k); if (st.hol.indexOf(h)<0) st.hol.push(h); } });
    st.hol = st.hol.slice(-40);
    const v = stkVals(st), today = stkToday();
    SD.list.forEach(s=>{
      const x = v[s.id].x;
      if (!s.tiers) { if (!st.got[s.id] && x >= s.goal) { st.got[s.id] = today; st.nw.push(s.id); } return; }
      let L = -1; s.tiers.forEach((t,i)=>{ if (x >= t) L = i; });
      const cur = stkLv(st, s);
      if (L > cur) {
        if (cur < 0) st.got[s.id] = today;
        st.lv[s.id] = L;
        const a = Array.isArray(st.lvd[s.id]) ? st.lvd[s.id] : []; a[L] = today; st.lvd[s.id] = a;
        st.nw = st.nw.filter(e=>String(e).split(":")[0]!==s.id);
        st.nw.push(L>0 ? s.id+":"+L : s.id);
      }
    });
    state.stick = st;
    const after = JSON.stringify(st);
    if (after!==before && after!==stkSaved) { stkSaved = after; api("/api/state",{uid:u.id, key:"stick", val:st}).catch(()=>{}); }
  } catch(_){}
  stkBusy = false;
  if (!state.stkBk || state.stkBk.uid!==u.id || Date.now()-state.stkBk.at>300000) stkBooks();
}
function stkBooks(){
  const u = state.user; if (!u) return;
  state.stkBk = Object.assign({n:0}, state.stkBk && state.stkBk.uid===u.id ? state.stkBk : {}, {uid:u.id, at:Date.now()});
  fetch("/api/books?uid="+encodeURIComponent(u.id),{cache:"no-store"}).then(r=>r.ok?r.json():null).then(j=>{
    if (!Array.isArray(j) || !state.user || state.user.id!==u.id) return;
    const was = state.stkBk.n; state.stkBk.n = j.length;
    if (j.length!==was) { stkCheck(); if (state.view==="hub"||state.view==="stk") render(); }
  }).catch(()=>{});
}
function stkImg(id, cls){ return \`<img class="\${cls}" src="/img/stk-\${id}.webp" alt="" width="220" height="220" decoding="async">\`; }
function stkRingCls(s, L){ return s.tiers && L>=0 ? \` stkring t\${L}\` : ""; }
function stkThumb(s, L, off){ return \`<span class="stkthw\${off?"":stkRingCls(s,L)}">\${stkImg(s.id, off?"stkth off":"stkth")}</span>\`; }
function stkHave(){ return \`\${zy(SU.have)} <b class="en">\${Object.keys(stkGot()).filter(k=>SD.list.some(s=>s.id===k)).length}/\${SD.list.length}</b> \${zy(SU.zhang)}\`; }
function stkNext(){
  const st = state.stick || stkBlank(), v = stkVals(st);
  let best = null, br = -1;
  SD.list.forEach(s=>{
    const L = stkLv(st, s);
    if (L>=0 && (!s.tiers || L>=3)) return;
    const t = L<0 ? s.goal : stkTgt(s, L), r = Math.min(1, v[s.id].show/t);
    if (r>br) { br=r; best={s, v:v[s.id], L, t}; }
  });
  return best;
}
function viewStkHub(){
  const st = state.stick || stkBlank();
  const ids = SD.list.filter(s=>stkLv(st,s)>=0).sort((a,b)=>{ const x=stkLast(st,a.id), y=stkLast(st,b.id); return x<y?1:x>y?-1:0; }).slice(0,6);
  const nx = stkNext();
  const thumbs = ids.length ? \`<span class="stkthumbs">\${ids.map(s=>stkThumb(s, stkLv(st,s))).join("")}</span>\` : \`<span class="stkhn">\${zy(SU.none)}</span>\`;
  const next = !nx ? \`<span class="stkhn">\${zy(SU.all)}</span>\`
    : nx.L<0 ? \`<span class="stknx">\${stkThumb(nx.s, -1, true)}<span class="stknxt">\${zy(SU.next)}：\${zy(nx.s.name)} <b class="en">\${Math.min(nx.v.show,nx.t)}/\${nx.t}</b></span></span>\`
    : \`<span class="stknx">\${stkThumb(nx.s, nx.L)}<span class="stknxt">\${zy(SU.nextlv)}：\${zy(nx.s.name)} \${STK_MED[nx.L+1]} <b class="en">\${Math.min(nx.v.show,nx.t)}/\${nx.t}</b></span></span>\`;
  return \`<button class="stkhub" data-act="stkopen"><span class="stkhh"><img class="stklogo" src="/img/sticker.webp" alt="" width="72" height="72"><span class="stkhb"><span class="stkht">\${zy(SU.st)}</span><span class="stkhc">\${stkHave()}</span></span><span class="stkgo" aria-hidden="true">›</span></span>\${thumbs}\${next}</button>\`;
}
function stkMD(d){ return d && d.length===8 ? (+d.slice(4,6))+"/"+(+d.slice(6,8)) : ""; }
function viewStk(){
  const st = state.stick || stkBlank(), v = stkVals(st), got = stkGot();
  const n = Object.keys(got).filter(k=>SD.list.some(s=>s.id===k)).length;
  const tc = [0,0,0,0]; SD.list.forEach(s=>{ const L=stkLv(st,s); if (s.tiers && L>=0) tc[L]++; });
  const sum = tc.some(Boolean) ? \`<div class="stkbm">\${tc.map((c,i)=>\`<span class="stkbmi">\${STK_MED[i]}<b class="en">\${c}</b></span>\`).join("")}</div>\` : "";
  const bar = (x,t)=>\`<span class="stkpb"><i style="width:\${Math.round(Math.min(x,t)/t*100)}%"></i></span><span class="stkpc en">\${Math.min(x,t)}/\${t}</span>\`;
  const cards = SD.list.map(s=>{
    const L = stkLv(st,s), on = L>=0, t = on ? stkTgt(s,L) : s.goal, x = v[s.id].show;
    let foot;
    if (!on) foot = bar(x, t);
    else if (!s.tiers) foot = \`<span class="stkdt"><span class="en">\${stkMD(got[s.id])}</span> \${zy(SU.on)}</span>\`;
    else foot = \`<span class="stklv t\${L}">\${STK_MED[L]} \${zy(SD.tiers[L])}</span>\` + (L<3 ? bar(x, t) : \`<span class="stkdt">\${zy(SU.max)}</span>\`);
    const med = on && s.tiers ? \`<span class="stkmed t\${L}" aria-hidden="true">\${STK_MED[L]}</span>\` : "";
    return \`<button class="stkc\${on?" on":""}\${on&&s.tiers?" tl"+L:""}" data-act="stksay" data-id="\${s.id}"><span class="stkim\${stkRingCls(s,L)}">\${stkImg(s.id, on?"stkimg":"stkimg off")}\${med}</span><span class="stkn">\${zy(s.name)}</span><span class="stkd">\${stkDescZ(s, t)}</span>\${s.cat==="all"?\`<span class="stkd stks">（\${zy(SU.stations)}）</span>\`:""}\${foot}</button>\`;
  }).join("");
  return \`<div class="stkbook"><div class="stkhead"><img class="stkbl" src="/img/sticker.webp" alt="" width="96" height="96"><div class="stkhi"><div class="stkbt">\${zy(SU.st)}</div><div class="stkbc">\${stkHave()}</div><div class="stkbar"><i style="width:\${Math.round(n/SD.list.length*100)}%"></i></div>\${sum}</div></div>\${synth?\`<div class="stktip">\${zy(SU.tap)}</div>\`:""}<div class="stkgrid">\${cards}</div><div class="tools"><button class="btn primary" data-act="back">\${U("home")}</button></div></div>\`;
}
let stkPopOn = false;
function stkPop(){
  const st = state.stick; if (stkPopOn || !st || !st.nw || !st.nw.length || state.view!=="hub") return;
  const ent = String(st.nw[0]), id = ent.split(":")[0], s = SD.list.find(x=>x.id===id);
  if (!s) { st.nw.shift(); return stkPop(); }
  const L = s.tiers ? Math.min(3, Math.max(0, +(ent.split(":")[1]||0))) : 0, up = s.tiers && L>0;
  const title = up ? {t: SU.up.t+SD.tiers[L].t+"！", z: SU.up.z.concat(SD.tiers[L].z, [""])} : SU.got;
  stkPopOn = true;
  const el = document.createElement("div"); el.className = "stkpop"; el.setAttribute("role","dialog"); el.setAttribute("aria-modal","true");
  const sp = ["✨","⭐","🎉","✨","💖","⭐"].map((e,i)=>\`<span class="stksp s\${i}" aria-hidden="true">\${e}</span>\`).join("");
  el.innerHTML = \`<div class="stkbox">\${sp}<div class="stkpt">\${zy(title)}</div><div class="stkpi\${stkRingCls(s,L)}">\${stkImg(id,"stkpimg")}</div><div class="stkpn">\${zy(s.name)}</div>\${s.tiers?\`<div class="stklv big t\${L}">\${STK_MED[L]} \${zy(SD.tiers[L])}</div>\`:""}<div class="stkpd">\${s.tiers?stkDescZ(s, s.tiers[L]):zy(s.desc)}</div><div class="tools"><button class="btn stkok" data-stk="ok">\${zy(SU.ok)}</button><button class="btn" data-stk="see">\${zy(SU.see)}</button></div></div>\`;
  document.body.appendChild(el);
  if (synth) { try { speakList([plain(title), plain(s.name)]); } catch(_){} }
  el.addEventListener("click", e=>{
    const b = e.target.closest("[data-stk]"); if (!b) return;
    const act = b.dataset.stk; el.remove(); stkPopOn = false;
    const u = state.user, cur = state.stick;
    if (cur && cur.nw) { cur.nw = cur.nw.filter(x=>String(x)!==ent); if (u) { stkSaved = JSON.stringify(cur); api("/api/state",{uid:u.id, key:"stick", val:cur}).catch(()=>{}); } }
    if (act==="see") { go("stk",{station:"stk", grade:null}); return; }
    setTimeout(stkPop, 350);
  });
}
`;
export const STK_CSS = `/* ===== 貼貼芽 ===== */
:root{--stk:#D2477B;--stk-soft:#FFE6EE;--stk-line:#F4B9CB}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--stk:#FF8DB3;--stk-soft:#3A2530;--stk-line:#6B3E51}}
:root[data-theme="dark"]{--stk:#FF8DB3;--stk-soft:#3A2530;--stk-line:#6B3E51}
.stkhub{width:100%;max-width:100%;min-width:0;box-sizing:border-box;display:flex;flex-direction:column;align-items:stretch;gap:10px;background:var(--card);border:3px solid var(--stk);border-radius:28px;padding:14px 16px;box-shadow:0 6px 0 var(--stk-soft);text-align:left;color:inherit;font:inherit;-webkit-appearance:none;appearance:none;cursor:pointer}
.stkhub:active{transform:translateY(3px);box-shadow:0 3px 0 var(--stk-soft)}
.stkhh{display:flex;align-items:center;gap:14px;min-width:0}
.stklogo{width:72px;height:72px;flex:none;border-radius:18px}
.stkhb{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1 1 auto}
.stkht{font-size:28px;font-weight:700;color:var(--stk);padding-right:.8em}
.stkhc{font-size:18px;color:var(--muted);padding-right:.8em}
.stkhc b,.stkbc b{color:var(--stk);font-size:1.15em}
.stkgo{flex:none;font-size:40px;line-height:1;color:var(--stk);padding:0 4px}
.stkthumbs{display:flex;flex-wrap:wrap;gap:6px;min-width:0}
.stkth{width:56px;height:56px;max-width:100%;object-fit:contain;flex:none}
.stkth.off,.stkimg.off{-webkit-filter:grayscale(1);filter:grayscale(1);opacity:.38}
.stkhn{font-size:17px;color:var(--muted);padding-right:.8em}
.stknx{display:flex;align-items:center;gap:10px;background:var(--stk-soft);border-radius:16px;padding:6px 12px 6px 6px;min-width:0}
.stknx .stkth{width:44px;height:44px}
.stknxt{font-size:17px;min-width:0;overflow-wrap:anywhere;padding-right:.8em}
.stknxt b{color:var(--stk)}
/* 貼紙簿 */
.s-stk{--acc:var(--stk);--acc-soft:var(--stk-soft)}
.stkbook{display:flex;flex-direction:column;gap:16px;min-width:0}
.stkhead{display:flex;align-items:center;gap:16px;background:var(--card);border:3px solid var(--stk);border-radius:26px;padding:16px 18px;min-width:0}
.stkbl{width:96px;height:96px;flex:none;border-radius:22px}
.stkhi{display:flex;flex-direction:column;gap:6px;flex:1 1 auto;min-width:0}
.stkbt{font-size:32px;font-weight:700;color:var(--stk);padding-right:.8em}
.stkbc{font-size:20px;color:var(--muted);padding-right:.8em}
.stkbar,.stkpb{display:block;width:100%;height:10px;background:var(--stk-soft);border-radius:99px;overflow:hidden}
.stkbar i,.stkpb i{display:block;height:100%;background:var(--stk);border-radius:99px}
.stktip{text-align:center;font-size:17px;color:var(--muted);padding-right:.8em}
.stkgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
@media (min-width:600px){.stkgrid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (min-width:900px){.stkgrid{grid-template-columns:repeat(4,minmax(0,1fr))}}
.stkc{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0;max-width:100%;box-sizing:border-box;background:var(--card);border:2px dashed var(--line);border-radius:22px;padding:12px 8px 14px;text-align:center;color:inherit;font:inherit;-webkit-appearance:none;appearance:none}
.stkc.on{border:2px solid var(--stk-line);background:linear-gradient(180deg,var(--stk-soft),var(--card) 70%)}
.stkim{display:block;width:100%;max-width:150px;position:relative}
.stkim:before{content:"";display:block;padding-top:100%}
.stkimg{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain}
.stkc.on .stkimg{-webkit-filter:drop-shadow(0 3px 4px rgba(0,0,0,.18));filter:drop-shadow(0 3px 4px rgba(0,0,0,.18))}
.stkn{font-size:20px;font-weight:700;padding-right:.8em;max-width:100%;overflow-wrap:anywhere}
.stkc.on .stkn{color:var(--stk)}
.stkd{font-size:15px;color:var(--muted);line-height:1.5;padding-right:.8em;max-width:100%;overflow-wrap:anywhere}
.stks{font-size:13px}
.stkdt{font-size:15px;color:var(--stk);font-weight:700;padding-right:.8em}
.stkpc{font-size:15px;color:var(--muted)}
.stkc .stkpb{width:80%;height:8px}
@media (max-width:599px){.stkgrid{gap:8px}.stkc{padding:10px 4px 12px;border-radius:18px}.stkn{font-size:17px}.stkd{font-size:13px}.stks{font-size:12px}.stkbt{font-size:28px}.stkbl{width:76px;height:76px}.stkhead{padding:12px 14px;gap:12px}}
.stkc.tap .stkim{animation:stkwig .5s ease}
@keyframes stkwig{0%,100%{transform:rotate(0)}25%{transform:rotate(-6deg) scale(1.05)}75%{transform:rotate(6deg) scale(1.05)}}
/* 得到新貼紙 */
.stkpop{position:fixed;top:0;left:0;right:0;bottom:0;z-index:200;background:rgba(20,24,40,.55);display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
.stkbox{position:relative;width:100%;max-width:420px;box-sizing:border-box;background:var(--card);border:4px solid var(--stk);border-radius:30px;padding:22px 18px 20px;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;animation:stkin .45s cubic-bezier(.2,1.4,.4,1)}
.stkpt{font-size:28px;font-weight:700;color:var(--stk);padding-right:.8em}
.stkpi{width:min(64vw,230px);max-width:100%;position:relative}
.stkpi:before{content:"";display:block;padding-top:100%}
.stkpimg{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;animation:stkspin .9s cubic-bezier(.2,1.3,.4,1) .15s both}
.stkpn{font-size:26px;font-weight:700;padding-right:.8em}
.stkpd{font-size:18px;color:var(--muted);padding-right:.8em}
.stkbox .tools{justify-content:center;flex-wrap:wrap}
.stkbox .btn.stkok{background:var(--stk);border-color:var(--stk);color:#fff}
.stksp{position:absolute;font-size:30px;pointer-events:none;animation:stkfly 1.4s ease-out .2s both}
.stksp.s0{left:6%;top:24%}.stksp.s1{right:6%;top:22%;animation-delay:.35s}.stksp.s2{left:4%;top:52%;animation-delay:.5s}
.stksp.s3{right:5%;top:48%;animation-delay:.25s}.stksp.s4{left:6%;top:74%;animation-delay:.6s}.stksp.s5{right:6%;top:72%;animation-delay:.45s}
@keyframes stkin{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}
@keyframes stkspin{0%{opacity:0;transform:scale(.2) rotate(-200deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
@keyframes stkfly{0%{opacity:0;transform:scale(.3)}40%{opacity:1;transform:scale(1.25)}100%{opacity:0;transform:translateY(-26px) scale(.9)}}
@media (prefers-reduced-motion:reduce){.stkbox,.stkpimg,.stksp,.stkc.tap .stkim{animation:none}.stksp{display:none}}
/* 家長專區 */
.pstk img.pse{width:40px;height:40px;border-radius:10px}
.pstkrow{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
.pstkrow img{width:40px;height:40px}
/* 銅銀金鑽石 */
.stkring{position:relative}
.stkring:after{content:"";position:absolute;left:0;top:0;width:100%;height:100%;border-radius:50%;z-index:0;pointer-events:none;-webkit-mask:radial-gradient(circle closest-side,transparent 84%,#000 85%);mask:radial-gradient(circle closest-side,transparent 84%,#000 85%)}
.stkring.t0:after{background:linear-gradient(135deg,#F6C996,#A9612E 50%,#E9A56B)}
.stkring.t1:after{background:linear-gradient(135deg,#FFFFFF,#9AA3B0 50%,#E3E7EE)}
.stkring.t2:after{background:linear-gradient(135deg,#FFEB99,#D29A12 50%,#FFD54A)}
.stkring.t3:after{background:conic-gradient(#7FD8FF,#B28CFF,#FF8DD2,#FFE27A,#8CFFC1,#7FD8FF)}
.stkring > img{z-index:1}
.stkim.stkring .stkimg,.stkpi.stkring .stkpimg{left:10%;top:10%;width:80%;height:80%}
.stkmed{position:absolute;right:-4%;top:-4%;z-index:2;font-size:28px;line-height:1}
.stkmed.t3{animation:stktw 1.8s ease-in-out infinite}
@keyframes stktw{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.2) rotate(12deg)}}
.stklv{display:inline-block;font-size:15px;font-weight:700;border-radius:99px;padding:2px 10px 2px 8px;max-width:100%}
.stklv.t0{background:#F8E1CC;color:#8A4A1E}.stklv.t1{background:#E8ECF1;color:#4F5967}.stklv.t2{background:#FFF0C2;color:#8A6300}.stklv.t3{background:linear-gradient(90deg,#DDF4FF,#F2E5FF,#FFE3F3);color:#6A3FB5}
.stklv.big{font-size:19px;padding:4px 14px 4px 10px}
.stkc.tl3{border-color:#C9A6FF}
.stkthw{position:relative;display:inline-block;width:56px;height:56px;flex:none}
.stkthw > .stkth{position:absolute;left:0;top:0;width:100%;height:100%}
.stkthw.stkring > .stkth{left:11%;top:11%;width:78%;height:78%}
.stknx .stkthw{width:44px;height:44px}
.stkbm{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:18px}
.stkbmi b{margin-left:3px;color:var(--stk)}
.pstkw{position:relative;display:inline-block;width:40px;height:40px}
.pstkw img{position:absolute;left:0;top:0;width:100%;height:100%}
.pstkw.stkring img{left:12%;top:12%;width:76%;height:76%}
@media (prefers-reduced-motion:reduce){.stkmed.t3{animation:none}}

`;
