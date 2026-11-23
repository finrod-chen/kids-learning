// 共用層：各站頁面共同的側邊欄／抽屜選單。
// 站台圖示一律用首頁各站原本的 LOGO（/img/...），不另外畫 SVG 或用 Emoji。
// 用法：withShell(頁面字串, 目前站代號)，會把 CSS 加在第一個 </style> 前、把選單腳本加在 </body> 前。
// 頁首要放一顆 <button class="hbg" data-shell="open">（見 HBG），點它就開抽屜；電腦寬度（900px 以上）側邊欄固定顯示。
export const STATIONS = [
  { k: "home", t: "首頁", z: "ㄕㄡˇ|ㄧㄝˋ", href: "/", img: "/img/main-192.webp" },
  { k: "stk", t: "貼貼芽", z: "ㄊㄧㄝ|ㄊㄧㄝ|ㄧㄚˊ", href: "/stk", img: "/img/sticker.webp" },
  { k: "read", t: "讀讀芽", z: "ㄉㄨˊ|ㄉㄨˊ|ㄧㄚˊ", href: "/read", img: "/img/reading.webp" },
  { k: "vocab", t: "說說芽", z: "ㄕㄨㄛ|ㄕㄨㄛ|ㄧㄚˊ", href: "/vocab", img: "/img/vocab.webp" },
  { k: "write", t: "寫寫芽", z: "ㄒㄧㄝˇ|ㄒㄧㄝˇ|ㄧㄚˊ", href: "/write", img: "/img/write.webp" },
  { k: "math", t: "算算芽", z: "ㄙㄨㄢˋ|ㄙㄨㄢˋ|ㄧㄚˊ", href: "/math", img: "/img/math.webp" },
  { k: "news", t: "新聞芽", z: "ㄒㄧㄣ|ㄨㄣˊ|ㄧㄚˊ", href: "/news", img: "/img/news.webp" },
  { k: "chat", t: "聊聊芽", z: "ㄌㄧㄠˊ|ㄌㄧㄠˊ|ㄧㄚˊ", href: "/chat", img: "/img/liaoliaoya-192.webp" },
  { k: "care", t: "照顧芽", z: "ㄓㄠˋ|ㄍㄨˋ|ㄧㄚˊ", href: "/care", img: "/img/care-192.webp" },
  { k: "xinqing", t: "心情芽", z: "ㄒㄧㄣ|ㄑㄧㄥˊ|ㄧㄚˊ", href: "/xinqing", img: "/img/xinqingya-192.webp" },
  { k: "chores", t: "家事芽", z: "ㄐㄧㄚ|ㄕˋ|ㄧㄚˊ", href: "/chores", img: "/img/chores.webp" },
  { k: "shelf", t: "芽書櫃", z: "ㄧㄚˊ|ㄕㄨ|ㄍㄨㄟˋ", href: "/shelf", img: "/img/bookshelf.webp" },
];

/* 頁首第一顆按鈕（漢堡鈕）。三條線用 CSS 畫，不用圖示字。 */
export const HBG = '<button class="hbg" type="button" data-shell="open" aria-label="開啟選單" aria-controls="sd" aria-expanded="false"><i></i><i></i><i></i></button>';

export const SHELL_CSS = `
/* ---- 共用層：選單 ---- */
.hbg{flex:none;display:inline-flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;width:52px;height:52px;border-radius:16px;background:var(--card);border:2px solid var(--navy)}
.hbg i{display:block;width:22px;height:3px;border-radius:2px;background:var(--navy)}
.hbg:active{transform:scale(.96)}
.sdm{position:fixed;inset:0;background:rgba(20,28,56,.5);opacity:0;pointer-events:none;transition:opacity .2s;z-index:40}
.sd{position:fixed;top:0;bottom:0;left:0;width:min(300px,84vw);background:var(--card);border-right:3px solid var(--navy);z-index:41;transform:translateX(-102%);transition:transform .22s;display:flex;flex-direction:column;gap:4px;overflow-y:auto;padding:max(14px,env(safe-area-inset-top,0px)) 12px max(14px,env(safe-area-inset-bottom,0px)) max(12px,env(safe-area-inset-left,0px))}
body.sdopen .sd{transform:none}
body.sdopen .sdm{opacity:1;pointer-events:auto}
body.sdopen{overflow:hidden}
.sdh{display:flex;align-items:center;gap:10px;padding:4px 8px 10px;font-size:22px;font-weight:700;color:var(--navy);letter-spacing:.04em}
.sdh img{width:44px;height:44px;border-radius:12px;flex:none}
.sdi{display:flex;align-items:center;gap:12px;min-height:56px;padding:8px 10px;border-radius:16px;border:2px solid transparent;color:var(--ink);text-decoration:none;font-size:20px;min-width:0}
.sdi img{flex:none;width:40px;height:40px;border-radius:12px;object-fit:cover}
.sdi .sdt{min-width:0;overflow-wrap:anywhere}
.sdi.on{background:var(--acc-soft);border-color:var(--navy);font-weight:700}
.sdi:active{transform:scale(.98)}
.sdi:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
.sdp{margin-top:auto;border-top:1px solid var(--line);border-radius:0 0 16px 16px;padding-top:12px}
@media (min-width:900px){
  .hbg,.sdm{display:none}
  .sd{transform:none;width:250px;border-right-width:2px}
  body{padding-left:250px}
}
@media (prefers-reduced-motion:reduce){.sd,.sdm{transition:none}}
/* 內嵌在家長專區裡時：不顯示頁首、選單、頁尾連結 */
html.embed .top,html.embed .foot,html.embed .hbg,html.embed .sd,html.embed .sdm{display:none!important}
html.embed body{padding-left:0!important;background:transparent}
html.embed .wrap{padding-top:4px}
`;

export const SHELL_JS = `
(function () {
  var CUR = window.SHELL_CUR || "";
  var ST = ${JSON.stringify(STATIONS)};
  var root = document.documentElement;
  var embed = false;
  try { embed = new URLSearchParams(location.search).get("embed") === "1"; } catch (_) {}
  if (embed) {
    root.classList.add("embed");
    var post = function () { try { window.top.postMessage({ shellH: Math.ceil(document.documentElement.scrollHeight) }, location.origin); } catch (_) {} };
    if (window.ResizeObserver) new ResizeObserver(post).observe(document.body);
    window.addEventListener("load", post);
    return;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function label(s) { return typeof window.zyDrawer === "function" ? window.zyDrawer(s.t, s.z) : typeof window.zy === "function" ? window.zy(s.t, s.z) : esc(s.t); }
  var shell = document.createElement("div");
  shell.innerHTML =
    '<div class="sdm" id="sdm"></div>' +
    '<nav class="sd" id="sd" aria-label="站台選單">' +
    '<div class="sdh"><img src="/img/main-192.webp" alt="" width="44" height="44"><span>芽芽學堂</span></div>' +
    ST.map(function (s) {
      return '<a class="sdi' + (s.k === CUR ? " on" : "") + '" href="' + s.href + '"' + (s.k === CUR ? ' aria-current="page"' : "") + '><img src="' + s.img + '" alt="" width="40" height="40"><span class="sdt">' + label(s) + '</span></a>';
    }).join("") +
    '<a class="sdi sdp" href="/parent"><img src="/img/parent-192.webp" alt="" width="40" height="40"><span class="sdt">' + label({ t: "家長專區", z: "ㄐㄧㄚ|ㄓㄤˇ|ㄓㄨㄢ|ㄑㄩ" }) + '</span></a>' +
    '</nav>';
  while (shell.firstChild) document.body.appendChild(shell.firstChild);
  var sd = document.getElementById("sd"), mq = window.matchMedia("(min-width:900px)");
  function isOpen() { return document.body.classList.contains("sdopen"); }
  function sync() {
    var open = isOpen(), wide = mq.matches;
    if (wide && open) document.body.classList.remove("sdopen");
    try { sd.inert = !wide && !isOpen(); } catch (_) {}
    document.querySelectorAll("[data-shell=open]").forEach(function (b) { b.setAttribute("aria-expanded", isOpen() ? "true" : "false"); });
  }
  function openSd() { document.body.classList.add("sdopen"); sync(); var f = sd.querySelector(".sdi.on") || sd.querySelector(".sdi"); if (f) f.focus(); }
  function closeSd(back) { document.body.classList.remove("sdopen"); sync(); if (back) { var b = document.querySelector("[data-shell=open]"); if (b) b.focus(); } }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-shell=open]")) { e.preventDefault(); isOpen() ? closeSd(true) : openSd(); return; }
    if (e.target.id === "sdm") closeSd(true);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen()) closeSd(true); });
  (mq.addEventListener ? mq.addEventListener("change", sync) : mq.addListener(sync));
  sync();
})();
`;

export function withShell(page, cur) {
  const i = page.indexOf("</style>");
  const j = page.lastIndexOf("</body>");
  if (i < 0 || j < 0) return page;
  return page.slice(0, i) + SHELL_CSS + page.slice(i, j) + "<script>window.SHELL_CUR=" + JSON.stringify(cur) + ";</script><script>" + SHELL_JS + "</script>" + page.slice(j);
}
