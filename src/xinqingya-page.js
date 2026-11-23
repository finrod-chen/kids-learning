// 心情芽頁面（/xinqing 小孩每日練習、/xinqing/parent 家長檢視）。
// 外觀跟首頁 D1 page 一致：米色方格紙底、海軍藍粗框卡片、霞鶩文楷、.top/.brand 頁首、.station/.opt/.fb/.btn 元件，深色模式跟系統。
// 使用者跟全站共用：讀首頁的 localStorage「kids.uid」，沒有就回首頁選人。
import { baseHead } from "./base.js";
import { RT_JS } from "./runtime.js";

export default baseHead({ title: "心情芽｜芽芽學堂", icon: "/img/xinqingya-192.webp" }) + `</style></head><body><div class="wrap" id="app"><div class="note">載入中…</div></div>
<script>
${RT_JS}const PARENT = location.pathname === "/xinqing/parent";
const TEMP = [["😌","平靜"],["🙂","還好"],["😕","有點煩"],["😣","很煩"],["😡","快爆炸"]];
const TEMP_TIP = {4:"先停一下：喝口水、深呼吸三次，或去抱抱枕頭。好一點再回來做。",5:"先停一下：喝口水、深呼吸三次，或去抱抱枕頭。好一點再回來做，也可以跟爸爸媽媽說「我現在 5 分」。"};
const TONE = {calm:"冷靜溝通", ok:"可以，但有代價", hard:"可能讓事情更糟"};
const DEEDS = [
  { k: "help", e: "🤝", t: "幫助別人", z: "ㄅㄤ|ㄓㄨˋ|ㄅㄧㄝˊ|ㄖㄣˊ" },
  { k: "praise", e: "👏", t: "讚美別人", z: "ㄗㄢˋ|ㄇㄟˇ|ㄅㄧㄝˊ|ㄖㄣˊ" },
  { k: "care", e: "💗", t: "關心別人", z: "ㄍㄨㄢ|ㄒㄧㄣ|ㄅㄧㄝˊ|ㄖㄣˊ" },
  { k: "look", e: "🌱", t: "照顧別人", z: "ㄓㄠˋ|ㄍㄨˋ|ㄅㄧㄝˊ|ㄖㄣˊ" }];
const CHEER = ["", "做了一件好事，好棒！", "兩件好事，你好溫暖！", "三件好事，太厲害了！", "四件都做到了，你是今天的好事王！"];
let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch (_) {}
const EMBED = new URLSearchParams(location.search).get("embed") === "1";
if (PARENT) { const qu = new URLSearchParams(location.search).get("uid"); if (qu) uid = qu; }
let NICK = "";
function head() { return rtHead("/img/xinqingya-192.webp", PARENT ? "心情芽・家長" : "心情芽", '<a class="chip" href="/"><span aria-hidden="true">←</span>回首頁</a>'); }
const api = async (path, body) => (await apiRaw(path, body)).json();
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
  h += '<div class="foot"><a href="/parent#xinqing">家長檢視</a></div>';
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
  if (EMBED) return parentData();
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
  let h = head() + '<section class="card"><div class="ptitle">' + esc(d.user.nick) + ' 最近 ' + esc(days) + ' 天的心情溫度</div>' + (pts.length ? svg : '<div class="tip">還沒有紀錄。</div>') + '<div class="tip">完成 ' + L.filter(r => r.done).length + ' 天，有紀錄 ' + L.length + ' 天。4 分以上用橘色標示。' + (EMBED ? "" : "要看其他孩子，請回首頁切換使用者。") + '</div><button class="btn" id="csv">下載 CSV（給心理師）</button></section>';
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
