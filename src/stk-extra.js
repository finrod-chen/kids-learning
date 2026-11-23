// 貼貼芽的新站成就（生活、照顧、心情、聊聊）。由 tools/stk/build.py 產生，注音由 pypinyin 產生。
export const STK_EXTRA_JS = `(function(){
  SD.list.push.apply(SD.list, [{"id":"lifepro","name":{"t":"生活小達人","z":["ㄕㄥ","ㄏㄨㄛˊ","ㄒㄧㄠˇ","ㄉㄚˊ","ㄖㄣˊ"]},"desc":{"t":"學完4個生活芽單元","z":["ㄒㄩㄝˊ","ㄨㄢˊ","","ㄍㄜˋ","ㄕㄥ","ㄏㄨㄛˊ","ㄧㄚˊ","ㄉㄢ","ㄩㄢˊ"]},"cat":"lf","goal":4,"tiers":[4,8,12,16],"dp":{"t":"學完生活芽","z":["ㄒㄩㄝˊ","ㄨㄢˊ","ㄕㄥ","ㄏㄨㄛˊ","ㄧㄚˊ"]},"ds":{"t":"個單元","z":["ㄍㄜˋ","ㄉㄢ","ㄩㄢˊ"]}},{"id":"bodyguard","name":{"t":"護身小勇士","z":["ㄏㄨˋ","ㄕㄣ","ㄒㄧㄠˇ","ㄩㄥˇ","ㄕˋ"]},"desc":{"t":"學完身體界線4個單元","z":["ㄒㄩㄝˊ","ㄨㄢˊ","ㄕㄣ","ㄊㄧˇ","ㄐㄧㄝˋ","ㄒㄧㄢˋ","","ㄍㄜˋ","ㄉㄢ","ㄩㄢˊ"]},"cat":"bs","goal":4},{"id":"lifequiz","name":{"t":"小測驗滿分王","z":["ㄒㄧㄠˇ","ㄘㄜˋ","ㄧㄢˋ","ㄇㄢˇ","ㄈㄣ","ㄨㄤˊ"]},"desc":{"t":"生活芽小測驗拿3次滿分","z":["ㄕㄥ","ㄏㄨㄛˊ","ㄧㄚˊ","ㄒㄧㄠˇ","ㄘㄜˋ","ㄧㄢˋ","ㄋㄚˊ","","ㄘˋ","ㄇㄢˇ","ㄈㄣ"]},"cat":"lp","goal":3,"tiers":[3,6,10,16],"dp":{"t":"生活芽小測驗拿","z":["ㄕㄥ","ㄏㄨㄛˊ","ㄧㄚˊ","ㄒㄧㄠˇ","ㄘㄜˋ","ㄧㄢˋ","ㄋㄚˊ"]},"ds":{"t":"次滿分","z":["ㄘˋ","ㄇㄢˇ","ㄈㄣ"]}},{"id":"caring","name":{"t":"暖心小天使","z":["ㄋㄨㄢˇ","ㄒㄧㄣ","ㄒㄧㄠˇ","ㄊㄧㄢ","ㄕˇ"]},"desc":{"t":"照顧芽幫了家人5次","z":["ㄓㄠˋ","ㄍㄨˋ","ㄧㄚˊ","ㄅㄤ","ㄌㄜ˙","ㄐㄧㄚ","ㄖㄣˊ","","ㄘˋ"]},"cat":"cr","goal":5,"tiers":[5,20,50,100],"dp":{"t":"照顧芽幫了家人","z":["ㄓㄠˋ","ㄍㄨˋ","ㄧㄚˊ","ㄅㄤ","ㄌㄜ˙","ㄐㄧㄚ","ㄖㄣˊ"]},"ds":{"t":"次","z":["ㄘˋ"]}},{"id":"sunshine","name":{"t":"貼心小太陽","z":["ㄊㄧㄝ","ㄒㄧㄣ","ㄒㄧㄠˇ","ㄊㄞˋ","ㄧㄤˊ"]},"desc":{"t":"每一位家人都幫過","z":["ㄇㄟˇ","ㄧ","ㄨㄟˋ","ㄐㄧㄚ","ㄖㄣˊ","ㄉㄡ","ㄅㄤ","ㄍㄨㄛˋ"]},"cat":"cs","goal":1},{"id":"moodlog","name":{"t":"心情記錄員","z":["ㄒㄧㄣ","ㄑㄧㄥˊ","ㄐㄧˋ","ㄌㄨˋ","ㄩㄢˊ"]},"desc":{"t":"心情芽記錄7天","z":["ㄒㄧㄣ","ㄑㄧㄥˊ","ㄧㄚˊ","ㄐㄧˋ","ㄌㄨˋ","","ㄊㄧㄢ"]},"cat":"mo","goal":7,"tiers":[7,14,30,60],"dp":{"t":"心情芽記錄","z":["ㄒㄧㄣ","ㄑㄧㄥˊ","ㄧㄚˊ","ㄐㄧˋ","ㄌㄨˋ"]},"ds":{"t":"天","z":["ㄊㄧㄢ"]}},{"id":"chatter","name":{"t":"小小聊天家","z":["ㄒㄧㄠˇ","ㄒㄧㄠˇ","ㄌㄧㄠˊ","ㄊㄧㄢ","ㄐㄧㄚ"]},"desc":{"t":"聊聊芽聊了5次","z":["ㄌㄧㄠˊ","ㄌㄧㄠˊ","ㄧㄚˊ","ㄌㄧㄠˊ","ㄌㄜ˙","","ㄘˋ"]},"cat":"ct","goal":5,"tiers":[5,20,50,100],"dp":{"t":"聊聊芽聊了","z":["ㄌㄧㄠˊ","ㄌㄧㄠˊ","ㄧㄚˊ","ㄌㄧㄠˊ","ㄌㄜ˙"]},"ds":{"t":"次","z":["ㄘˋ"]}}]);
  STK_CATS.push("lf","lp","bs");
  function xOf(){ const x = state.stkX, u = state.user; return x && u && x.uid===u.id ? x : null; }
  const _live = stkLive;
  stkLive = function(){
    const r = _live(), x = xOf(), days = {};
    r.L.lf = {}; r.L.lp = {}; r.L.bs = {};
    if (x && x.life) Object.keys(x.life).forEach(id=>{
      const e = x.life[id]; if (!e || typeof e!=="object" || !/^[a-z]\\d$/.test(id)) return;
      const d = /^\\d{8}$/.test(e.at||"") ? e.at : stkToday();
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
      const was = JSON.stringify(xOf() || {}).replace(/"at":\\d+,?/,"");
      state.stkX = Object.assign({uid:u.id, at:Date.now()}, j);
      if (JSON.stringify(state.stkX).replace(/"at":\\d+,?/,"")!==was) { stkCheck(); if (state.view==="hub"||state.view==="stk") render(); }
    }).catch(()=>{});
  }
})();
`;
