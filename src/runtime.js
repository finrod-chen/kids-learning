// 各站獨立頁面共用的前端腳本（字串），插在頁面 <script> 的最前面。
// 內容：$ / app、esc、注音排版 zyChar / zy、Z（陣列版 zy）、頁首 rtHead、noteOnly、apiRaw。
// 頁面自己要宣告 NICK（頁首顯示用）和 head()（呼叫 rtHead 帶入圖示、站名、右上角連結）。
import { HBG } from "./shared.js";

export const RT_JS = `const $ = s => document.querySelector(s), app = $("#app");
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* 注音（跟首頁 zy() 同樣的 HTML 結構）；z 是用 | 分隔的字串，空字串表示標點接在前一個字後面 */
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
}
const Z = (t, a) => zy(t, a.join("|"));
/* 頁首：漢堡鈕 + 站名 + 目前的孩子（NICK）+ 右邊的連結 */
function rtHead(img, name, chip) {
  const who = NICK ? '<span class="who"><span class="wav" aria-hidden="true">' + esc([...NICK][0] || "") + '</span>' + esc(NICK) + '</span>' : "";
  return '<div class="top">${HBG}<div class="brand"><img class="blogo" src="' + img + '" alt="" width="44" height="44"><span>' + name + '</span></div>' + who + chip + '</div>';
}
function noteOnly(msg) { app.innerHTML = head() + '<div class="note">' + msg + '</div>'; }
/* 呼叫 API；401 代表網站還沒解鎖，顯示提示並丟出 0。noCache 用在 GET 要略過快取時 */
async function apiRaw(path, body, noCache) {
  const r = await fetch(path, body ? { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) } : (noCache ? { cache: "no-store" } : {}));
  if (r.status === 401) { noteOnly('請先回<a href="/">首頁</a>解鎖，再進來喔。'); throw 0; }
  return r;
}
`;
