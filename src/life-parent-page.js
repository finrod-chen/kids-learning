// 生活芽家長頁（/life/parent，內嵌在 /parent 的「生活芽」分頁）：每個單元的完成狀況，和跟孩子聊的小提醒。
// 身體界線的單元特別放了「怎麼跟孩子聊」，家長可以先讀、提早準備。
import { spaHead } from "./spa-base.js";
import { SPA_LIB_JS } from "./spa-lib.js";
import { WD_JS } from "./write-data.js";
import { HOL_JS } from "./hol-lib.js";
import { LIFE_DATA } from "./life-data.js";
import { LIFE_CSS } from "./life-page.js";

const head = spaHead({ title: "生活芽家長｜芽芽學堂", icon: "/img/life-32.png" }) + LIFE_CSS + `
.lp-row{background:var(--card);border:2px solid var(--navy);border-radius:18px;padding:12px 14px;margin-bottom:10px}
.lp-row summary{display:flex;align-items:center;gap:10px;cursor:pointer;list-style:none;font-family:var(--ui)}
.lp-row summary::-webkit-details-marker{display:none}
.lp-row .nm{font-size:18px;color:var(--ink);flex:1;min-width:0;overflow-wrap:anywhere}
.lp-row .wk{font-size:13px;color:var(--muted)}
.lp-row .sc{font-size:14px;color:var(--muted);white-space:nowrap}
.lp-row .sc.ok{color:#2f8a4a;font-weight:700}
.lp-par{font-family:var(--ui);font-size:16px;line-height:1.7;color:var(--ink);margin:10px 0 2px;padding-top:8px;border-top:1px dashed var(--line)}
.lp-par b{display:block;font-size:13px;color:var(--muted);margin-bottom:2px}
.lp-h{font-family:var(--ui);font-size:15px;color:var(--muted);margin:14px 2px 8px}
.lp-hot{background:#EAF3FF;border:2px solid #5B9BE0;border-radius:16px;padding:10px 14px;font-family:var(--ui);font-size:15px;line-height:1.7;margin-bottom:12px}
`;

const SCRIPT = `
const JH = {"content-type":"application/json"};
window.zyDrawer = (t, z) => zy({t: t, z: z});
const LIFE = ${JSON.stringify(LIFE_DATA)};
const app = document.getElementById("app");
const LCAT = Object.fromEntries(LIFE.cats.map(c => [c.k, c]));
function weekIdx(){
  const ms = s => Date.UTC(+s.slice(0,4), +s.slice(4,6)-1, +s.slice(6,8));
  return Math.max(0, Math.floor((ms(mathDate()) - ms(LIFE.w0)) / (7*86400000)));
}
function note(msg){ app.className = "wrap"; app.innerHTML = '<div class="note">' + msg + '</div>'; }
function show(life){
  const k = weekIdx(), n = LIFE.order.length;
  const wkOf = id => LIFE.order.indexOf(id);
  const rows = LIFE.order.map(id => {
    const t = LIFE.topics.find(x => x.id === id), w = wkOf(id), r = life[id];
    const open = w <= k || k >= n;
    const d = new Date(Date.UTC(+LIFE.w0.slice(0,4), +LIFE.w0.slice(4,6)-1, +LIFE.w0.slice(6,8)) + w*7*86400000);
    const wk = (d.getUTCMonth()+1) + "/" + d.getUTCDate();
    const sc = !open ? "還沒到" : r && r.n ? "答對 " + r.ok + "/" + r.n : "還沒做";
    return '<details class="lp-row"><summary><span aria-hidden="true">' + t.e + '</span><span class="nm">' + esc(t.t.t) + '<br><span class="wk">' + esc(LCAT[t.c].e + " " + LCAT[t.c].t.t) + "・" + wk + ' 解鎖</span></span><span class="sc' + (r && r.n ? " ok" : "") + '">' + sc + '</span></summary><div class="lp-par"><b>跟孩子這樣聊</b>' + esc(t.par) + '</div></details>';
  }).join("");
  app.className = "wrap";
  app.innerHTML = '<div class="lp-hot">每週一解鎖一個單元，一共 ' + n + ' 個，輪流安排安全、身體界線、健康、品德。「身體界線」的單元建議先讀一遍，再陪孩子一起看。需要協助可撥 113 保護專線。</div><div class="lp-h">全部單元</div>' + rows;
}
(async () => {
  const q = new URLSearchParams(location.search);
  let uid = q.get("uid"); if (!uid) { try { uid = localStorage.getItem("kids.uid"); } catch(_) {} }
  if (!uid) return note("請先在家長專區選一位孩子。");
  try {
    const rs = await fetch("/api/state?uid=" + encodeURIComponent(uid), {cache:"no-store"});
    if (rs.status === 401) return note('請先回<a href="/">首頁</a>解鎖，再進來喔。');
    const j = rs.ok ? await rs.json() : {};
    show(j.life || {});
  } catch (_) { note("讀不到資料，請重新整理再試。"); }
})();
`;

const BODY = "</style></head><body><div class=\"wrap\" id=\"app\" aria-live=\"polite\"><div class=\"note\">載入中…</div></div>\n<script>\n";

export default head + BODY + SPA_LIB_JS + WD_JS + HOL_JS + SCRIPT + "</script></body></html>";
