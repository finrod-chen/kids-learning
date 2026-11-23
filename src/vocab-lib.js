// 說說芽的程式（單字頁、ABC 字母、本週列表），從首頁逐字切出。只做了兩處修改：viewHome 拿掉算算/新聞的分支（已獨立成頁），並拿掉底部「家長專區」按鈕（統一從側邊選單進）。不要手改。
export const VOCAB_JS = `function gradeArts(g, week){ return state.articles.filter(a=>a.grade===g && a.week===week && a.kind!=="vocab").sort((a,b)=>a.order-b.order); }
function weeksFor(g){ return [...new Set(state.articles.filter(a=>a.grade===g&&a.kind!=="vocab").map(a=>a.week))].sort().reverse(); }
function artScore(a){
  let done=0, ok=0;
  a.questions.forEach(q=>{ const r = state.answers[q.id]; if(r){ done++; if(r.firstCorrect) ok++; } });
  return {done, ok, total:a.questions.length};
}
function vocabWeeks(g){ return [...new Set(state.articles.filter(a=>a.kind==="vocab"&&a.grade===g).map(a=>a.week))].sort().reverse(); }
function vocabArt(g,w){ return state.articles.find(a=>a.kind==="vocab"&&a.grade===g&&a.week===w); }
function viewVocab(){
  const g = state.grade, ws = vocabWeeks(g);
  if (!ws.length) return \`<div class="note">\${U("vempty")}</div>\`;
  if (!state.vday || !ws.includes(state.vday)) state.vday = ws[0];
  const a = vocabArt(g, state.vday); state.art = a;
  const s = artScore(a);
  const cards = a.words.map((w,i)=>\`<article class="wcard"><div class="whead"><span class="wen en">\${esc(w.w)}</span>\${synth?\`<button class="btn wsay" data-act="sayw" data-i="\${i}" aria-label="聽發音"><span class="ic" aria-hidden="true">🔊</span></button>\`:""}<span class="wpos">\${esc(w.pos)}</span></div>
    <div class="wkk en">[\${esc(w.kk)}]</div>
    <div class="wzh"><span class="lb">\${U("meanLbl")}</span> \${zy(w.zh)}</div>
    <div class="wex"><div class="lb">\${U("exLbl")}</div><div class="wexen en">\${esc(w.ex.en)}\${synth?\` <button class="say" data-act="sayex" data-i="\${i}" aria-label="唸例句">🔊</button>\`:""}</div><div class="wexzh">\${zy(w.ex.zh)}</div></div></article>\`).join("");
  const older = ws.length>1 ? \`<div class="older">\${U("vOlder")}：\${ws.slice(0,7).map(w=>{const x=vocabArt(g,w);return \`<button data-act="vday" data-w="\${w}" aria-pressed="\${w===state.vday}">\${esc(x?x.weekLabel:w)}</button>\`}).join("")}</div>\` : "";
  const stars = s.done===s.total ? \` <span class="stars">\${"★".repeat(s.ok)}</span>\` : "";
  return \`<div><div class="h1">\${U(g)}・\${U("vtoday")}\${stars}</div><div class="weeklbl">\${esc(a.weekLabel)}</div></div>
    <div class="tools">\${synth?\`<button class="btn" data-act="sayall"><span class="ic" aria-hidden="true">🔊</span>\${U("sayAll")}</button>\`:""}</div>
    <div class="wlist">\${cards}</div>
    <div class="tools"><button class="btn primary" data-act="quiz">\${U("quiz")}<span class="ic" aria-hidden="true">→</span></button></div>\${older}\`;
}
const ABC = [{"l":"A","sp":"A.","kk":"e","w":"apple","wk":"ˈæpəl","zh":{"t":"蘋果","z":["ㄆㄧㄥˊ","ㄍㄨㄛˇ"]},"e":"🍎"},{"l":"B","sp":"B.","kk":"bi","w":"banana","wk":"bəˈnænə","zh":{"t":"香蕉","z":["ㄒㄧㄤ","ㄐㄧㄠ"]},"e":"🍌"},{"l":"C","sp":"C.","kk":"si","w":"cat","wk":"kæt","zh":{"t":"貓","z":["ㄇㄠ"]},"e":"🐱"},{"l":"D","sp":"D.","kk":"di","w":"dog","wk":"dɔg","zh":{"t":"狗","z":["ㄍㄡˇ"]},"e":"🐶"},{"l":"E","sp":"E.","kk":"i","w":"egg","wk":"ɛg","zh":{"t":"蛋","z":["ㄉㄢˋ"]},"e":"🥚"},{"l":"F","sp":"F.","kk":"ɛf","w":"fish","wk":"fɪʃ","zh":{"t":"魚","z":["ㄩˊ"]},"e":"🐟"},{"l":"G","sp":"G.","kk":"dʒi","w":"grapes","wk":"greps","zh":{"t":"葡萄","z":["ㄆㄨˊ","ㄊㄠˊ"]},"e":"🍇"},{"l":"H","sp":"H.","kk":"etʃ","w":"hat","wk":"hæt","zh":{"t":"帽子","z":["ㄇㄠˋ","ㄗ˙"]},"e":"🎩"},{"l":"I","sp":"I.","kk":"aɪ","w":"ice cream","wk":"ˈaɪsˌkrim","zh":{"t":"冰淇淋","z":["ㄅㄧㄥ","ㄑㄧˊ","ㄌㄧㄣˊ"]},"e":"🍦"},{"l":"J","sp":"J.","kk":"dʒe","w":"juice","wk":"dʒus","zh":{"t":"果汁","z":["ㄍㄨㄛˇ","ㄓ"]},"e":"🧃"},{"l":"K","sp":"K.","kk":"ke","w":"kite","wk":"kaɪt","zh":{"t":"風箏","z":["ㄈㄥ","ㄓㄥ"]},"e":"🪁"},{"l":"L","sp":"L.","kk":"ɛl","w":"lion","wk":"ˈlaɪən","zh":{"t":"獅子","z":["ㄕ","ㄗ˙"]},"e":"🦁"},{"l":"M","sp":"M.","kk":"ɛm","w":"moon","wk":"mun","zh":{"t":"月亮","z":["ㄩㄝˋ","ㄌㄧㄤˋ"]},"e":"🌙"},{"l":"N","sp":"N.","kk":"ɛn","w":"nose","wk":"noz","zh":{"t":"鼻子","z":["ㄅㄧˊ","ㄗ˙"]},"e":"👃"},{"l":"O","sp":"O.","kk":"o","w":"orange","wk":"ˈɔrɪndʒ","zh":{"t":"柳橙","z":["ㄌㄧㄡˇ","ㄔㄥˊ"]},"e":"🍊"},{"l":"P","sp":"P.","kk":"pi","w":"pig","wk":"pɪg","zh":{"t":"豬","z":["ㄓㄨ"]},"e":"🐷"},{"l":"Q","sp":"Q.","kk":"kju","w":"queen","wk":"kwin","zh":{"t":"女王","z":["ㄋㄩˇ","ㄨㄤˊ"]},"e":"👑"},{"l":"R","sp":"R.","kk":"ɑr","w":"rabbit","wk":"ˈræbɪt","zh":{"t":"兔子","z":["ㄊㄨˋ","ㄗ˙"]},"e":"🐰"},{"l":"S","sp":"S.","kk":"ɛs","w":"sun","wk":"sʌn","zh":{"t":"太陽","z":["ㄊㄞˋ","ㄧㄤˊ"]},"e":"☀️"},{"l":"T","sp":"T.","kk":"ti","w":"tiger","wk":"ˈtaɪgɚ","zh":{"t":"老虎","z":["ㄌㄠˇ","ㄏㄨˇ"]},"e":"🐯"},{"l":"U","sp":"U.","kk":"ju","w":"umbrella","wk":"ʌmˈbrɛlə","zh":{"t":"雨傘","z":["ㄩˇ","ㄙㄢˇ"]},"e":"☂️"},{"l":"V","sp":"V.","kk":"vi","w":"violin","wk":"ˌvaɪəˈlɪn","zh":{"t":"小提琴","z":["ㄒㄧㄠˇ","ㄊㄧˊ","ㄑㄧㄣˊ"]},"e":"🎻"},{"l":"W","sp":"W.","kk":"ˈdʌblˌju","w":"watch","wk":"wɑtʃ","zh":{"t":"手錶","z":["ㄕㄡˇ","ㄅㄧㄠˇ"]},"e":"⌚"},{"l":"X","sp":"X.","kk":"ɛks","w":"fox","wk":"fɑks","zh":{"t":"狐狸","z":["ㄏㄨˊ","ㄌㄧˊ"]},"e":"🦊"},{"l":"Y","sp":"Y.","kk":"waɪ","w":"yo-yo","wk":"ˈjojo","zh":{"t":"溜溜球","z":["ㄌㄧㄡ","ㄌㄧㄡ","ㄑㄧㄡˊ"]},"e":"🪀"},{"l":"Z","sp":"Z.","kk":"zi","w":"zebra","wk":"ˈzibrə","zh":{"t":"斑馬","z":["ㄅㄢ","ㄇㄚˇ"]},"e":"🦓"}];
function wordHTML(w){ const f=esc(w.charAt(0)), r=esc(w.slice(1)); return \`<span class="wf">\${f}</span>\${r}\`; }
function viewAbc(){
  const i = state.abcI||0, c = ABC[i], A = UI.abcUI;
  const sp = synth ? \`<button class="btn wsay" data-act="abcsay" aria-label="聽字母"><span class="ic" aria-hidden="true">🔊</span></button>\` : "";
  const sw = synth ? \`<button class="btn wsay" data-act="abcsayw" aria-label="聽單字"><span class="ic" aria-hidden="true">🔊</span></button>\` : "";
  const tiles = ABC.map((x,k)=>\`<button class="atile \${k===i?"on":""}" data-act="abcpick" data-i="\${k}" aria-pressed="\${k===i}" aria-label="\${x.l}"><span class="en">\${x.l}<span class="lo2">\${x.l.toLowerCase()}</span></span></button>\`).join("");
  return \`<div><div class="h1">\${zy(A.abcT)}</div></div>
  <div class="tools">\${synth?\`<button class="btn" data-act="abcall"><span class="ic" aria-hidden="true">🔊</span>\${zy(A.abcAll)}</button>\`:""}</div>
  <div class="apanel">
    <div class="aletter"><div class="abig en"><span>\${c.l}</span><span class="lo">\${c.l.toLowerCase()}</span></div><div class="akk en">[\${esc(c.kk)}]</div>\${sp}</div>
    <div class="aword"><div class="aemo" aria-hidden="true">\${c.e}</div><div class="awen en">\${wordHTML(c.w)}</div><div class="akk en">[\${esc(c.wk)}]</div><div class="azh">\${zy(c.zh)}</div>\${sw}</div>
  </div>
  <div class="agrid">\${tiles}</div>\`;
}
function viewHome(){
  const card = g => {
    const vocab = state.station==="vocab";
    const w = vocab ? vocabWeeks(g)[0] : weeksFor(g)[0]; const arts = w ? (vocab ? [vocabArt(g,w)] : gradeArts(g,w)) : [];
    const dots = arts.map(a=>{ const s=artScore(a); return \`<span class="dot \${s.done===s.total?'on':''}"></span>\`; }).join("");
    return \`<button class="grade \${g}" data-act="grade" data-g="\${g}"><span class="big">\${U(g)}</span><span class="sub">\${arts.length? U(vocab?"vtoday":"week") : U(vocab?"vempty":"empty")}</span><span class="dots" aria-label="\${arts.filter(a=>{const s=artScore(a);return s.done===s.total}).length} 篇做完">\${dots}</span></button>\`;
  };
  let note = "";
  if (state.loadError) note = \`<div class="note">連不上網路，請檢查 Wi‑Fi 後重新整理。</div>\`;
  const abcCard = state.station==="vocab" ? \`<button class="abccard" data-act="abc"><span class="abcbig">Aa</span><span class="abctx"><span class="big">\${zy(UI.abcUI.abcSt)}</span><span class="sub">\${zy(UI.abcUI.abcSubA)}<br>\${zy(UI.abcUI.abcSubB)}</span></span></button>\` : "";
  return \`<div class="grades">\${card(state.user.grade)}</div>\${abcCard}\${note}\`;
}
const _wVocab=viewVocab;
viewVocab=function(){const t=_wVocab();if(!HOL)return t;const e='<div class="tools"><button class="btn primary" data-act="quiz">';return t.indexOf(e)>=0?t.replace(e,holWords()+e):t+holWords()};
`;
