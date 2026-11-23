// 芽書櫃頁面（/shelf）：登記看過的書、寫心得，資料用 /api/books。
// 從首頁 SPA 搬出來的獨立頁面；外觀沿用心情芽／照顧芽的 <head> 與樣式，主題色維持原本的紅。
// 介面文字的注音是靜態寫好的（跟首頁原本一樣）；孩子自己打的書名、心得不加注音。
import XQ_PAGE from "./xinqingya-page.js";
import { HBG } from "./shared.js";

export const base = XQ_PAGE.slice(0, XQ_PAGE.indexOf("</style>"))
  .replace("<title>心情芽｜芽芽學堂</title>", "<title>芽書櫃｜芽芽學堂</title>")
  .replace('href="/img/xinqingya-192.webp"', 'href="/img/bookshelf-32.png"')
  .replace('type="image/webp"', 'type="image/png"');

const CSS = `
:root{--acc:#C2412F;--acc-soft:#FDE4DF}
@media (prefers-color-scheme: dark){:root{--acc:#FF9C8C;--acc-soft:#43241F}}
.h1{font-size:34px;font-weight:700;text-wrap:balance}
.bkcount{font-size:24px;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.bknum{font-family:"Nunito","Avenir Next",var(--ui);font-size:36px;font-weight:700;color:var(--acc)}
.bklist{display:grid;gap:16px}
.bkcard{background:var(--card);border:2px solid var(--line);border-left:10px solid var(--acc);border-radius:22px;padding:18px 22px;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 0 var(--acc-soft);min-width:0}
.bkhead{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 16px}
.bkt{font-size:30px;font-weight:700;overflow-wrap:anywhere}
.bkd{font-family:var(--ui);font-size:17px;color:var(--muted)}
.bkn{font-size:24px;white-space:pre-wrap;overflow-wrap:anywhere;border-top:2px dashed var(--line);padding-top:10px}
.bkacts{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}
.bkbtn{font-size:18px;min-height:44px;padding:6px 16px;border:2px solid var(--line);border-radius:14px;background:var(--card);color:var(--ink)}
.bkbtn.warn{color:var(--red)}
.bkbtn:active,.btn:active{transform:scale(.97)}
.bkask{font-family:var(--ui);font-size:17px;line-height:1.5;color:var(--ink);overflow-wrap:anywhere}
.bkl{font-size:24px;font-weight:700;margin-top:6px}
.bkh{font-family:var(--ui);font-size:15px;color:var(--muted);margin-top:-6px}
.fin{width:100%;min-width:0;max-width:100%;font:inherit;font-size:24px;min-height:64px;padding:10px 14px;border:2px solid var(--line);border-radius:18px;background:var(--card);color:var(--ink);-webkit-appearance:none;appearance:none}
.fin:focus{outline:3px solid var(--focus);outline-offset:2px}
.fin[type=date]{display:block;text-align:left;line-height:1.3;margin:0}
textarea.fin{resize:vertical;min-height:130px;line-height:1.5}
.bkbtns{display:flex;gap:12px;flex-wrap:wrap}
.btn.ghost{background:var(--card);color:var(--ink);box-shadow:0 3px 0 var(--line)}
.bkerr{color:var(--red)}
@media (max-width:600px){.h1{font-size:28px}.bkt{font-size:26px}.bkn,.fin{font-size:21px}.bkl{font-size:21px}}
`;

const BODY = `</style></head><body><div class="wrap" id="app"><div class="note">載入中…</div></div>
<script>
const $ = s => document.querySelector(s), app = $("#app");
__ZY__
const Z = (t, a) => zy(t, a.join("|"));
const BUI = {
  title: ["我的書櫃", ["ㄨㄛˇ","ㄉㄜ˙","ㄕㄨ","ㄍㄨㄟˋ"]],
  read1: ["已經看了", ["ㄧˇ","ㄐㄧㄥ","ㄎㄢˋ","ㄌㄜ˙"]],
  read2: ["本書", ["ㄅㄣˇ","ㄕㄨ"]],
  add: ["登記新書", ["ㄉㄥ","ㄐㄧˋ","ㄒㄧㄣ","ㄕㄨ"]],
  fTitle: ["書名", ["ㄕㄨ","ㄇㄧㄥˊ"]],
  fDate: ["看完的日期", ["ㄎㄢˋ","ㄨㄢˊ","ㄉㄜ˙","ㄖˋ","ㄑㄧˊ"]],
  fNote: ["我的心得", ["ㄨㄛˇ","ㄉㄜ˙","ㄒㄧㄣ","ㄉㄜˊ"]],
  fHint: ["寫一兩句話就好，也可以不寫", ["ㄒㄧㄝˇ","ㄧ","ㄌㄧㄤˇ","ㄐㄩˋ","ㄏㄨㄚˋ","ㄐㄧㄡˋ","ㄏㄠˇ","","ㄧㄝˇ","ㄎㄜˇ","ㄧˇ","ㄅㄨˋ","ㄒㄧㄝˇ"]],
  save: ["存起來", ["ㄘㄨㄣˊ","ㄑㄧˇ","ㄌㄞˊ"]],
  edit: ["修改", ["ㄒㄧㄡ","ㄍㄞˇ"]],
  del: ["刪除", ["ㄕㄢ","ㄔㄨˊ"]],
  cancel: ["取消", ["ㄑㄩˇ","ㄒㄧㄠ"]],
  empty: ["書櫃還是空的，來登記第一本書吧！", ["ㄕㄨ","ㄍㄨㄟˋ","ㄏㄞˊ","ㄕˋ","ㄎㄨㄥ","ㄉㄜ˙","","ㄌㄞˊ","ㄉㄥ","ㄐㄧˋ","ㄉㄧˋ","ㄧ","ㄅㄣˇ","ㄕㄨ","ㄅㄚ˙",""]]
};
const zb = k => Z(BUI[k][0], BUI[k][1]);
const BERR = { no_title: "請先打上書名", no_date: "請選日期", too_many: "書櫃放不下了", net: "連不上網路", fail: "沒有存成功，請再試一次", load: "書櫃打不開，請檢查網路後重新整理" };
let uid = null; try { uid = localStorage.getItem("kids.uid"); } catch (_) {}
let NICK = "";
const B = { list: null, form: null, err: "", busy: false, ask: "" };
const today = () => new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 10);
function bkDate(d) { const m = String(d).match(/^(\\d{4})-(\\d{2})-(\\d{2})$/); return m ? m[1] + "年" + Number(m[2]) + "月" + Number(m[3]) + "日" : esc(d); }
function head() {
  const who = NICK ? '<span class="who"><span class="wav" aria-hidden="true">' + esc([...NICK][0] || "") + '</span>' + esc(NICK) + '</span>' : "";
  return '<div class="top">__HBG__<div class="brand"><img class="blogo" src="/img/bookshelf.webp" alt="" width="44" height="44"><span>芽書櫃</span></div>' + who + '<a class="chip" href="/"><span aria-hidden="true">🏠</span>首頁</a></div>';
}
function noteOnly(msg) { app.innerHTML = head() + '<div class="note">' + msg + '</div>'; }
function needUser() { noteOnly('請先在<a href="/">首頁</a>選好是誰在用，再點芽書櫃。'); }
async function api(path, body) {
  const r = await fetch(path, body ? { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) } : { cache: "no-store" });
  if (r.status === 401) { noteOnly('請先回<a href="/">首頁</a>解鎖，再進來喔。'); throw 0; }
  return r;
}
async function load() {
  try {
    const u = await (await api("/api/users")).json();
    const me = u.find(x => x.id === uid);
    if (!me) return needUser();
    NICK = me.nick;
    const r = await api("/api/books?uid=" + encodeURIComponent(uid));
    if (!r.ok) throw 0;
    B.list = await r.json();
  } catch (e) { if (e === 0 && !B.list && app.querySelector(".note a")) return; B.list = []; B.err = "load"; }
  render();
}
function render() {
  let h = head();
  if (B.list === null) { app.innerHTML = h + '<div class="note">載入中…</div>'; return; }
  const err = B.err ? '<div class="note bkerr" role="alert">' + esc(BERR[B.err] || BERR.fail) + '</div>' : "";
  const f = B.form;
  if (f) {
    h += '<div class="h1">' + zb(f.id ? "edit" : "add") + '</div><section class="card">' +
      '<label class="bkl" for="bk-title">' + zb("fTitle") + '</label><input id="bk-title" class="fin" maxlength="40" autocomplete="off" placeholder="例如：小王子" value="' + esc(f.title) + '">' +
      '<label class="bkl" for="bk-date">' + zb("fDate") + '</label><input id="bk-date" class="fin" type="date" min="2000-01-01" max="' + today() + '" value="' + esc(f.date) + '">' +
      '<label class="bkl" for="bk-note">' + zb("fNote") + '</label><div class="bkh">' + zb("fHint") + '</div><textarea id="bk-note" class="fin" maxlength="200" rows="4">' + esc(f.note) + '</textarea>' +
      err + '<div class="bkbtns"><button class="btn" id="bk-save"' + (B.busy ? " disabled" : "") + '>' + zb("save") + '</button><button class="btn ghost" id="bk-cancel">' + zb("cancel") + '</button></div></section>';
    app.innerHTML = h;
    const t = $("#bk-title"), d = $("#bk-date"), n = $("#bk-note");
    t.oninput = () => f.title = t.value; d.oninput = () => f.date = d.value; n.oninput = () => f.note = n.value;
    $("#bk-save").onclick = save; $("#bk-cancel").onclick = () => { B.form = null; B.err = ""; render(); };
    return;
  }
  h += '<div class="h1">' + zb("title") + '</div><div class="bkcount">' + zb("read1") + '<span class="bknum">' + B.list.length + '</span>' + zb("read2") + '</div>' +
    '<div><button class="btn" id="bk-add">＋ ' + zb("add") + '</button></div>' + err;
  h += B.list.length ? '<div class="bklist">' + B.list.map(x => {
    const acts = B.ask === x.id
      ? '<div class="bkask">要刪除《' + esc(x.title) + '》這筆紀錄嗎？</div><div class="bkacts"><button class="bkbtn warn" data-yes="' + esc(x.id) + '">' + zb("del") + '</button><button class="bkbtn" data-no="1">' + zb("cancel") + '</button></div>'
      : '<div class="bkacts"><button class="bkbtn" data-edit="' + esc(x.id) + '">' + zb("edit") + '</button><button class="bkbtn warn" data-del="' + esc(x.id) + '">' + zb("del") + '</button></div>';
    return '<article class="bkcard"><div class="bkhead"><span class="bkt">' + esc(x.title) + '</span><span class="bkd">' + bkDate(x.date) + '</span></div>' + (x.note ? '<div class="bkn">' + esc(x.note) + '</div>' : "") + acts + '</article>';
  }).join("") + '</div>' : (B.err === "load" ? "" : '<div class="note">' + zb("empty") + '</div>');
  app.innerHTML = h;
  $("#bk-add").onclick = () => { B.form = { id: "", title: "", date: today(), note: "" }; B.err = ""; B.ask = ""; render(); const i = $("#bk-title"); if (i) i.focus(); };
  app.querySelectorAll("[data-edit]").forEach(b => b.onclick = () => { const x = B.list.find(v => v.id === b.dataset.edit); if (!x) return; B.form = { id: x.id, title: x.title, date: x.date, note: x.note || "" }; B.err = ""; B.ask = ""; render(); });
  app.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { B.ask = b.dataset.del; render(); });
  app.querySelectorAll("[data-no]").forEach(b => b.onclick = () => { B.ask = ""; render(); });
  app.querySelectorAll("[data-yes]").forEach(b => b.onclick = () => del(b.dataset.yes));
}
async function save() {
  const f = B.form; if (!f || B.busy) return;
  const title = (f.title || "").trim(), date = f.date || "";
  if (!title) { B.err = "no_title"; render(); const i = $("#bk-title"); if (i) i.focus(); return; }
  if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(date)) { B.err = "no_date"; render(); return; }
  B.busy = true; B.err = "";
  try {
    const r = await api("/api/books", { uid, id: f.id || undefined, title, date, note: (f.note || "").trim() });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) B.err = j.error === "too_many" ? "too_many" : "fail";
    else {
      const i = f.id ? B.list.findIndex(x => x.id === f.id) : -1;
      if (i >= 0) B.list[i] = j; else B.list.unshift(j);
      B.list.sort((x, y) => x.date < y.date ? 1 : x.date > y.date ? -1 : 0);
      B.form = null;
    }
  } catch (e) { if (e !== 0) B.err = "net"; else return; }
  B.busy = false; render(); window.scrollTo({ top: 0 });
}
async function del(id) {
  B.ask = "";
  try {
    const r = await api("/api/books/delete", { uid, id });
    if (!r.ok) throw 1;
    B.list = B.list.filter(v => v.id !== id); B.err = "";
  } catch (e) { if (e === 0) return; B.err = "fail"; }
  render();
}
uid ? load() : needUser();
</script></body></html>`;

export const ZY_CODE = `const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const TONES = "ˊˇˋ";
function zyChar(ch, z) {
  if (!z) return '<span class="pu">' + esc(ch) + '</span>';
  const neutral = z.includes("˙"); let s = z.replace("˙", ""), tone = "";
  if (TONES.includes(s.slice(-1))) { tone = s.slice(-1); s = s.slice(0, -1); }
  const syms = [...s], n = Math.min(3, Math.max(1, syms.length));
  return '<span class="c"><span class="h">' + esc(ch) + '</span><span class="b n' + n + '" aria-hidden="true">' + (neutral ? '<span class="nt">˙</span>' : "") + syms.map(x => '<span class="s">' + x + '</span>').join("") + (tone ? '<span class="tn">' + tone + '</span>' : "") + '</span></span>';
}
function zy(t, z) {
  const zs = String(z || "").split("|"), units = [];
  [...t].forEach((c, i) => { if (!zs[i] && units.length) units[units.length - 1] += zyChar(c, ""); else units.push(zyChar(c, zs[i])); });
  return '<span class="zt" lang="zh-TW">' + units.map(u => '<span class="u">' + u + '</span>').join("") + '</span>';
}`;

export default base + CSS + BODY.replace("__ZY__", () => ZY_CODE).replace("__HBG__", () => HBG);
