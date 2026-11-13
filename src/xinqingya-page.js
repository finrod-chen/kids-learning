// 心情芽頁面（/xinqing 小孩每日練習、/xinqing/parent 家長檢視）。
// 外觀跟首頁 D1 page 一致：米色方格紙底、海軍藍粗框卡片、霞鶩文楷、.top/.brand 頁首、.station/.opt/.fb/.btn 元件，深色模式跟系統。
// 使用者跟全站共用：讀首頁的 localStorage「kids.uid」，沒有就回首頁選人。
export default `<!doctype html><html lang="zh-Hant-TW"><head><meta charset="utf-8"><title>心情芽｜芽芽學堂</title>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="芽芽學堂">
<meta name="theme-color" content="#F8F4E6">
<link rel="icon" type="image/webp" href="/img/xinqingya-192.webp"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@400;700&display=swap" media="print" onload="this.media='all'">
<style>
*{box-sizing:border-box}[hidden]{display:none!important}
:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);
  --paper:#F8F4E6;--grid:rgba(38,57,107,.065);--card:#FFFDF6;--ink:#22305A;--muted:#5E6A8A;--line:#E3DCC4;--navy:#26396B;
  --g3:#2A8760;--g3-soft:#DCF1E5;--g1:#D4701C;--g1-soft:#FCE7D0;--red:#D13A2F;--pencil:#E9B422;--focus:#2F7FBF;
  --acc:#3F8F3A;--acc-soft:#E2F2DD;
  --font:"LXGW WenKai TC","Kaiti TC","BiauKai","DFKai-SB","PingFang TC","Noto Sans TC",serif;
  --ui:"PingFang TC","Noto Sans TC","Microsoft JhengHei",system-ui,sans-serif}
@media (prefers-color-scheme: dark){:root{--paper:#18213A;--grid:rgba(160,180,235,.06);--card:#222D4C;--ink:#EDEFF7;--muted:#A7B1CE;--line:#34416A;--navy:#A9BCF0;
  --g3:#7FD1A6;--g3-soft:#1F3A33;--g1:#F5A355;--g1-soft:#3D2E22;--red:#FF7A6E;--pencil:#F5CB4A;--focus:#7AA7FF;--acc:#9BCB8C;--acc-soft:#24341F;color-scheme:dark}}
html,body{height:100%}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--font);font-size:14px;
  background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);
  background-size:44px 44px;background-attachment:fixed;-webkit-tap-highlight-color:transparent}
.wrap{max-width:860px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:20px 48px;display:flex;flex-direction:column;gap:20px}
button{font:inherit;color:inherit;cursor:pointer;border:0;background:none}
button:focus-visible,a:focus-visible{outline:3px solid var(--focus);outline-offset:3px;border-radius:14px}
.top{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:24px;color:var(--navy);letter-spacing:.04em;margin-right:auto}
.blogo{width:44px;height:44px;border-radius:12px;flex:none;box-shadow:0 2px 0 rgba(38,57,107,.15)}
.chip{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;background:var(--card);border:2px solid var(--navy);font-size:22px;min-height:52px;text-decoration:none;color:inherit}
.chip:active{transform:scale(.97)}
.who{display:inline-flex;align-items:center;gap:10px;font-size:20px}
.wav{width:34px;height:34px;border-radius:50%;background:var(--g3);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:18px}
.hello{font-size:34px;font-weight:700;text-wrap:balance}
.card{background:var(--card);border:3px solid var(--navy);border-radius:28px;padding:22px 24px;display:flex;flex-direction:column;gap:14px;box-shadow:0 7px 0 var(--acc);min-width:0}
.step{display:inline-flex;align-self:flex-start;font-size:18px;padding:6px 14px;border-radius:14px;background:var(--acc-soft);color:var(--acc);font-weight:700}
.q{font-size:30px;font-weight:700;line-height:1.4}
.story{font-size:26px;line-height:1.6}
.temps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
.temps button{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 4px;border-radius:20px;background:var(--card);border:2px solid var(--line);font-size:18px;min-height:110px}
.temps button .e{font-size:40px;line-height:1.1}.temps button .n{font-family:"Nunito","Avenir Next",var(--ui);font-weight:700;font-size:22px;color:var(--acc)}
.temps button.on{border:3px solid var(--navy);background:var(--acc-soft);box-shadow:0 4px 0 var(--acc)}
.temps button:active,.opt:active,.btn:active{transform:scale(.97)}
.opts{display:grid;gap:14px}
.opt{display:flex;align-items:center;gap:16px;width:100%;text-align:left;background:var(--card);border:2px solid var(--line);border-radius:20px;padding:16px 18px;font-size:26px;min-height:78px;overflow-wrap:anywhere}
.opt .k{flex:none;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:var(--acc-soft);color:var(--acc);font-family:var(--ui);font-weight:700;font-size:22px}
.opt .v{flex:1;min-width:0}
.opt.on{border:3px solid var(--navy);background:var(--acc-soft)}
.opt.on .k{background:var(--acc);color:var(--card)}
.fb{display:flex;flex-direction:column;gap:10px;padding:18px 20px;border-radius:20px;background:var(--acc-soft);font-size:24px;line-height:1.55}
.fb .head{font-weight:700;font-size:1.1em;color:var(--acc)}
.fb.hard{background:var(--g1-soft)}.fb.hard .head{color:var(--g1)}
.fb .tip,.tip{font-family:var(--ui);font-size:16px;color:var(--muted);line-height:1.5}
.done{align-items:center;text-align:center}
.done .big{font-size:40px;font-weight:700;color:var(--acc)}
.done img{width:120px;height:120px;border-radius:22%}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;align-self:flex-start;padding:12px 22px;border-radius:18px;background:var(--acc);border:2px solid var(--navy);box-shadow:0 3px 0 var(--navy);color:var(--card);font-size:22px;min-height:56px}
.note{font-family:var(--ui);font-size:15px;color:var(--muted);background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px}
.note a{color:var(--navy)}
.foot{display:flex;justify-content:center;margin-top:8px}
.foot a{font-family:var(--ui);font-size:14px;color:var(--muted);padding:8px 12px;text-underline-offset:3px}
.ptitle{font-size:26px;font-weight:700}
.chart{width:100%;height:auto}
.tbl{width:100%;border-collapse:collapse;font-family:var(--ui);font-size:15px}
.tbl td,.tbl th{border-bottom:1px solid var(--line);padding:8px 6px;text-align:left;vertical-align:top}
.tbl th{color:var(--muted);font-weight:600}
.tag{font-family:var(--ui);font-size:13px;color:var(--muted)}
@media (max-width:600px){.brand{font-size:19px}.blogo{width:36px;height:36px;border-radius:10px}.chip{font-size:18px;min-height:44px;padding:6px 12px}
  .hello{font-size:28px}.card{padding:18px 16px;border-radius:24px}.q{font-size:24px}.story{font-size:21px}
  .temps{gap:6px}.temps button{min-height:92px;font-size:14px;padding:8px 2px;border-radius:16px}.temps button .e{font-size:32px}
  .opt{font-size:21px;gap:12px;padding:12px;min-height:64px}.opt .k{width:38px;height:38px;font-size:19px}.fb{font-size:19px;padding:14px 16px}.btn{font-size:19px;min-height:50px}}
/* 注音：跟首頁同一套（字＋右側直排注音） */
:root{--zy:.36em}
.c{display:inline-flex;align-items:center;vertical-align:middle;margin-right:.1em}
.h{line-height:1}
.b{position:relative;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;font-size:var(--zy);line-height:1.02;width:1.15em;margin-left:.04em;font-family:var(--ui);font-weight:400}
.b .s{display:block}.b .nt{display:block;line-height:.6}
.b .tn{position:absolute;left:86%;line-height:1;font-size:1.35em;font-weight:700}
.b.n1 .tn{top:50%;transform:translateY(-55%)}.b.n2 .tn{top:50%;transform:translateY(-50%)}.b.n3 .tn{top:66%;transform:translateY(-50%)}
.pu{display:inline-block;vertical-align:middle;line-height:1}
.u{white-space:nowrap}
.zt{display:inline;line-height:2.3}
/* 好事打勾 */
.deeds{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.deed{display:flex;align-items:center;gap:12px;width:100%;min-width:0;text-align:left;background:var(--card);border:2px solid var(--line);border-radius:20px;padding:12px 14px;font-size:26px;min-height:84px}
.deed .e{flex:none;font-size:36px;line-height:1}
.deed .v{flex:1;min-width:0;overflow-wrap:anywhere}
.deed .bx{flex:none;width:40px;height:40px;border-radius:12px;border:3px solid var(--line);display:grid;place-items:center;font-family:var(--ui);font-weight:700;font-size:24px;color:transparent;background:var(--card)}
.deed.on{border:3px solid var(--navy);background:var(--acc-soft)}
.deed.on .bx{background:var(--acc);border-color:var(--acc);color:var(--card)}
.deed:active{transform:scale(.97)}
.cheer{font-size:24px;font-weight:700;color:var(--acc);text-align:center}
.dsum{display:flex;flex-wrap:wrap;gap:10px}
.dsum span{font-family:var(--ui);font-size:16px;padding:8px 12px;border-radius:14px;background:var(--acc-soft);color:var(--ink)}
.dsum b{color:var(--acc)}
.tbl td.ck,.tbl th.ck{text-align:center}
.tbl td.ck{color:var(--acc);font-weight:700}
@media (max-width:600px){.deeds{grid-template-columns:minmax(0,1fr);gap:10px}.deed{font-size:22px;min-height:68px;padding:10px 12px}.deed .e{font-size:30px}.deed .bx{width:34px;height:34px;font-size:20px}.cheer{font-size:20px}}
.pgate{display:flex;flex-direction:column;gap:18px;align-items:stretch}
.pgate .lock{font-family:var(--ui);font-size:22px;text-align:center;color:var(--muted)}
.hq{text-align:center;font-size:30px}
.pdots{display:flex;gap:14px;justify-content:center;margin:6px 0}
.pdot{width:20px;height:20px;border-radius:50%;border:3px solid var(--navy,#26396B);background:var(--card)}
.pdot.on{background:var(--navy,#26396B)}
.pinerr{text-align:center;color:var(--red);font-size:22px}
.pinpad{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:340px;width:100%;margin:0 auto}
.pk{min-height:72px;font-size:34px;font-weight:700;color:var(--ink);background:var(--card);border:3px solid var(--navy,#26396B);border-radius:20px;box-shadow:0 4px 0 var(--line);font-family:var(--ui);cursor:pointer}
.pk:active{transform:translateY(3px);box-shadow:0 1px 0 var(--line)}
@media (max-width:600px){.hq{font-size:24px}}
</style></head><body><div class="wrap" id="app"><div class="note">載入中…</div></div>
<script>
const $ = s => document.querySelector(s), app = $("#app");
const PARENT = location.pathname === "/xinqing/parent";
const TEMP = [["😌","平靜"],["🙂","還好"],["😕","有點煩"],["😣","很煩"],["😡","快爆炸"]];
const TEMP_TIP = {4:"先停一下：喝口水、深呼吸三次，或去抱抱枕頭。好一點再回來做。",5:"先停一下：喝口水、深呼吸三次，或去抱抱枕頭。好一點再回來做，也可以跟爸爸媽媽說「我現在 5 分」。"};
const TONE = {calm:"冷靜溝通", ok:"可以，但有代價", hard:"可能讓事情更糟"};
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* 注音（跟首頁 zy() 同樣的 HTML 結構） */
const TONES = "ˊˇˋ";
function zyChar(ch, z) {
  if (!z) return '<span class="pu">' + esc(ch) + '</span>';
  const neutral = z.includes("˙"); let s = z.replace("˙", ""), tone = "";
  if (TONES.includes(s.slice(-1))) { tone = s.slice(-1); s = s.slice(0, -1); }
  const syms = [...s], n = Math.min(3, Math.max(1, syms.length));
  return '<span class="c"><span class="h">' + esc(ch) + '</span><span class="b n' + n + '" aria-hidden="true">' + (neutral ? '<span class="nt">˙</span>' : "") + syms.map(x => '<span class="s">' + x + '</span>').join("") + (tone ? '<span class="tn">' + tone + '</span>' : "") + '</span></span>';
}
function zy(t, z) {
  const zs = z.split("|"), units = [];
  [...t].forEach((c, i) => { if (!zs[i] && units.length) units[units.length - 1] += zyChar(c, ""); else units.push(zyChar(c, zs[i])); });
  return '<span class="zt" lang="zh-TW">' + units.map(u => '<span class="u">' + u + '</span>').join("") + '</span>';
}
const DEEDS = [
  { k: "help", e: "🤝", t: "幫助別人", z: "ㄅㄤ|ㄓㄨˋ|ㄅㄧㄝˊ|ㄖㄣˊ" },
  { k: "praise", e: "👏", t: "讚美別人", z: "ㄗㄢˋ|ㄇㄟˇ|ㄅㄧㄝˊ|ㄖㄣˊ" },
  { k: "care", e: "💗", t: "關心別人", z: "ㄍㄨㄢ|ㄒㄧㄣ|ㄅㄧㄝˊ|ㄖㄣˊ" },
  { k: "look", e: "🌱", t: "照顧別人", z: "ㄓㄠˋ|ㄍㄨˋ|ㄅㄧㄝˊ|ㄖㄣˊ" }];
const CHEER = ["", "做了一件好事，好棒！", "兩件好事，你好溫暖！", "三件好事，太厲害了！", "四件都做到了，你是今天的好事王！"];
let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch (_) {}
let NICK = "";
function head() {
  const who = NICK ? '<span class="who"><span class="wav" aria-hidden="true">' + esc([...NICK][0] || "") + '</span>' + esc(NICK) + '</span>' : "";
  return '<div class="top"><div class="brand"><img class="blogo" src="/img/xinqingya-192.webp" alt="" width="44" height="44"><span>' + (PARENT ? "心情芽・家長" : "心情芽") + '</span></div>' + who + '<a class="chip" href="/"><span aria-hidden="true">←</span>回首頁</a></div>';
}
function noteOnly(msg) { app.innerHTML = head() + '<div class="note">' + msg + '</div>'; }
async function api(path, body) {
  const r = await fetch(path, body ? { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) } : {});
  if (r.status === 401) { noteOnly('請先回<a href="/">首頁</a>解鎖，再進來喔。'); throw 0; }
  return r.json();
}
function needUser() { noteOnly('請先在<a href="/">首頁</a>選好是誰在練習，再點心情芽。'); }
let S = null;
async function kid() {
  S = await api("/api/xq/today?uid=" + encodeURIComponent(uid));
  if (S.error) return needUser();
  if (S.user && S.user.nick) NICK = S.user.nick;
  render();
}
function render() {
  let h = head() + '<div class="hello">今天心情怎麼樣？</div>';
  h += '<section class="card"><span class="step">第 1 步</span><div class="q">你現在的心情幾度？</div><div class="temps">' + TEMP.map((t, i) => '<button data-t="' + (i + 1) + '" class="' + (S.temp === i + 1 ? "on" : "") + '"><span class="e" aria-hidden="true">' + t[0] + '</span><span class="n">' + (i + 1) + '</span>' + t[1] + '</button>').join("") + '</div>' + (TEMP_TIP[S.temp] ? '<div class="fb hard">' + TEMP_TIP[S.temp] + '</div>' : "") + '</section>';
  if (S.temp != null) S.items.forEach((sc, n) => {
    const a = S.answers[sc.id], emo = sc.type === "emotion";
    h += '<section class="card"><span class="step">第 ' + (n + 2) + ' 步・' + (emo ? "猜猜他怎麼了" : "你會怎麼做") + '</span><div class="story">' + esc(sc.story) + '</div><div class="q">' + esc(sc.question) + '</div><div class="opts">';
    sc.options.forEach(o => { h += '<button class="opt ' + (a && a.c === o.k ? "on" : "") + '" data-s="' + esc(sc.id) + '" data-k="' + esc(o.k) + '"><span class="k">' + esc(o.k) + '</span><span class="v">' + esc(o.t) + '</span></button>'; });
    h += '</div>';
    if (a) {
      if (emo) { const ok = sc.good.includes(a.c); h += '<div class="fb' + (ok ? "" : " hard") + '"><span class="head">' + (ok ? "你看得很仔細！" : "再看看線索喔") + '</span>' + (ok ? "" : "比較可能是「" + esc(sc.options.find(o => o.k === sc.good[0]).t) + "」。") + esc(sc.why) + '</div>'; }
      else { const o = sc.options.find(o => o.k === a.c); h += '<div class="fb' + (o.tone === "hard" ? " hard" : "") + '"><span class="head">' + TONE[o.tone] + '</span>' + esc(o.why) + '<span class="tip">想一想：其他選項，別人會有什麼感覺？可以再點點看。</span></div>'; }
    }
    h += '</section>';
  });
  if (S.done) h += '<section class="card done"><img src="/img/xinqingya-512.webp" alt="" width="120" height="120"><span class="big">今天的心情芽完成了！</span><span class="tip">明天再來練習新的情境。</span></section>';
  const dz = S.deeds || [];
  h += '<section class="card"><span class="step">今天的好事</span><div class="q">' + zy("今天做到哪些好事？", "ㄐㄧㄣ|ㄊㄧㄢ|ㄗㄨㄛˋ|ㄉㄠˋ|ㄋㄚˇ|ㄒㄧㄝ|ㄏㄠˇ|ㄕˋ|") + '</div><div class="deeds">' + DEEDS.map(d => '<button class="deed' + (dz.includes(d.k) ? " on" : "") + '" data-d="' + d.k + '" aria-pressed="' + dz.includes(d.k) + '" aria-label="' + d.t + '"><span class="e" aria-hidden="true">' + d.e + '</span><span class="v">' + zy(d.t, d.z) + '</span><span class="bx" aria-hidden="true">✓</span></button>').join("") + '</div>' + (dz.length ? '<div class="cheer">' + CHEER[dz.length] + '</div>' : '<span class="tip">有做到的就點一下，點錯了再點一次可以取消。</span>') + '</section>';
  h += '<div class="foot"><a href="/xinqing/parent">家長檢視</a></div>';
  app.innerHTML = h;
  app.querySelectorAll(".deed").forEach(b => b.onclick = async () => {
    const k = b.dataset.d, prev = S.deeds || [], on = !prev.includes(k);
    S.deeds = on ? DEEDS.map(d => d.k).filter(x => x === k || prev.includes(x)) : prev.filter(x => x !== k); render();
    try { const r = await api("/api/xq/deed", { uid, k, on }); if (r.error) throw 0; S.deeds = r.deeds; } catch (_) { S.deeds = prev; }
    render();
  });
  app.querySelectorAll(".temps button").forEach(b => b.onclick = async () => { S = { ...S, ...(await api("/api/xq/temp", { uid, temp: +b.dataset.t })) }; render(); });
  app.querySelectorAll(".opt").forEach(b => b.onclick = async () => {
    const r = await api("/api/xq/answer", { uid, sid: b.dataset.s, choice: b.dataset.k });
    if (r.error) return; S = { ...S, ...r }; render();
  });
}
/* 家長閘：跟首頁家長專區一樣，每次進來都要輸入網站 6 位數密碼 */
let G = { d: "", err: "", busy: false };
function gate() {
  const msg = { bad: "密碼不對，請再試一次", lock: "輸錯太多次了，請 5 分鐘後再試", net: "連不上網路，請再試一次" };
  const keys = ["1","2","3","4","5","6","7","8","9","C","0","B"].map(k => '<button class="pk" data-v="' + k + '" aria-label="' + (k === "C" ? "清除" : k === "B" ? "倒退" : k) + '">' + (k === "B" ? "⌫" : k === "C" ? "清除" : k) + '</button>').join("");
  app.innerHTML = head() + '<div class="pgate"><div class="lock">🔒 家長專區</div><div class="hello hq">請爸爸媽媽輸入密碼</div><div class="pdots" aria-hidden="true">' + Array.from({ length: 6 }, (_, i) => '<span class="pdot' + (i < G.d.length ? " on" : "") + '"></span>').join("") + '</div>' + (G.err ? '<div class="note pinerr">' + msg[G.err] + '</div>' : "") + '<div class="pinpad">' + keys + '</div></div>';
  app.querySelectorAll(".pk").forEach(b => b.onclick = () => gateKey(b.dataset.v));
}
function gateKey(v) {
  if (G.busy) return;
  if (v === "C") G.d = ""; else if (v === "B") G.d = G.d.slice(0, -1); else if (/^[0-9]$/.test(v) && G.d.length < 6) G.d += v;
  G.err = ""; gate();
  if (G.d.length === 6) gateGo();
}
async function gateGo() {
  G.busy = true;
  try {
    const r = await fetch("/api/xq/parent", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pin: G.d }) });
    if (r.ok) { G = { d: "", err: "", busy: false }; return parentData(); }
    if (r.status === 401 && (await r.clone().json().catch(() => ({}))).error === "locked") { noteOnly('請先回<a href="/">首頁</a>解鎖，再進來喔。'); return; }
    G.err = r.status === 429 ? "lock" : "bad";
  } catch (_) { G.err = "net"; }
  G.d = ""; G.busy = false; gate();
}
async function parent() {
  try { await fetch("/api/xq/parent/lock", { method: "POST" }); } catch (_) {}
  gate();
}
async function parentData() {
  const days = new URLSearchParams(location.search).get("days") || 30;
  const r = await fetch("/api/xq/log?uid=" + encodeURIComponent(uid) + "&days=" + days);
  if (r.status === 403) return gate();
  if (r.status === 401) return noteOnly('請先回<a href="/">首頁</a>解鎖，再進來喔。');
  const d = await r.json();
  if (d.error) return needUser();
  NICK = d.user.nick;
  const cs = getComputedStyle(document.documentElement), C = k => cs.getPropertyValue(k).trim();
  const L = d.log, pts = L.filter(r => r.temp != null);
  const W = 600, Hh = 170, x = i => 28 + i * (W - 48) / Math.max(1, pts.length - 1), y = t => Hh - 20 - (t - 1) * (Hh - 40) / 4;
  let svg = '<svg class="chart" viewBox="0 0 ' + W + ' ' + Hh + '">' + [1,2,3,4,5].map(t => '<line x1="28" x2="' + (W - 20) + '" y1="' + y(t) + '" y2="' + y(t) + '" stroke="' + C("--line") + '"/><text x="6" y="' + (y(t) + 5) + '" font-size="14" fill="' + C("--muted") + '">' + t + '</text>').join("");
  if (pts.length) svg += '<polyline fill="none" stroke="' + C("--acc") + '" stroke-width="3" stroke-linejoin="round" points="' + pts.map((r, i) => x(i) + "," + y(r.temp)).join(" ") + '"/>' + pts.map((r, i) => '<circle cx="' + x(i) + '" cy="' + y(r.temp) + '" r="5" fill="' + (r.temp >= 4 ? C("--g1") : C("--acc")) + '"/>').join("");
  svg += '</svg>';
  const rows = [];
  L.forEach(r => Object.entries(r.answers).forEach(([sid, a]) => { const sc = d.scenarios[sid] || {}; const o = (sc.options || []).find(o => o.k === a.c) || {}; const f = (sc.options || []).find(o => o.k === a.first) || {};
    rows.push({ day: r.day, temp: r.temp ?? "", type: sc.type === "emotion" ? "猜心情" : "衝突", story: sc.story || sid, first: f.t || a.first, last: o.t || a.c, judge: sc.type === "emotion" ? ((sc.good || []).includes(a.first) ? "第一次就看懂" : "需要提示") : (TONE[f.tone] || ""), tries: a.tries }); }));
  const fmt = s => s.slice(0, 4) + "/" + s.slice(4, 6) + "/" + s.slice(6);
  let h = head() + '<section class="card"><div class="ptitle">' + esc(d.user.nick) + ' 最近 ' + esc(days) + ' 天的心情溫度</div>' + (pts.length ? svg : '<div class="tip">還沒有紀錄。</div>') + '<div class="tip">完成 ' + L.filter(r => r.done).length + ' 天，有紀錄 ' + L.length + ' 天。4 分以上用橘色標示。要看其他孩子，請回首頁切換使用者。</div><button class="btn" id="csv">下載 CSV（給心理師）</button></section>';
  h += '<section class="card"><div class="ptitle">作答紀錄</div>' + (rows.length ? '<div style="overflow-x:auto"><table class="tbl"><tr><th>日期</th><th>溫度</th><th>題目</th><th>第一次選</th><th>判讀</th></tr>' + rows.slice().reverse().map(r => '<tr><td>' + fmt(r.day) + '</td><td>' + r.temp + '</td><td>' + esc(r.type) + '：' + esc(r.story) + '</td><td>' + esc(r.first) + (r.tries > 1 ? '<br><span class="tag">後來改選：' + esc(r.last) + '</span>' : "") + '</td><td>' + esc(r.judge) + '</td></tr>').join("") + '</table></div>' : '<div class="tip">還沒有作答。</div>') + '</section>';
  const DD = d.deeds || {}, ddays = Object.keys(DD).sort().reverse();
  const cnt = k => ddays.filter(x => DD[x].includes(k)).length;
  h += '<section class="card"><div class="ptitle">好事紀錄</div><div class="dsum">' + DEEDS.map(x => '<span>' + x.e + ' ' + x.t + ' <b>' + cnt(x.k) + '</b> 天</span>').join("") + '</div>' + (ddays.length ? '<div style="overflow-x:auto"><table class="tbl"><tr><th>日期</th>' + DEEDS.map(x => '<th class="ck">' + x.t.slice(0, 2) + '</th>').join("") + '<th class="ck">件數</th></tr>' + ddays.map(day => '<tr><td>' + fmt(day) + '</td>' + DEEDS.map(x => '<td class="ck">' + (DD[day].includes(x.k) ? "✓" : "") + '</td>').join("") + '<td class="ck">' + DD[day].length + '</td></tr>').join("") + '</table></div>' : '<div class="tip">最近 ' + esc(days) + ' 天還沒有勾選好事。</div>') + '</section>';
  h += '<div class="foot"><a href="/xinqing">回心情芽練習</a></div>';
  app.innerHTML = h;
  $("#csv").onclick = () => {
    const q = v => '"' + String(v).replace(/"/g, '""') + '"';
    const hd = ["日期","溫度","類型","情境","第一次選","最後選","判讀","次數", ...DEEDS.map(x => x.t), "好事件數"];
    const days0 = L.filter(r => !Object.keys(r.answers).length).map(r => ({ day: r.day, temp: r.temp ?? "", type: "", story: "", first: "", last: "", judge: "", tries: "" }));
    const seen = new Set(L.map(r => r.day));
    const days1 = ddays.filter(day => !seen.has(day)).map(day => ({ day, temp: "", type: "", story: "", first: "", last: "", judge: "", tries: "" }));
    const all = [...rows, ...days0, ...days1].sort((a, b) => a.day.localeCompare(b.day));
    const dc = day => { const a = DD[day] || []; return [...DEEDS.map(x => a.includes(x.k) ? 1 : 0), a.length]; };
    const csv = "\\ufeff" + [hd, ...all.map(r => [fmt(r.day), r.temp, r.type, r.story, r.first, r.last, r.judge, r.tries, ...dc(r.day)])].map(a => a.map(q).join(",")).join("\\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = "心情芽-" + d.user.nick + ".csv"; a.click();
  };
}
function start() { return uid ? (PARENT ? parent() : kid()) : needUser(); }
start().catch(() => {});
</script></body></html>`;
