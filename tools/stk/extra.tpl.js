(function(){
  SD.list.push.apply(SD.list, __ITEMS__);
  STK_CATS.push("lf","lp","bs");
  function xOf(){ const x = state.stkX, u = state.user; return x && u && x.uid===u.id ? x : null; }
  const _live = stkLive;
  stkLive = function(){
    const r = _live(), x = xOf(), days = {};
    r.L.lf = {}; r.L.lp = {}; r.L.bs = {};
    if (x && x.life) Object.keys(x.life).forEach(id=>{
      const e = x.life[id]; if (!e || typeof e!=="object" || !/^[a-z]\d$/.test(id)) return;
      const d = /^\d{8}$/.test(e.at||"") ? e.at : stkToday();
      r.L.lf[id] = d; days[d] = 1;
      if (e.n>0 && e.ok>=e.n) r.L.lp[id] = d;
      if (id.charAt(0)==="b") r.L.bs[id] = d;
    });
    r.days = r.days.concat(Object.keys(days));
    return r;
  };
  const _vals = stkVals;
  stkVals = function(st){
    const v = _vals(st), x = xOf() || {};
    const set = (id, n) => { if (v[id]) v[id] = {x:n, show:n}; };
    set("caring", x.cr||0); set("sunshine", x.cs?1:0); set("moodlog", x.mo||0); set("chatter", x.ct||0);
    return v;
  };
  const _books = stkBooks;
  stkBooks = function(){ _books(); stkExtra(); };
  function stkExtra(){
    const u = state.user; if (!u) return;
    state.stkX = Object.assign({}, xOf() || {}, {uid:u.id, at:Date.now()});
    fetch("/api/stk/extra?uid="+encodeURIComponent(u.id), {cache:"no-store"}).then(r=>r.ok?r.json():null).then(j=>{
      if (!j || !state.user || state.user.id!==u.id) return;
      const was = JSON.stringify(xOf() || {}).replace(/"at":\d+,?/,"");
      state.stkX = Object.assign({uid:u.id, at:Date.now()}, j);
      if (JSON.stringify(state.stkX).replace(/"at":\d+,?/,"")!==was) { stkCheck(); if (state.view==="hub"||state.view==="stk") render(); }
    }).catch(()=>{});
  }
})();
