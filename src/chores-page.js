// 家事芽頁面（/chores）：孩子勾選今天做的家事、看一週表、用點數兌換獎勵。
// 從首頁 SPA 搬出來的獨立頁面；資料沿用 /api/chores（清單）與 /api/state（chores、chpts、chrw、chbank）。
// 家長設定（開關家事、點數、獎勵、兌換紀錄）暫時還在首頁，之後搬到 /parent 的分頁。
import { baseHead } from "./base.js";
import { RT_JS } from "./runtime.js";

const base = baseHead({ title: "家事芽｜芽芽學堂", icon: "/img/chores-32.png", iconType: "image/png" });

const CSS = `
:root{--acc:#1C8C86;--acc-soft:#D7F0EE}
@media (prefers-color-scheme: dark){:root{--acc:#6FD3CD;--acc-soft:#1E3B39}}
.h1{font-size:34px;font-weight:700;text-wrap:balance}
.chlist{display:grid;gap:12px;margin:12px 0}
.chcard{font:inherit;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:14px;width:100%;min-width:0;text-align:left;background:var(--card);color:var(--ink);border:3px solid var(--line);border-left:10px solid var(--acc);border-radius:22px;padding:14px 18px;box-shadow:0 4px 0 var(--acc-soft);cursor:pointer}
.chcard.on{background:var(--acc-soft);border-color:var(--acc)}
.chcard:active{transform:scale(.99)}
.che{font-size:44px;line-height:1}
.chn{font-size:32px;font-weight:700;overflow-wrap:anywhere}
.chk{width:48px;height:48px;border-radius:50%;border:4px solid var(--acc);display:grid;place-items:center;font-size:30px;font-weight:700;font-family:var(--ui)}
.chcard.on .chk{background:var(--acc);color:var(--card)}
.chcheer{font-size:30px;font-weight:700;color:var(--acc);text-align:center;margin:8px 0}
.chwk{font-size:28px;font-weight:700;color:var(--acc);margin:22px 0 8px}
.chgrid{display:grid;grid-template-columns:minmax(0,1.9fr) repeat(7,minmax(0,1fr));gap:6px;align-items:center}
.chg-h{display:flex;flex-direction:column;align-items:center;font-family:var(--ui);font-size:15px;color:var(--muted);line-height:1.2}
.chg-h b{font-size:20px;color:var(--ink)}
.chg-h.today b{color:var(--acc)}
.chg-l{display:flex;align-items:center;gap:6px;font-size:22px;min-width:0}
.chg-n{overflow-wrap:anywhere;font-size:20px}
.chg-c{font:inherit;min-width:0;width:100%;aspect-ratio:1/1;max-height:54px;border-radius:12px;border:2px solid var(--line);background:var(--card);color:var(--card);font-size:24px;font-weight:700;padding:0;display:grid;place-items:center;cursor:pointer}
.chg-c.on{background:var(--acc);border-color:var(--acc)}
.chg-c.today{border-color:var(--acc);border-width:3px}
.chg-c:disabled{opacity:.35;cursor:default}
.chnote,.chbad{font-size:22px}
.chbad{color:var(--red)}
.chboard{background:var(--card);border:3px solid var(--line);border-left:10px solid var(--acc);border-radius:22px;padding:16px 18px;margin:20px 0;display:grid;gap:14px;box-shadow:0 4px 0 var(--acc-soft)}
.chbh{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.chbt{font-size:30px;font-weight:700;color:var(--acc)}
.chbal{font-size:24px;color:var(--muted)}
.chbal b{font-family:var(--ui);font-size:2em;color:var(--acc);margin-right:.2em}
.chrw{display:grid;gap:10px;padding:12px;border:2px solid var(--line);border-radius:18px}
.chrw.ok{border-color:var(--acc);background:var(--acc-soft)}
.chrh{display:flex;align-items:center;gap:10px}
.chrh .che{font-size:36px}
.chrh .chn{font-size:28px;min-width:0}
.chp{margin-left:auto;font-family:var(--ui);font-weight:700;color:var(--acc);font-size:24px;white-space:nowrap}
.chdots{display:flex;flex-wrap:wrap;gap:6px}
.chdot{width:26px;height:26px;border-radius:50%;border:3px solid var(--acc);box-sizing:border-box}
.chdot.on{background:var(--acc)}
.chbar{height:16px;border-radius:99px;background:var(--line);overflow:hidden}
.chbar i{display:block;height:100%;background:var(--acc)}
.chpt{font-family:var(--ui);font-size:.55em;color:var(--acc);margin-left:10px;white-space:nowrap}
.chmsg{font-size:26px;font-weight:700;color:var(--acc);text-align:center}
.chrw .btn:disabled{opacity:.45}
@media (max-width:600px){.h1{font-size:28px}.chcard{padding:10px 14px;gap:10px}.che{font-size:36px}.chn{font-size:28px}.chk{width:40px;height:40px;font-size:24px}.chg-n{display:none}.chgrid{grid-template-columns:34px repeat(7,minmax(0,1fr));gap:4px}}
`;

const BODY = `</style></head><body><div class="wrap" id="app"><div class="note">載入中…</div></div>
<script>
__RT__const UI = {
  q: ["今天做了哪些家事？", ["ㄐㄧㄣ","ㄊㄧㄢ","ㄗㄨㄛˋ","ㄌㄜ˙","ㄋㄚˇ","ㄒㄧㄝ","ㄐㄧㄚ","ㄕˋ",""]],
  week: ["這個星期", ["ㄓㄜˋ","ㄍㄜˋ","ㄒㄧㄥ","ㄑㄧ"]],
  all: ["今天的家事都做完了，你好棒！", ["ㄐㄧㄣ","ㄊㄧㄢ","ㄉㄜ˙","ㄐㄧㄚ","ㄕˋ","ㄉㄡ","ㄗㄨㄛˋ","ㄨㄢˊ","ㄌㄜ˙","","ㄋㄧˇ","ㄏㄠˇ","ㄅㄤˋ",""]],
  empty: ["還沒有家事，請爸爸媽媽新增", ["ㄏㄞˊ","ㄇㄟˊ","ㄧㄡˇ","ㄐㄧㄚ","ㄕˋ","","ㄑㄧㄥˇ","ㄅㄚˋ","ㄅㄚ˙","ㄇㄚ","ㄇㄚ˙","ㄒㄧㄣ","ㄗㄥ"]],
  card: ["集點卡", ["ㄐㄧˊ","ㄉㄧㄢˇ","ㄎㄚˇ"]]
};
const zu = k => Z(UI[k][0], UI[k][1]);
const CERR = { save: "沒有存成功，請再試一次", load: "家事清單打不開，請檢查網路後重新整理" };
const WD = "日一二三四五六";
let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch (_) {}
let NICK = "";
const S = { list: null, chores: {}, chpts: {}, chrw: [], chbank: { e: 0, s: 0, h: [] }, err: "", conf: "", msg: "" };
const chToday = () => new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 10).replace(/-/g, "");
function chWeek() {
  const t = new Date(Date.now() + 8 * 3600000); t.setUTCHours(0, 0, 0, 0);
  const s = t.getTime() - t.getUTCDay() * 86400000;
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(s + i * 86400000); return { k: d.toISOString().slice(0, 10).replace(/-/g, ""), m: d.getUTCMonth() + 1, d: d.getUTCDate(), i: i }; });
}
const pts = id => { const v = S.chpts[id]; return Number.isInteger(v) && v >= 0 ? v : 1; };
const bal = () => Math.max(0, (S.chbank.e || 0) - (S.chbank.s || 0));
const nz = (o) => { const t = o.t, z = o.z; return z && z.length ? zy(t, z.join("|")) : esc(t); };
function head() { return rtHead("/img/chores.webp", "家事芽", '<a class="chip" href="/"><span aria-hidden="true">🏠</span>首頁</a>'); }
function needUser() { noteOnly('請先在<a href="/">首頁</a>選好是誰在用，再點家事芽。'); }
const api = (path, body) => apiRaw(path, body, true);
async function load() {
  try {
    const u = await (await api("/api/users")).json();
    const me = u.find(x => x.id === uid);
    if (!me) return needUser();
    NICK = me.nick;
    const [rl, rs] = await Promise.all([api("/api/chores"), api("/api/state?uid=" + encodeURIComponent(uid))]);
    if (!rl.ok || !rs.ok) throw 1;
    S.list = await rl.json();
    const j = await rs.json();
    S.chores = j.chores || {}; S.chpts = j.chpts || {}; S.chrw = Array.isArray(j.chrw) ? j.chrw : []; S.chbank = j.chbank || { e: 0, s: 0, h: [] };
  } catch (e) { if (e === 0) return; S.list = []; S.err = "load"; }
  render();
}
function board() {
  const b = bal();
  const cards = S.chrw.map(x => {
    const ok = b >= x.p, n = Math.min(b, x.p), conf = S.conf === x.id;
    const prog = x.p <= 20
      ? '<div class="chdots">' + Array.from({ length: x.p }, (_, i) => '<span class="chdot' + (i < n ? " on" : "") + '"></span>').join("") + '</div>'
      : '<div class="chbar"><i style="width:' + Math.round(n / x.p * 100) + '%"></i></div>';
    return '<div class="chrw' + (ok ? " ok" : "") + '"><div class="chrh"><span class="che">' + esc(x.e) + '</span><span class="chn">' + esc(x.t) + '</span><span class="chp">' + x.p + ' 點</span></div>' + prog +
      '<button class="btn" data-rw="' + esc(x.id) + '"' + (ok ? "" : " disabled") + '>' + (conf ? "確定兌換？再按一次" : "兌換") + '</button></div>';
  }).join("");
  const msg = S.msg ? '<div class="chmsg" role="status">' + esc(S.msg) + '</div>' : "";
  return '<div class="chboard"><div class="chbh"><span class="chbt">⭐ ' + zu("card") + '</span><span class="chbal"><b>' + b + '</b>點</span></div>' + msg +
    (cards || '<div class="chnote">還沒有獎勵，請爸爸媽媽到「家長設定」新增</div>') + '</div>';
}
function render() {
  let h = head();
  if (S.list === null) { app.innerHTML = h + '<div class="note">載入中…</div>'; return; }
  const err = S.err ? '<div class="note chbad" role="alert">' + esc(CERR[S.err] || CERR.save) + '</div>' : "";
  const L = S.list.filter(x => x.on !== false);
  if (!L.length) { app.innerHTML = h + '<div class="note">' + zu("empty") + '</div>' + err; return; }
  const wk = chWeek(), today = chToday(), M = S.chores, dn = M[today] || [];
  const cards = L.map(x => {
    const on = dn.includes(x.id);
    return '<button class="chcard' + (on ? " on" : "") + '" data-d="' + today + '" data-id="' + esc(x.id) + '" aria-pressed="' + on + '"><span class="che">' + esc(x.e) + '</span><span class="chn">' + nz(x) + '<small class="chpt">+' + pts(x.id) + '</small></span><span class="chk">' + (on ? "✓" : "") + '</span></button>';
  }).join("");
  const cheer = L.every(x => dn.includes(x.id)) ? '<div class="chcheer">🎉 ' + zu("all") + '</div>' : "";
  const hd = '<div class="chg-h chg-l"></div>' + wk.map(w => '<div class="chg-h' + (w.k === today ? " today" : "") + '"><b>' + WD[w.i] + '</b><span>' + w.m + '/' + w.d + '</span></div>').join("");
  const rows = L.map(x => '<div class="chg-l"><span>' + esc(x.e) + '</span><span class="chg-n">' + esc(x.t) + '</span></div>' + wk.map(w => {
    const on = (M[w.k] || []).includes(x.id);
    return '<button class="chg-c' + (on ? " on" : "") + (w.k === today ? " today" : "") + '" data-d="' + w.k + '" data-id="' + esc(x.id) + '"' + (w.k > today ? " disabled" : "") + ' aria-label="' + esc(x.t) + ' ' + w.m + '/' + w.d + '">' + (on ? "✓" : "") + '</button>';
  }).join("")).join("");
  app.innerHTML = h + '<div class="h1">' + zu("q") + '</div><div class="chlist">' + cards + '</div>' + cheer + err + board() +
    '<div class="chwk">' + zu("week") + '</div><div class="chgrid">' + hd + rows + '</div>';
  app.querySelectorAll("[data-d]").forEach(b => b.onclick = () => toggle(b.dataset.d, b.dataset.id));
  app.querySelectorAll("[data-rw]").forEach(b => b.onclick = () => redeem(b.dataset.rw));
}
function post(pairs, revert) {
  return Promise.all(pairs.map(p => api("/api/state", { uid, key: p[0], val: p[1] }).then(r => { if (!r.ok) throw 1; })))
    .catch(e => { if (e === 0) return; revert(); S.err = "save"; render(); });
}
function toggle(d, id) {
  const pc = JSON.stringify(S.chores), pb = JSON.stringify(S.chbank);
  const m = JSON.parse(pc), bk = JSON.parse(pb), a = m[d] || [], i = a.indexOf(id), p = pts(id);
  bk.e = bk.e || 0; bk.s = bk.s || 0; bk.h = bk.h || [];
  if (i >= 0) { a.splice(i, 1); bk.e = Math.max(0, bk.e - p); } else { a.push(id); bk.e += p; }
  if (a.length) m[d] = a; else delete m[d];
  const ks = Object.keys(m).sort();
  while (ks.length > 1 && (ks.length > 45 || JSON.stringify(m).length > 4500)) delete m[ks.shift()];
  S.chores = m; S.chbank = bk; S.err = ""; S.conf = ""; S.msg = ""; render();
  post([["chores", m], ["chbank", bk]], () => { if (S.chores === m) { S.chores = JSON.parse(pc); S.chbank = JSON.parse(pb); } });
}
function redeem(id) {
  const x = S.chrw.find(v => v.id === id); if (!x || bal() < x.p) return;
  if (S.conf !== id) { S.conf = id; S.msg = ""; render(); return; }
  S.conf = "";
  const pb = JSON.stringify(S.chbank), bk = JSON.parse(pb);
  bk.e = bk.e || 0; bk.s = (bk.s || 0) + x.p; bk.h = [{ t: x.t, e: x.e, p: x.p, d: chToday() }].concat(bk.h || []).slice(0, 8);
  S.chbank = bk; S.msg = "🎉 兌換成功：" + x.t + "，請告訴爸爸媽媽！"; render();
  post([["chbank", bk]], () => { if (S.chbank === bk) { S.chbank = JSON.parse(pb); S.msg = ""; } });
}
uid ? load() : needUser();
</script></body></html>`;

export default base + CSS + BODY.replace("__RT__", () => RT_JS);
