// 小測驗與結算畫面（說說芽、之後讀讀芽共用），從首頁逐字切出，不要手改。
export const QUIZ_JS = `async function saveAnswer(a, q, choice){
  const now = new Date().toISOString(); const correct = choice===q.answer; const prev = state.answers[q.id];
  state.answers[q.id] = prev ? {...prev, lastChoice:choice, lastCorrect:correct, tries:(prev.tries||1)+1, lastAt:now}
                             : {qid:q.id, articleId:a.id, week:a.week, grade:a.grade, firstChoice:choice, firstCorrect:correct, lastChoice:choice, lastCorrect:correct, tries:1, firstAt:now, lastAt:now};
  try {
    const r = await fetch("/api/answers", {method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({uid:state.user&&state.user.id, qid:q.id, choice})});
    if (r.ok) { const row = await r.json(); state.answers[q.id] = row; }
  } catch(e) { console.warn("save failed"); }
}
function sizeTools(){ return \`<button class="btn" data-act="size" data-d="-4" aria-label="字小一點"><span class="ic">A−</span></button><button class="btn" data-act="size" data-d="4" aria-label="字大一點"><span class="ic">A+</span></button>\`; }
function gameBtn(a){ return (a.chars&&a.chars.length>=3) ? \`<button class="btn" data-act="game"><span class="ic" aria-hidden="true">🎯</span>\${U("game")}</button>\` : ""; }
function viewQuiz(){
  const a = state.art, q = a.questions[state.qi], n = a.questions.length, picked = state.picked;
  const prog = a.questions.map((_,i)=>\`<i class="\${i<=state.qi?'on':''}"></i>\`).join("");
  const opts = q.options.map(o=>{
    let cls = "opt", mk = "";
    if (picked) { if (o.k===q.answer){ cls+=" right"; mk = markSVG(true);} if (o.k===picked && picked!==q.answer){ cls+=" picked wrongpick"; mk = markSVG(false);} }
    return \`<button class="\${cls}" data-act="pick" data-k="\${o.k}" \${picked?'disabled':''}><span class="k">\${o.k}</span><span class="v">\${zy(o)}</span>\${mk}</button>\`;
  }).join("");
  let fb = "";
  if (picked) {
    const ok = picked===q.answer;
    fb = \`<div class="fb"><div class="head \${ok?'ok':''}">\${ok?U("right"):U("wrong")}</div>\${ok?'':\`<div>\${U("correctIs")} \${q.answer}</div>\`}<div>\${zy(q.explain)}</div></div>
          <div class="tools"><button class="btn primary" data-act="nextq">\${state.qi<n-1?U("next"):U("result")}<span class="ic" aria-hidden="true">→</span></button></div>\`;
  }
  const say = (synth && a.kind!=="vocab") ? \`<button class="btn" data-act="sayq"><span class="ic" aria-hidden="true">🔊</span>\${U("listenQ")}</button>\` : "";
  return \`<div class="prog">\${prog}<span>\${state.qi+1}/\${n}</span></div>
    <div class="tools">\${say}\${sizeTools()}</div>
    <div class="sheet"><div class="q">\${zy(q.q)}</div><div class="opts">\${opts}</div></div>\${fb}\`;
}
function viewDone(){
  const a = state.art, n = a.questions.length;
  const ok = a.questions.filter(q=>state.session[q.id]===q.answer).length;
  const msg = ok===n ? "great" : (ok>=Math.ceil(n*0.6) ? "good" : "keep");
  const stars = Array.from({length:n},(_,i)=>\`<span class="\${i<ok?'':'off'}">★</span>\`).join("");
  return \`<div class="sheet"><div class="score"><div class="ttl">\${U("done")}</div><div class="bigstars" aria-label="答對 \${ok} 題">\${stars}</div><div class="n">\${ok} / \${n}</div><div class="h1">\${U(msg)}</div></div></div>
    \${a.extra?\`<div class="extra"><div class="lbl">\${zy(a.extra.label)}</div><div>\${zy(a.extra.text)}</div></div>\`:""}
    <div class="tools"><button class="btn primary" data-act="\${a.kind==="vocab"?"vback":"grade"}" data-g="\${a.grade}">\${U(a.kind==="vocab"?"backW":"back")}</button><button class="btn" data-act="again">\${U("again")}</button>\${gameBtn(a)}</div>\`;
}
`;
