// 讀讀芽的程式（本週文章列表、閱讀、特色生字與筆順、生字小遊戲），從首頁逐字切出，不要手改。
export const READ_JS = `function tagKey(a){ return a.kind==="sci" ? "tag_sci" : (a.tag==="童詩" ? "tag_poem" : (a.tag==="故事" ? "tag_story" : "tag_lit")); }
function viewGrade(){
  const g = state.grade; const weeks = weeksFor(g);
  if (!state.week || !weeks.includes(state.week)) state.week = weeks[0];
  const arts = state.week ? gradeArts(g, state.week) : [];
  const list = arts.map(a=>{
    const s = artScore(a);
    const st = s.done===s.total ? \`<span class="stars" aria-label="答對 \${s.ok} 題">\${"★".repeat(s.ok)}</span><br>\${s.ok}/\${s.total}\` : (s.done ? \`\${s.done}/\${s.total}\` : U("unread"));
    return \`<button class="art" data-act="read" data-id="\${a.id}"><span class="tag">\${U(tagKey(a))}</span><span class="t">\${zy(a.title)}</span><span class="st">\${st}</span></button>\`;
  }).join("");
  const label = arts[0] ? arts[0].weekLabel : "";
  const older = weeks.length>1 ? \`<div class="older">\${U("older")}：\${weeks.slice(0,7).map(w=>{const a=state.articles.find(x=>x.week===w);return \`<button data-act="week" data-w="\${w}" aria-pressed="\${w===state.week}">\${esc(a?a.weekLabel:w)}</button>\`}).join("")}</div>\` : "";
  return \`<div><div class="h1">\${U(g)}・\${U("week")}</div><div class="weeklbl">\${esc(label)}</div></div><div class="arts">\${list || \`<div class="note">\${U("empty")}</div>\`}</div>\${older}\`;
}
function viewRead(){
  const a = state.art;
  const paras = a.paras.map((p,i)=>\`<p class="para \${a.lines?'poem':''}" data-p="\${i}">\${zy(p)}\${synth?\`<button class="say" data-act="sayp" data-i="\${i}" aria-label="唸這一段">🔊</button>\`:''}</p>\`).join("");
  const listen = synth ? \`<button class="btn" data-act="listen" id="listenBtn"><span class="ic" aria-hidden="true">🔊</span>\${U(state.speaking?"stop":"listen")}</button>\` : "";
  return \`<div class="tools">\${listen}\${sizeTools()}</div>
  <article class="sheet reader"><div class="ttl">\${zy(a.title)}</div>\${paras}</article>
  \${charsSection(a)}
  <div class="tools"><button class="btn primary" data-act="quiz">\${U("quiz")}<span class="ic" aria-hidden="true">→</span></button>\${gameBtn(a)}</div>\`;
}
function charsSection(a){
  const cs = a.chars; if (!cs || !cs.length) return "";
  const tiles = cs.map((c,i)=>\`<button class="ctile \${state.ci===i?'on':''}" data-act="char" data-i="\${i}" aria-pressed="\${state.ci===i}" aria-label="生字 \${esc(c.c)}">\${zyChar(c.c,c.z)}</button>\`).join("");
  let panel = \`<div class="note">\${U("tapChar")}</div>\`;
  if (state.ci!=null && cs[state.ci]) {
    const c = cs[state.ci];
    panel = \`<div class="cpanel"><div class="sbox" id="sbox" aria-label="\${esc(c.c)}的筆順">\${esc(c.c)}</div>
      <div class="cinfo">
        <div class="crow"><span class="lb">\${U("radical")}</span>\${esc(c.r)}</div>
        <div class="crow"><span class="lb">\${U("strokes")}</span>\${c.s} \${U("hua")}</div>
        <div class="crow"><span class="lb">\${U("word")}</span>\${zy(c.w,c.c)}</div>
        <div class="crow"><span class="lb">\${U("tip")}</span></div><div>\${zy(c.tip,c.c)}</div>
        <div class="tools">\${synth?\`<button class="btn" data-act="sayc"><span class="ic" aria-hidden="true">🔊</span>\${U("sayChar")}</button>\`:''}</div>
      </div>
      <div class="sstrip" id="sstrip"><div class="crow"><span class="lb">\${U("order")}</span></div><div class="scells" id="scells"></div></div></div>\`;
  }
  return \`<section class="chars"><div class="h1">⭐ \${U("chars")}</div><div class="ctiles">\${tiles}</div>\${panel}</section>\`;
}
function drawStrip(c){
  const ch = c.c;
  loadStrokes(ch).then(data=>{
    const el = document.getElementById("scells");
    if (!el || !state.art.chars || !state.art.chars[state.ci] || state.art.chars[state.ci].c!==ch) return;
    el.innerHTML = stripHTML(data);
  }).catch(()=>{ const t = document.getElementById("sstrip"); if (t) t.remove(); });
}
function viewGame(){
  const a = state.art, cs = a.chars, n = state.gorder.length;
  if (state.gi >= n) {
    const ok = state.gok, msg = ok===n ? "great" : (ok>=Math.ceil(n*0.6) ? "good" : "keep");
    const stars = Array.from({length:n},(_,i)=>\`<span class="\${i<ok?'':'off'}">★</span>\`).join("");
    return \`<div class="sheet"><div class="score"><div class="ttl">\${U("gameDone")}</div><div class="bigstars" aria-label="答對 \${ok} 個">\${stars}</div><div class="n">\${ok} / \${n}</div><div class="h1">\${U(msg)}</div></div></div>
      <div class="tools"><button class="btn primary" data-act="back">\${U("backRead")}</button><button class="btn" data-act="game">\${U("playAgain")}</button></div>\`;
  }
  const c = cs[state.gorder[state.gi]], picked = state.gpick;
  const prog = state.gorder.map((_,i)=>\`<i class="\${i<=state.gi?'on':''}"></i>\`).join("");
  const opts = [...cs].sort((x,y)=> x.c<y.c?-1:1).map(o=>{
    let cls="gopt", mk="";
    if (picked) { if (o.c===c.c){ cls+=" right"; mk=markSVG(true);} if (o.c===picked && picked!==c.c){ mk=markSVG(false);} }
    return \`<button class="\${cls}" data-act="gpick" data-c="\${esc(o.c)}" \${picked?'disabled':''}>\${esc(o.c)}\${mk}</button>\`;
  }).join("");
  let fb = "";
  if (picked) {
    const ok = picked===c.c;
    fb = \`<div class="fb"><div class="head \${ok?'ok':''}">\${ok?U("right"):U("wrong")}</div>\${ok?'':\`<div>\${U("correctIs")} <span class="ctile" style="display:inline-flex;font-size:44px;min-width:0">\${zyChar(c.c,c.z)}</span></div>\`}<div>\${zy(c.tip,c.c)}</div></div>
      <div class="tools"><button class="btn primary" data-act="gnext">\${U("nextc")}<span class="ic" aria-hidden="true">→</span></button></div>\`;
  }
  const say = synth ? \`<button class="btn" data-act="sayg"><span class="ic" aria-hidden="true">🔊</span>\${U("sayChar")}</button>\` : "";
  const idx = c.w.t.indexOf(c.c);
  return \`<div class="prog">\${prog}<span>\${state.gi+1}/\${n}</span></div>
    <div class="tools">\${say}</div>
    <div class="sheet"><div class="q">\${U("gameQ")}</div><div class="gword">\${zy(c.w,null,idx)}</div><div class="gopts">\${opts}</div></div>\${fb}\`;
}
`;
