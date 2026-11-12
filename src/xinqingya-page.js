// 心情芽頁面（/xinqing 小孩每日練習、/xinqing/parent 家長檢視）。
// 樣式先用全站底色 #F8F4E6 與系統字型；變數集中在 :root，方便對齊首頁的共用樣式。
export default `<!DOCTYPE html>
<html lang="zh-Hant-TW"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>心情芽</title><link rel="icon" href="/img/xinqingya-192.webp"><link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#F8F4E6">
<style>
:root{--bg:#F8F4E6;--card:#fff;--ink:#3b3a36;--sub:#7a766c;--line:#e6dfcc;--accent:#5a8f4e;--soft:#eef4e8;--warn:#c9704f;--r:16px}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:18px/1.6 system-ui,-apple-system,"PingFang TC","Noto Sans TC",sans-serif}
main{max-width:640px;margin:0 auto;padding:16px 16px 48px}
header{display:flex;align-items:center;gap:10px;margin-bottom:12px}header img{width:44px;height:44px;border-radius:12px}
header h1{font-size:22px;margin:0;flex:1}a.back{color:var(--sub);text-decoration:none;font-size:15px}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:16px;margin:12px 0}
.step{font-size:14px;color:var(--sub);margin-bottom:4px}
h2{font-size:19px;margin:0 0 8px}
.temps{display:flex;gap:8px;justify-content:space-between}
.temps button{flex:1;padding:10px 0;border-radius:12px;border:2px solid var(--line);background:#fff;font-size:15px;cursor:pointer}
.temps button b{display:block;font-size:26px}
.temps button.on{border-color:var(--accent);background:var(--soft)}
.opt{display:block;width:100%;text-align:left;margin:8px 0;padding:12px 14px;border-radius:12px;border:2px solid var(--line);background:#fff;font-size:17px;cursor:pointer}
.opt.on{border-color:var(--accent);background:var(--soft)}
.why{margin-top:10px;padding:12px;border-radius:12px;background:var(--soft);font-size:16px}
.why.hard{background:#fbeee8}.tag{font-size:13px;color:var(--sub)}
.done{text-align:center;font-size:20px}.btn{padding:10px 18px;border-radius:12px;border:0;background:var(--accent);color:#fff;font-size:16px;cursor:pointer}
.users button{margin:6px;padding:12px 20px;border-radius:12px;border:2px solid var(--line);background:#fff;font-size:18px}
table{width:100%;border-collapse:collapse;font-size:14px}td,th{border-bottom:1px solid var(--line);padding:6px 4px;text-align:left;vertical-align:top}
.tip{font-size:15px;color:var(--sub)}
</style></head><body><main id="app">載入中…</main>
<script>
const $ = s => document.querySelector(s), app = $("#app");
const PARENT = location.pathname === "/xinqing/parent";
const TEMP = [["😌","平靜"],["🙂","還好"],["😕","有點煩"],["😣","很煩"],["😡","快爆炸"]];
const TEMP_TIP = {4:"先停一下：喝口水、深呼吸三次，或去抱抱枕頭。好一點再回來做。",5:"先停一下：喝口水、深呼吸三次，或去抱抱枕頭。好一點再回來做，也可以跟爸爸媽媽說「我現在 5 分」。"};
const TONE = {calm:"冷靜溝通", ok:"可以，但有代價", hard:"可能讓事情更糟"};
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
async function api(path, body) {
  const r = await fetch(path, body ? { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) } : {});
  if (r.status === 401) { app.innerHTML = '<div class="card">請先回首頁解鎖，再進來喔。<br><br><a href="/">回首頁</a></div>'; throw 0; }
  return r.json();
}
function head(title) { return '<header><img src="/img/xinqingya-192.webp" alt=""><h1>' + title + '</h1><a class="back" href="/">回首頁</a></header>'; }
let uid = new URLSearchParams(location.search).get("uid") || localStorage.getItem("xq-uid");
async function pickUser() {
  const us = await api("/api/users");
  app.innerHTML = head(PARENT ? "心情芽・家長" : "心情芽") + '<div class="card"><h2>是誰要來練習呢？</h2><div class="users">' + us.map(u => '<button data-id="' + esc(u.id) + '">' + esc(u.nick) + '</button>').join("") + '</div></div>';
  app.querySelectorAll(".users button").forEach(b => b.onclick = () => { uid = b.dataset.id; localStorage.setItem("xq-uid", uid); start(); });
}
let S = null;
async function kid() {
  S = await api("/api/xq/today?uid=" + encodeURIComponent(uid));
  if (S.error) { localStorage.removeItem("xq-uid"); return pickUser(); }
  render();
}
function render() {
  let h = head("心情芽");
  h += '<div class="card"><div class="step">第 1 步</div><h2>你現在的心情幾度？</h2><div class="temps">' + TEMP.map((t, i) => '<button data-t="' + (i + 1) + '" class="' + (S.temp === i + 1 ? "on" : "") + '"><b>' + t[0] + '</b>' + (i + 1) + ' ' + t[1] + '</button>').join("") + '</div>' + (TEMP_TIP[S.temp] ? '<div class="why">' + TEMP_TIP[S.temp] + '</div>' : "") + '</div>';
  if (S.temp != null) S.items.forEach((sc, n) => {
    const a = S.answers[sc.id], emo = sc.type === "emotion";
    h += '<div class="card"><div class="step">第 ' + (n + 2) + ' 步・' + (emo ? "猜猜他怎麼了" : "你會怎麼做") + '</div><p>' + esc(sc.story) + '</p><h2>' + esc(sc.question) + '</h2>';
    sc.options.forEach(o => { h += '<button class="opt ' + (a && a.c === o.k ? "on" : "") + '" data-s="' + sc.id + '" data-k="' + o.k + '">' + o.k + '. ' + esc(o.t) + '</button>'; });
    if (a) {
      if (emo) { const ok = sc.good.includes(a.c); h += '<div class="why">' + (ok ? "你看得很仔細！" : "再看看線索喔，比較可能是「" + esc(sc.options.find(o => o.k === sc.good[0]).t) + "」。") + "<br>" + esc(sc.why) + '</div>'; }
      else { const o = sc.options.find(o => o.k === a.c); h += '<div class="why ' + (o.tone === "hard" ? "hard" : "") + '"><span class="tag">' + TONE[o.tone] + '</span><br>' + esc(o.why) + '<br><span class="tip">想一想：其他選項，別人會有什麼感覺？可以再點點看。</span></div>'; }
    }
    h += '</div>';
  });
  if (S.done) h += '<div class="card done">🌱 今天的心情芽完成了！<br><span class="tip">明天再來練習新的情境。</span></div>';
  app.innerHTML = h;
  app.querySelectorAll(".temps button").forEach(b => b.onclick = async () => { S = { ...S, ...(await api("/api/xq/temp", { uid, temp: +b.dataset.t })) }; render(); });
  app.querySelectorAll(".opt").forEach(b => b.onclick = async () => {
    const r = await api("/api/xq/answer", { uid, sid: b.dataset.s, choice: b.dataset.k });
    if (r.error) return; S = { ...S, ...r }; render();
  });
}
async function parent() {
  const days = new URLSearchParams(location.search).get("days") || 30;
  const d = await api("/api/xq/log?uid=" + encodeURIComponent(uid) + "&days=" + days);
  if (d.error) { localStorage.removeItem("xq-uid"); return pickUser(); }
  const L = d.log, pts = L.filter(r => r.temp != null);
  const W = 600, Hh = 160, x = i => 20 + i * (W - 40) / Math.max(1, pts.length - 1), y = t => Hh - 20 - (t - 1) * (Hh - 40) / 4;
  let svg = '<svg viewBox="0 0 ' + W + ' ' + Hh + '" width="100%">' + [1,2,3,4,5].map(t => '<line x1="20" x2="' + (W - 20) + '" y1="' + y(t) + '" y2="' + y(t) + '" stroke="#eee"/><text x="2" y="' + (y(t) + 4) + '" font-size="11" fill="#999">' + t + '</text>').join("");
  if (pts.length) svg += '<polyline fill="none" stroke="#5a8f4e" stroke-width="2" points="' + pts.map((r, i) => x(i) + "," + y(r.temp)).join(" ") + '"/>' + pts.map((r, i) => '<circle cx="' + x(i) + '" cy="' + y(r.temp) + '" r="4" fill="' + (r.temp >= 4 ? "#c9704f" : "#5a8f4e") + '"/>').join("");
  svg += '</svg>';
  const rows = [];
  L.forEach(r => Object.entries(r.answers).forEach(([sid, a]) => { const sc = d.scenarios[sid] || {}; const o = (sc.options || []).find(o => o.k === a.c) || {}; const f = (sc.options || []).find(o => o.k === a.first) || {};
    rows.push({ day: r.day, temp: r.temp ?? "", type: sc.type === "emotion" ? "猜心情" : "衝突", story: sc.story || sid, first: f.t || a.first, last: o.t || a.c, judge: sc.type === "emotion" ? (sc.good.includes(a.first) ? "第一次就看懂" : "需要提示") : (TONE[f.tone] || ""), tries: a.tries }); }));
  const fmt = s => s.slice(0, 4) + "/" + s.slice(4, 6) + "/" + s.slice(6);
  let h = head("心情芽・家長檢視") + '<div class="card"><h2>' + esc(d.user.nick) + ' 最近 ' + days + ' 天的心情溫度</h2>' + (pts.length ? svg : '<p class="tip">還沒有紀錄。</p>') + '<p class="tip">完成天數：' + L.filter(r => r.done).length + ' / 有紀錄 ' + L.length + ' 天。4 分以上用橘色標示。</p><button class="btn" id="csv">下載 CSV（給心理師）</button></div>';
  h += '<div class="card"><h2>作答紀錄</h2><table><tr><th>日期</th><th>溫度</th><th>題目</th><th>第一次選</th><th>判讀</th></tr>' + rows.slice().reverse().map(r => '<tr><td>' + fmt(r.day) + '</td><td>' + r.temp + '</td><td>' + esc(r.type) + '：' + esc(r.story) + '</td><td>' + esc(r.first) + (r.tries > 1 ? '<br><span class="tag">後來改選：' + esc(r.last) + '</span>' : "") + '</td><td>' + esc(r.judge) + '</td></tr>').join("") + '</table></div>';
  app.innerHTML = h;
  $("#csv").onclick = () => {
    const q = v => '"' + String(v).replace(/"/g, '""') + '"';
    const head = ["日期","溫度","類型","情境","第一次選","最後選","判讀","次數"];
    const days0 = L.filter(r => !Object.keys(r.answers).length).map(r => ({ day: r.day, temp: r.temp ?? "", type: "", story: "", first: "", last: "", judge: "", tries: "" }));
    const all = [...rows, ...days0].sort((a, b) => a.day.localeCompare(b.day));
    const csv = "\\ufeff" + [head, ...all.map(r => [fmt(r.day), r.temp, r.type, r.story, r.first, r.last, r.judge, r.tries])].map(a => a.map(q).join(",")).join("\\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = "心情芽-" + d.user.nick + ".csv"; a.click();
  };
}
function start() { return uid ? (PARENT ? parent() : kid()) : pickUser(); }
start().catch(() => {});
</script></body></html>`;
