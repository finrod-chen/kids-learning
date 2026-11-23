// 首頁 SPA 的共用樣式（米色以外的綠色方格紙主題、卡片、注音、小芽、寫寫芽、節日主題）。從首頁逐字切出（略過貼貼芽/家長/照顧芽/心情芽/聊聊芽專用段）。
export const SPA_CSS = `*{box-sizing:border-box}body{margin:0;font-size:14px}:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}[hidden]{display:none!important}
/* Layout: one-screen tablet app on 作業簿 (exercise-book) green grid paper; big tappable cards, one task per screen. */
:root{
  --paper:#F2F8F1; --grid:rgba(64,140,96,.13); --card:#FFFFFF; --ink:#1E2B24; --muted:#5B6E63; --line:#CFE2D3;
  --g3:#2E7A4E; --g3-soft:#DDEFE2; --g1:#C8641E; --g1-soft:#FBE6D3;
  --red:#D13A2F; --pencil:#E9B422; --focus:#2563EB;
  --font:"LXGW WenKai TC","Kaiti TC","BiauKai","DFKai-SB","PingFang TC","Noto Sans TC",serif;
  --ui:"PingFang TC","Noto Sans TC","Microsoft JhengHei",system-ui,sans-serif;
  --zy:.36em;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --paper:#16201A; --grid:rgba(120,190,145,.08); --card:#1F2B24; --ink:#E6EFE8; --muted:#9DB2A4; --line:#2F4237;
  --g3:#7CCB9A; --g3-soft:#22382B; --g1:#F2A365; --g1-soft:#3A2A1C; --red:#FF7A6E; --pencil:#F5CB4A; --focus:#7AA7FF; color-scheme:dark}}
:root[data-theme="dark"]{
  --paper:#16201A; --grid:rgba(120,190,145,.08); --card:#1F2B24; --ink:#E6EFE8; --muted:#9DB2A4; --line:#2F4237;
  --g3:#7CCB9A; --g3-soft:#22382B; --g1:#F2A365; --g1-soft:#3A2A1C; --red:#FF7A6E; --pencil:#F5CB4A; --focus:#7AA7FF; color-scheme:dark}
html,body{height:100%}
body{background:var(--paper);color:var(--ink);font-family:var(--font);
  background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);
  background-size:44px 44px;background-attachment:fixed;-webkit-tap-highlight-color:transparent}
.wrap{max-width:860px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:20px 48px;display:flex;flex-direction:column;gap:20px}
button{font:inherit;color:inherit;cursor:pointer;border:0;background:none}
button:focus-visible{outline:3px solid var(--focus);outline-offset:3px;border-radius:14px}
.g3{--acc:var(--g3);--acc-soft:var(--g3-soft)} .g1{--acc:var(--g1);--acc-soft:var(--g1-soft)}

/* zhuyin: character + vertical bopomofo column on the right, Taiwan textbook style */
.c{display:inline-flex;align-items:center;vertical-align:middle;margin-right:.1em}
.h{line-height:1}
.b{position:relative;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;font-size:var(--zy);line-height:1.02;width:1.15em;margin-left:.04em;font-family:var(--ui);font-weight:400}
.b .s{display:block}
.b .nt{display:block;line-height:.6}
.b .tn{position:absolute;left:86%;line-height:1;font-size:1.35em;font-weight:700}
.b.n1 .tn{top:50%;transform:translateY(-55%)}
.b.n2 .tn{top:50%;transform:translateY(-50%)}
.b.n3 .tn{top:66%;transform:translateY(-50%)}
.pu{display:inline-block;vertical-align:middle;line-height:1}
.u{white-space:nowrap}
.zt{display:inline;line-height:2.3}

/* header */
.top{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.brand{font-weight:700;font-size:20px;letter-spacing:.06em;color:var(--muted);margin-right:auto}
.chip{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;background:var(--card);border:1.5px solid var(--line);font-size:22px;min-height:52px}
.chip:active{transform:scale(.97)}

/* home */
.hello{font-size:34px;font-weight:700;text-wrap:balance}
.grades{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.grade{background:var(--card);border:2px solid var(--acc);border-radius:28px;padding:28px 24px;display:flex;flex-direction:column;gap:14px;text-align:left;min-height:220px;box-shadow:0 6px 0 var(--acc-soft)}
.grade:active{transform:translateY(3px);box-shadow:0 3px 0 var(--acc-soft)}
.grade .big{font-size:46px;font-weight:700;color:var(--acc)}
.grade .sub{font-size:22px;color:var(--muted)}
.dots{display:flex;gap:8px;flex-wrap:wrap}
.dot{width:16px;height:16px;border-radius:50%;border:2px solid var(--acc)}
.dot.on{background:var(--acc)}

/* article list */
.h1{font-size:30px;font-weight:700}
.weeklbl{font-family:var(--ui);font-size:15px;color:var(--muted);letter-spacing:.04em}
.arts{display:grid;gap:18px}
.art{background:var(--card);border:1.5px solid var(--line);border-radius:24px;padding:22px 22px;display:flex;gap:18px;align-items:center;text-align:left;font-size:30px;min-height:120px}
.art:active{transform:scale(.99)}
.art .tag{flex:none;font-size:20px;padding:8px 14px;border-radius:14px;background:var(--acc-soft);color:var(--acc);font-weight:700}
.art .t{flex:1;min-width:0;font-weight:700}
.art .st{flex:none;font-family:var(--ui);font-size:18px;color:var(--muted);text-align:center;min-width:76px}
.stars{color:var(--pencil);font-size:22px;letter-spacing:2px}
.older{display:flex;gap:10px;flex-wrap:wrap;align-items:center;font-family:var(--ui);color:var(--muted);font-size:16px}
.older button{padding:8px 14px;border-radius:12px;border:1.5px solid var(--line);background:var(--card);font-family:var(--ui);font-size:16px}
.older button[aria-pressed="true"]{border-color:var(--acc);color:var(--acc);font-weight:700}

/* reader */
.tools{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:12px 22px;border-radius:18px;background:var(--card);border:2px solid var(--line);font-size:24px;min-height:60px}
.btn.primary{background:var(--acc);border-color:var(--acc);color:var(--card)}
.btn.primary .b{color:inherit}
.btn:active{transform:scale(.97)}
.btn .ic{font-family:var(--ui);font-size:26px;line-height:1}
.sheet{background:var(--card);border-radius:26px;border:1.5px solid var(--line);padding:28px 26px;display:flex;flex-direction:column;gap:18px}
.ttl{font-size:1.25em;font-weight:700;color:var(--acc);text-wrap:balance}
.para{text-indent:0;margin:0;padding:6px 10px;border-radius:12px;transition:background .2s}
.para.poem{padding-left:20px}
.para.speaking{background:var(--acc-soft)}
.para button.say{display:inline;font-family:var(--ui);font-size:.55em;color:var(--muted);vertical-align:middle;margin-left:4px;padding:4px 6px}
.reader{font-size:var(--fs,30px)}

/* quiz */
.prog{display:flex;gap:8px;align-items:center;font-family:var(--ui);color:var(--muted);font-size:18px}
.prog i{flex:1;height:10px;border-radius:6px;background:var(--line)}
.prog i.on{background:var(--acc)}
.q{font-size:var(--fs,30px);font-weight:700}
.opts{display:grid;gap:14px}
.opt{position:relative;display:flex;align-items:center;gap:16px;text-align:left;background:var(--card);border:2px solid var(--line);border-radius:20px;padding:16px 84px 16px 18px;font-size:calc(var(--fs,30px) * .9);min-height:78px}
.opt .k{flex:none;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:var(--acc-soft);color:var(--acc);font-family:var(--ui);font-weight:700;font-size:22px}
.opt .v{flex:1;min-width:0}
.opt:disabled{cursor:default}
.opt.right{border-color:var(--red)}
.opt.picked.wrongpick{border-color:var(--line);opacity:.85}
.mark{position:absolute;right:14px;top:50%;transform:translateY(-50%);width:64px;height:64px;pointer-events:none}
.mark path,.mark circle{fill:none;stroke:var(--red);stroke-width:6;stroke-linecap:round;stroke-dasharray:240;stroke-dashoffset:240;animation:draw .5s ease-out forwards}
@keyframes draw{to{stroke-dashoffset:0}}
.fb{display:flex;flex-direction:column;gap:10px;padding:18px 20px;border-radius:20px;background:var(--acc-soft);font-size:calc(var(--fs,30px) * .85)}
.fb .head{font-weight:700;font-size:1.15em}
.fb .head.ok{color:var(--red)}
/* done */
.score{display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;padding-block:10px}
.score .n{font-family:var(--ui);font-size:64px;font-weight:700;color:var(--acc);font-variant-numeric:tabular-nums}
.bigstars{font-size:52px;color:var(--pencil);letter-spacing:6px}
.bigstars .off{color:var(--line)}
.extra{border:2px dashed var(--acc);border-radius:20px;padding:18px 20px;display:flex;flex-direction:column;gap:8px;font-size:calc(var(--fs,30px) * .85)}
.extra .lbl{font-weight:700;color:var(--acc)}

/* parent */
.foot{display:flex;justify-content:center;margin-top:8px}
.foot button{font-family:var(--ui);font-size:14px;color:var(--muted);padding:8px 12px;text-decoration:underline;text-underline-offset:3px}
.parent{font-family:var(--ui);font-size:16px;display:flex;flex-direction:column;gap:16px}
.parent h2{font-size:22px;margin:0}
.parent h3{font-size:17px;margin:0}
.ptable{overflow-x:auto}
.parent table{border-collapse:collapse;width:100%;min-width:520px;background:var(--card);border-radius:12px;overflow:hidden}
.parent th,.parent td{padding:10px 12px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
.parent th{font-size:13px;color:var(--muted);font-weight:600;letter-spacing:.04em}
.pill{display:inline-block;padding:2px 10px;border-radius:999px;font-size:13px;font-weight:600}
.pill.ok{background:var(--g3-soft);color:var(--g3)} .pill.no{background:#F9DEDB;color:#A52A21} .pill.na{background:var(--line);color:var(--muted)}
:root[data-theme="dark"] .pill.no{background:#4A2420;color:#FFB4AB}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .pill.no{background:#4A2420;color:#FFB4AB}}
.note{font-family:var(--ui);font-size:15px;color:var(--muted);background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px}

/* 特色生字 */
.chars{display:flex;flex-direction:column;gap:14px}
.chars .h1{font-size:26px}
.ctiles{display:flex;gap:12px;flex-wrap:wrap}
.ctile{background:var(--card);border:2px solid var(--line);border-radius:20px;padding:12px 16px;font-size:60px;min-width:112px;display:flex;justify-content:center;align-items:center;font-family:var(--font)}
.ctile:active{transform:scale(.97)}
.ctile.on{border-color:var(--acc);background:var(--acc-soft);box-shadow:0 4px 0 var(--acc)}
.cpanel{background:var(--card);border:2px solid var(--acc);border-radius:24px;padding:18px;display:grid;grid-template-columns:minmax(200px,260px) 1fr;gap:20px;align-items:start}
.sbox{aspect-ratio:1;width:100%;max-width:260px;border:2px solid var(--line);border-radius:16px;position:relative;background:
  linear-gradient(var(--line),var(--line)) center/1.5px 100% no-repeat,linear-gradient(var(--line),var(--line)) center/100% 1.5px no-repeat;display:grid;place-items:center;font-size:150px;font-family:var(--font);color:var(--ink)}
.sbox svg{position:absolute;inset:0;width:100%;height:100%}
.cinfo{display:flex;flex-direction:column;gap:12px;font-size:26px}
.crow{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.crow .lb{font-weight:700;color:var(--acc)}
.cinfo .tools{margin-top:4px}
.c.hl .h{color:var(--red);font-weight:700}
.c.blank .h{display:inline-block;width:1em;height:1em;border:2px dashed var(--acc);border-radius:8px;color:transparent;overflow:hidden}
.sk{fill:none;stroke:var(--acc);stroke-width:300}
.skbase{fill:var(--line)}
.skn{fill:var(--red);font-family:var(--ui);font-size:150px;font-weight:700;opacity:0;paint-order:stroke;stroke:var(--card);stroke-width:30px}
.skn.on{opacity:1}
.gword{font-size:var(--fs,34px);text-align:center;padding:10px 0}
.gopts{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:14px}
.gopt{position:relative;background:var(--card);border:2px solid var(--line);border-radius:20px;min-height:110px;font-size:64px;font-family:var(--font);display:grid;place-items:center}
.gopt:disabled{cursor:default}
.gopt.right{border-color:var(--red)}
.gopt .mark{width:40px;height:40px;right:6px;top:6px;transform:none}
.sstrip{grid-column:1/-1;display:flex;flex-direction:column;gap:8px}
.scells{display:flex;flex-wrap:wrap;gap:8px}
.scell{display:flex;flex-direction:column;align-items:center;gap:2px;font-family:var(--ui);font-size:14px;color:var(--muted)}
.scell svg{width:68px;height:68px;border:1.5px solid var(--line);border-radius:10px;background:var(--card)}
.sp{fill:var(--ink)} .sc{fill:var(--red)} .sf{fill:var(--line);opacity:.7}
/* 小站入口與單字 */
.stations{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.station{background:var(--card);border:2px solid var(--acc);border-radius:28px;padding:30px 24px;display:flex;flex-direction:column;gap:12px;text-align:left;min-height:220px;box-shadow:0 6px 0 var(--acc-soft)}
.station:active{transform:translateY(3px);box-shadow:0 3px 0 var(--acc-soft)}
.station .sico{font-size:58px;line-height:1}
.station .big{font-size:44px;font-weight:700;color:var(--acc)}
.station .sub{font-size:22px;color:var(--muted)}
.s-read{--acc:var(--g3);--acc-soft:var(--g3-soft)}
.s-vocab{--acc:#3560B8;--acc-soft:#E1E9F8}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .s-vocab{--acc:#8FB1F2;--acc-soft:#22304A}}
:root[data-theme="dark"] .s-vocab{--acc:#8FB1F2;--acc-soft:#22304A}
.soon{text-align:center}
.en{font-family:"Nunito","Avenir Next",var(--ui)}
.pu.en{font-size:1em;margin:0 .15em}
.wlist{display:grid;gap:18px}
.wcard{background:var(--card);border:2px solid var(--line);border-radius:26px;padding:22px 24px;display:flex;flex-direction:column;gap:12px}
.whead{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.wen{font-size:46px;font-weight:700;color:var(--acc);letter-spacing:.01em}
.wsay{min-height:52px;padding:6px 14px;font-size:24px}
.wpos{font-family:var(--ui);font-size:16px;padding:3px 12px;border-radius:999px;background:var(--acc-soft);color:var(--acc);font-weight:700}
.wkk{font-size:26px;color:var(--muted)}
.wzh{font-size:30px}
.wcard .lb{font-family:var(--ui);font-weight:700;color:var(--acc);font-size:16px}
.wex{display:flex;flex-direction:column;gap:6px;border-top:2px dashed var(--line);padding-top:12px}
.wexen{font-size:28px}
.wex .say{font-size:22px;padding:2px 6px;color:var(--muted)}
.wexzh{font-size:24px;color:var(--muted)}
@media (max-width:600px){
 .wrap{gap:16px;padding-block:14px 40px}
 .brand{font-size:16px}
 .chip{font-size:18px;min-height:44px;padding:6px 12px}
 .hello{font-size:28px}
 .grade{min-height:0;padding:22px 20px}
 .grade .big{font-size:38px}
 .h1{font-size:24px}
 .art{display:grid;grid-template-columns:auto 1fr;grid-template-areas:"tag st" "t t";gap:10px 12px;font-size:24px;padding:16px 18px;min-height:0}
 .art .tag{grid-area:tag;justify-self:start;font-size:17px;padding:6px 12px}
 .art .st{grid-area:st;justify-self:end;text-align:right;min-width:0}
 .art .t{grid-area:t}
 .tools{gap:8px}
 .btn{font-size:19px;min-height:50px;padding:8px 14px;border-radius:14px}
 .btn .ic{font-size:21px}
 .btn[data-act="size"]{min-width:50px;padding:8px 10px}
 .sheet{padding:20px 16px;border-radius:20px}
 .para{padding:4px 2px}
 .opt{gap:12px;padding:12px 64px 12px 12px;min-height:64px}
 .opt .k{width:38px;height:38px;font-size:19px}
 .mark{width:48px;height:48px;right:10px}
 .fb{padding:14px 16px}
 .score .n{font-size:48px}
 .bigstars{font-size:40px}
 .cpanel{grid-template-columns:1fr;padding:14px}
 .sbox{margin:0 auto}
 .ctile{font-size:46px;min-width:84px;padding:8px 10px}
 .cinfo{font-size:22px}
 .gopt{font-size:52px;min-height:88px}
 .scell svg{width:54px;height:54px}
 .station{min-height:0;padding:22px 20px}
 .station .big{font-size:36px}
 .wcard{padding:18px 16px}
 .wen{font-size:38px}
 .wzh{font-size:24px}
 .wexen{font-size:22px}
 .wexzh{font-size:20px}
 .wkk{font-size:22px}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.mark path,.mark circle{stroke-dashoffset:0}.sk{stroke-dashoffset:0}.skn{opacity:1}}
/* 芽芽學堂：依 logo 配色（奶油底、深藍描邊、嫩綠、橘、天藍） */
:root{--paper:#F8F4E6;--grid:rgba(38,57,107,.065);--card:#FFFDF6;--ink:#22305A;--muted:#5E6A8A;--line:#E3DCC4;--navy:#26396B;--g3:#2A8760;--g3-soft:#DCF1E5;--g1:#D4701C;--g1-soft:#FCE7D0;--focus:#2F7FBF}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--paper:#18213A;--grid:rgba(160,180,235,.06);--card:#222D4C;--ink:#EDEFF7;--muted:#A7B1CE;--line:#34416A;--navy:#A9BCF0;--g3:#7FD1A6;--g3-soft:#1F3A33;--g1:#F5A355;--g1-soft:#3D2E22}}
:root[data-theme="dark"]{--paper:#18213A;--grid:rgba(160,180,235,.06);--card:#222D4C;--ink:#EDEFF7;--muted:#A7B1CE;--line:#34416A;--navy:#A9BCF0;--g3:#7FD1A6;--g3-soft:#1F3A33;--g1:#F5A355;--g1-soft:#3D2E22}
.s-vocab{--acc:#2F7FBF;--acc-soft:#DCEEFA}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .s-vocab{--acc:#7EC0F0;--acc-soft:#1F3350}}
:root[data-theme="dark"] .s-vocab{--acc:#7EC0F0;--acc-soft:#1F3350}
.brand{display:flex;align-items:center;gap:10px;font-size:24px;color:var(--navy);letter-spacing:.04em}
.blogo{width:44px;height:44px;border-radius:12px;flex:none;box-shadow:0 2px 0 rgba(38,57,107,.15)}
.hero{display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:4px}
.hlogo{width:132px;height:132px;border-radius:32px;box-shadow:0 8px 18px rgba(38,57,107,.18)}
.hname{font-size:46px;font-weight:700;color:var(--navy);text-align:center;letter-spacing:.04em}
.hq{text-align:center;font-size:30px}
.station,.grade{border:3px solid var(--navy);box-shadow:0 7px 0 var(--acc)}
.station:active,.grade:active{box-shadow:0 3px 0 var(--acc)}
.station .slogo{width:96px;height:96px;border-radius:24px;box-shadow:0 3px 0 rgba(38,57,107,.15)}
.chip,.btn{border-color:var(--navy);border-width:2px}
.btn.primary{border-color:var(--navy);box-shadow:0 3px 0 var(--navy)}
.sheet,.wcard,.art{border-color:var(--navy)}
.wcard{box-shadow:0 5px 0 var(--acc-soft)}
@media (max-width:600px){.brand{font-size:19px}.blogo{width:36px;height:36px;border-radius:10px}.hlogo{width:104px;height:104px;border-radius:26px}.hname{font-size:36px}.hq{font-size:24px}.station .slogo{width:76px;height:76px;border-radius:20px}.station{flex-direction:row;flex-wrap:wrap;align-items:center}.station .big{font-size:34px}}
/* 英文字母 */
.abccard{display:flex;align-items:center;gap:20px;background:var(--card);border:3px solid var(--navy);border-radius:28px;padding:20px 24px;text-align:left;box-shadow:0 7px 0 var(--acc, #2F7FBF);--acc:#2F7FBF}
.abccard:active{transform:translateY(3px);box-shadow:0 3px 0 #2F7FBF}
.abcbig{font-family:"Nunito","Avenir Next",var(--ui);font-size:64px;font-weight:800;color:#2F7FBF;line-height:1;padding:8px 18px;border-radius:20px;background:#DCEEFA}
:root[data-theme="dark"] .abcbig{background:#1F3350;color:#7EC0F0}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .abcbig{background:#1F3350;color:#7EC0F0}}
.abctx{display:flex;flex-direction:column;gap:6px}
.abctx .big{font-size:38px;font-weight:700;color:var(--navy)}
.abctx .sub{font-size:20px;color:var(--muted)}
.apanel{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.aletter,.aword{background:var(--card);border:3px solid var(--navy);border-radius:26px;padding:18px;display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:0 5px 0 var(--acc-soft)}
.abig{display:flex;align-items:baseline;gap:12px;font-size:120px;font-weight:800;color:var(--acc);line-height:1}
.abig .lo{font-size:104px;color:var(--ink)}
.akk{font-size:26px;color:var(--muted)}
.aemo{font-size:76px;line-height:1.1}
.awen{font-size:44px;font-weight:700}
.wf{color:var(--red)}
.azh{font-size:30px}
.agrid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}
.atile{background:var(--card);border:2px solid var(--line);border-radius:16px;min-height:72px;font-size:30px;font-weight:700;color:var(--ink);box-shadow:0 3px 0 var(--line)}
.atile.on{border-color:var(--navy);background:var(--acc-soft);color:var(--acc);box-shadow:0 3px 0 var(--navy)}
.atile:active{transform:translateY(2px)}
.lo2{margin-left:.28em;font-weight:600}
@media (max-width:600px){.apanel{grid-template-columns:1fr}.abig{font-size:96px}.abig .lo{font-size:84px}.agrid{grid-template-columns:repeat(5,1fr)}.atile{min-height:60px;font-size:26px}.abcbig{font-size:48px}.abctx .big{font-size:30px}.abccard{padding:16px}}
.abccard{min-width:0;max-width:100%}.abctx{min-width:0;flex:1 1 0}.abctx .sub{overflow-wrap:anywhere}
.agrid{grid-template-columns:repeat(6,minmax(0,1fr))}
@media (max-width:600px){.agrid{grid-template-columns:repeat(5,minmax(0,1fr))}.atile{padding:0;font-size:24px}.lo2{margin-left:.15em}}
/* 算算芽 */
.s-math{--acc:#D4701C;--acc-soft:#FCE7D0}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .s-math{--acc:#F5A355;--acc-soft:#3D2E22}}
:root[data-theme="dark"] .s-math{--acc:#F5A355;--acc-soft:#3D2E22}
.stations{grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
.dot.bad{background:var(--red);border-color:var(--red)}
.dot.cur{box-shadow:0 0 0 3px var(--acc-soft)}
.mcard{display:flex;align-items:center;gap:20px;background:var(--card);border:3px solid var(--navy);border-radius:28px;padding:20px 24px;text-align:left;box-shadow:0 7px 0 var(--acc);min-width:0;max-width:100%}
.mcard:active{transform:translateY(3px);box-shadow:0 3px 0 var(--acc)}
.mbig{font-size:50px;font-weight:800;color:var(--acc);line-height:1;padding:12px 16px;border-radius:20px;background:var(--acc-soft);white-space:nowrap}
.mtx{display:flex;flex-direction:column;gap:6px;min-width:0;flex:1 1 0}
.mtx .big{font-size:36px;font-weight:700;color:var(--navy)}
.mtx .sub{font-size:20px;color:var(--muted)}
.mprog{display:flex;gap:10px;justify-content:center}
.mprog .dot{width:20px;height:20px}
.mqn{text-align:center;font-size:28px;color:var(--muted)}
.mexp{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:14px;font-size:76px;font-weight:700;color:var(--ink);line-height:1.1;padding:14px 8px;background:var(--card);border:3px solid var(--navy);border-radius:28px;box-shadow:0 6px 0 var(--acc-soft)}
.mexp .op{color:var(--acc)}
.mans{min-width:2.2ch;padding:0 14px;border-bottom:6px solid var(--acc);text-align:center;color:var(--acc)}
.mans.empty{color:var(--line)}
.mans.ok{color:var(--g3);border-color:var(--g3)}
.mans.no{color:var(--red);border-color:var(--red);text-decoration:line-through}
.kpad{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.key{min-height:82px;border-radius:20px;background:var(--card);border:2px solid var(--navy);box-shadow:0 4px 0 var(--navy);font-size:38px;font-weight:700;color:var(--ink)}
.key:active{transform:translateY(3px);box-shadow:0 1px 0 var(--navy)}
.key.fn{font-size:24px;color:var(--muted)}
.key.go{background:var(--acc);color:var(--card);font-size:26px;border-color:var(--navy)}
.mfb{display:flex;align-items:center;justify-content:center;gap:14px;font-size:34px;font-weight:700;padding:14px;border-radius:22px;background:var(--acc-soft)}
.mfb .mark{font-family:var(--ui);font-size:64px;line-height:1;color:var(--red)}
.mfb.ok{color:var(--g3)}
.mfb.no{color:var(--ink)}
.mnext{align-self:center;min-width:220px}
.mdone{align-items:center;text-align:center}
.mscore{font-size:30px;color:var(--muted)}
.mscore .n{font-size:88px;font-weight:800;color:var(--acc)}
.mdone .stars{font-size:40px}
.mt-sec{display:flex;flex-direction:column;gap:8px}
.mt-lb{font-size:22px;color:var(--muted)}
.mpicks{display:grid;grid-template-columns:repeat(9,minmax(0,1fr));gap:8px}
.mpick{min-height:58px;border-radius:14px;background:var(--card);border:2px solid var(--line);font-size:28px;font-weight:700;color:var(--ink);box-shadow:0 3px 0 var(--line)}
.mpick.on{background:var(--acc-soft);border-color:var(--navy);color:var(--acc);box-shadow:0 3px 0 var(--navy)}
.meqs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.meq{display:flex;justify-content:center;gap:10px;background:var(--card);border:2px solid var(--line);border-radius:18px;padding:14px 8px;font-size:30px;font-weight:700;color:var(--ink)}
.meq b{color:var(--acc);min-width:1.6ch;text-align:center}
.meq b.q{color:var(--muted)}
.tgwrap{overflow:hidden}
.tg{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:4px}
.th{display:grid;place-items:center;font-weight:800;color:var(--acc);font-size:20px;min-height:40px}
.tc{min-height:44px;border-radius:8px;background:var(--card);border:1.5px solid var(--line);font-size:20px;font-weight:600;color:var(--ink);padding:0}
.tc.row{background:var(--acc-soft);border-color:var(--acc)}
.tc.q{color:var(--muted)}
@media (max-width:600px){.mcard{padding:16px;gap:14px}.mbig{font-size:36px;padding:10px 12px}.mtx .big{font-size:28px}.mtx .sub{font-size:17px}.mexp{font-size:54px;gap:8px}.key{min-height:72px;font-size:32px}.mfb{font-size:26px}.meqs{grid-template-columns:repeat(2,minmax(0,1fr))}.meq{font-size:26px}.tc{min-height:36px;font-size:16px}.th{font-size:16px;min-height:32px}.mpick{min-height:48px;font-size:24px}.mscore .n{font-size:68px}}
/* 新聞芽 */
.s-news{--acc:#8B4A9C;--acc-soft:#F1E4F5}
/* 芽書櫃 */
.s-shelf{--acc:#C2412F;--acc-soft:#FDE4DF}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .s-shelf{--acc:#FF9C8C;--acc-soft:#43241F}}
:root[data-theme="dark"] .s-shelf{--acc:#FF9C8C;--acc-soft:#43241F}
@media (min-width:560px){.station.s-shelf{grid-column:1/-1;display:grid;grid-template-columns:auto 1fr;grid-template-areas:"logo big" "logo sub";column-gap:26px;row-gap:4px;align-items:center;min-height:0;padding:22px 28px}.station.s-shelf .slogo{grid-area:logo}.station.s-shelf .big{grid-area:big;align-self:end}.station.s-shelf .sub{grid-area:sub;align-self:start}}
.bkcount{font-size:26px;color:var(--muted)}
.bknum{font-family:var(--ui);font-size:1.6em;font-weight:700;color:var(--acc);margin:0 .25em}
.bkform{gap:12px}
.bk-l{font-weight:700;color:var(--acc);font-size:26px}
.bk-h{font-size:20px;color:var(--muted);margin-top:-6px}
.bk-ta{resize:vertical;min-height:130px;font-size:26px;line-height:1.5}
.bkbtns{display:flex;gap:12px;flex-wrap:wrap}
.bkerr{color:var(--red)}
.bklist{display:grid;gap:16px}
.bkcard{background:var(--card);border:2px solid var(--line);border-left:10px solid var(--acc);border-radius:22px;padding:18px 22px;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 0 var(--acc-soft)}
.bkhead{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 16px}
.bkt{font-size:32px;font-weight:700;overflow-wrap:anywhere}
.bkd{font-family:var(--ui);font-size:17px;color:var(--muted)}
.bkn{font-size:26px;white-space:pre-wrap;overflow-wrap:anywhere;border-top:2px dashed var(--line);padding-top:10px}
.bkacts{display:flex;gap:10px;justify-content:flex-end}
.bkbtn{font-size:18px;min-height:44px;padding:6px 16px;border:2px solid var(--line);border-radius:14px;background:var(--card)}
.bkbtn.warn{color:var(--red)}
.bkform{min-width:0}.bkform>*{min-width:0;max-width:100%}
.winput[type=date]{-webkit-appearance:none;appearance:none;display:block;width:100%;min-width:0;max-width:100%;min-height:68px;text-align:left;line-height:1.3;margin:0}
.winput[type=date]::-webkit-date-and-time-value{text-align:left;min-height:1.3em}
.winput[type=date]::-webkit-calendar-picker-indicator{opacity:.6}
@media (max-width:600px){.bkt{font-size:26px}.bkn,.bk-ta{font-size:22px}.bk-l{font-size:22px}}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .s-news{--acc:#D9A3E8;--acc-soft:#3A2A40}}
:root[data-theme="dark"] .s-news{--acc:#D9A3E8;--acc-soft:#3A2A40}
@media (min-width:560px){.stations{grid-template-columns:repeat(2,minmax(0,1fr))}}
.nart{background:var(--card);border:2px solid var(--navy);border-radius:24px;padding:18px 20px;display:flex;gap:18px;align-items:center;text-align:left;font-size:30px;min-height:110px;box-shadow:0 5px 0 var(--acc-soft);min-width:0}
.nart:active{transform:translateY(3px);box-shadow:0 2px 0 var(--acc-soft)}
.nart .nem{font-size:48px;line-height:1;flex:none}
.nart .ntx{flex:1;min-width:0;display:flex;flex-direction:column;gap:10px;align-items:flex-start}
.nart .t{font-weight:700;overflow-wrap:anywhere}
.ntg{display:inline-block;align-self:flex-start;font-size:20px;font-weight:700;padding:6px 14px;border-radius:14px;line-height:1.2}
.ntg.in{background:#D7F0F1;color:#0B6B74}
.ntg.out{background:#E3E5FA;color:#3F49B0}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .ntg.in{background:#1D3A3C;color:#7FD6DC}:root:not([data-theme="light"]) .ntg.out{background:#2B2E55;color:#AEB4F7}}
:root[data-theme="dark"] .ntg.in{background:#1D3A3C;color:#7FD6DC}
:root[data-theme="dark"] .ntg.out{background:#2B2E55;color:#AEB4F7}
.nimg{margin:0;display:flex;flex-direction:column;gap:6px}
.nimg img{width:100%;max-height:320px;object-fit:cover;border-radius:18px;background:var(--acc-soft);display:block}
.nimg figcaption{font-family:var(--ui);font-size:14px;color:var(--muted)}
.nbox{background:var(--card);border:2px solid var(--navy);border-radius:22px;padding:18px 20px;display:flex;flex-direction:column;gap:10px;font-size:var(--fs,30px)}
.nbox.rel{background:var(--acc-soft);border-color:var(--acc)}
.nlb{display:flex;align-items:center;gap:8px;font-size:.8em;font-weight:700;color:var(--acc)}
.nbd{font-weight:600}
.nsrc{display:flex;flex-direction:column;gap:4px;padding:14px 18px;border-radius:18px;border:2px dashed var(--line);background:var(--card);color:var(--ink);text-decoration:none;min-width:0}
.nsl{font-size:22px;font-weight:700;color:var(--acc)}
.nsn{font-family:var(--ui);font-size:15px;color:var(--muted);overflow-wrap:anywhere}
@media (max-width:600px){.nart{padding:14px;gap:12px;font-size:24px;min-height:0}.nart .nem{font-size:38px}.ntg{font-size:16px;padding:4px 10px}.nbox{padding:14px;font-size:calc(var(--fs,22px))}.nsl{font-size:19px}}
/* iOS Safari：button 預設 white-space:pre，導致文字不換行 */
button{white-space:normal}
.nart{width:100%;box-sizing:border-box}
.nart .ntx{align-self:stretch}
.nart .t{display:block;min-width:0;max-width:100%}
/* 注音會往字右側外凸，容器右側預留空間，避免被卡片邊緣切到 */
.station .big,.station .sub,.nart .t,.mtx .big,.mtx .sub{padding-right:.8em;box-sizing:border-box}
/* 我的小芽 */
.sprouts{background:var(--card);border:3px solid var(--navy,#26396B);border-radius:28px;padding:18px 14px;box-shadow:0 6px 0 var(--g3-soft);display:flex;flex-direction:column;gap:12px}
.sph{font-size:28px;font-weight:700;text-align:center}
.sprow{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}
.sp{background:var(--acc-soft);border-radius:20px;padding:12px 6px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;min-width:0}
.sp svg{width:130px;height:130px}
.spg{font-size:20px;font-weight:700;color:var(--acc)}
.spn{font-size:16px;white-space:nowrap}
.spc{font-size:15px;color:var(--muted);white-space:nowrap}
.spw{font-size:14px;padding:3px 12px 3px 8px;border-radius:14px;white-space:nowrap;background:#fff;color:var(--muted)}
.spw.on{background:#D6EEFF;color:#1A5E9A}
.spbar{width:78%;height:8px;background:#fff;border-radius:99px;overflow:hidden}
.spbar i{display:block;height:100%;background:var(--acc)}
.spf{font-size:20px}
.spk{text-align:center;font-size:16px;color:var(--muted);padding-right:.8em}
.sptoast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);max-width:92vw;background:#1E3A5F;color:#fff;padding:10px 24px 10px 18px;border-radius:26px;font-size:20px;white-space:nowrap;z-index:99;box-shadow:0 6px 18px rgba(0,0,0,.25);animation:sptin .35s ease-out}
@keyframes sptin{from{opacity:0;transform:translate(-50%,16px)}to{opacity:1;transform:translate(-50%,0)}}
@media (prefers-reduced-motion:reduce){.sptoast{animation:none}}
/* 使用者切換 */
.whochip{align-self:center;display:inline-flex;align-items:center;gap:10px;background:var(--card);border:2px solid var(--navy,#26396B);border-radius:999px;padding:6px 16px 6px 8px;font-size:20px;box-shadow:0 3px 0 var(--line)}
.wav{width:34px;height:34px;border-radius:50%;background:var(--g3);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:18px}
.wnick{font-weight:700;max-width:9em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.wsw{font-size:16px;color:var(--muted);padding-right:.6em}
.whol{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
.whou{min-height:0;padding:18px 20px;gap:6px}
.whou .big{font-size:36px;overflow-wrap:anywhere}
.whoform{display:flex;flex-direction:column;gap:16px}
.wl{font-size:24px;font-weight:700}
.winput{font:inherit;font-size:30px;padding:12px 16px;border:3px solid var(--navy,#26396B);border-radius:18px;width:100%;box-sizing:border-box;background:var(--card);color:var(--ink)}
.grade.sel{outline:5px solid var(--acc);outline-offset:3px}
.whoform .grade{min-height:96px;padding:18px 16px}
.whoform .grades{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.whoform .grade .big{font-size:26px;white-space:nowrap}
.whoform .grade{padding:18px 8px;align-items:center}
.wbtns .btn.primary{background:var(--g3);color:#fff;border-color:var(--navy,#26396B)}
.wbtns{display:flex;gap:12px;flex-wrap:wrap}
.pbar{display:flex;gap:8px;flex-wrap:wrap}
.pbar button{padding:8px 16px;border:2px solid var(--line);border-radius:999px;background:var(--card);font-size:16px}
.pbar button[aria-pressed=true]{border-color:var(--navy,#26396B);background:var(--g3-soft);font-weight:700}
.pdel{font-family:var(--ui);font-size:14px;color:var(--red);text-decoration:underline;padding:6px 4px}
/* 家長專區（週檢視） */
.psprout{display:flex;gap:14px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px}
.pse{font-size:34px}
.psub{color:var(--muted);font-size:14px}
.pnav{display:flex;align-items:center;justify-content:space-between;gap:8px}
.pnav .btn{min-height:44px;padding:6px 12px;font-size:15px;font-family:var(--ui);white-space:nowrap}
.pnav .btn[disabled]{opacity:.35}
.pwl{font-weight:700;text-align:center;font-size:16px}
.psec{background:var(--card);border:1px solid var(--line);border-radius:14px;overflow:hidden}
.psec h3{padding:12px 16px;background:var(--g3-soft);margin:0}
.pday{display:flex;gap:12px;padding:8px 16px;border-top:1px solid var(--line)}
.pday.today{background:#FFF9E6}
.pd{width:70px;flex:none;font-weight:700;line-height:1.4}
.pd small{color:var(--muted);font-weight:400;font-size:13px;margin-left:4px}
.pbody{flex:1;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:8px}
.pit1{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.pt{font-weight:600}
.pw{font-size:14px;margin-top:2px}
.pnone{color:var(--muted)}
/* 首頁頂端的小芽（精簡版） */
.sprouts{padding:12px 14px;gap:8px}
.sprouts .sph{font-size:22px}
.sprouts .sp{flex-direction:row;justify-content:center;align-items:center;gap:14px;padding:10px 12px}
.sprouts .sp svg{width:96px;height:96px;flex:none}
.spt{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0}
.spt .spbar{width:100%}
/* 密碼畫面 */
.pdots{display:flex;gap:14px;justify-content:center;margin:6px 0}
.pdot{width:20px;height:20px;border-radius:50%;border:3px solid var(--navy,#26396B);background:var(--card)}
.pdot.on{background:var(--navy,#26396B)}
.pinerr{text-align:center;color:var(--red);font-size:22px}
.pinpad{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:340px;width:100%;margin:0 auto}
.pk{min-height:72px;font-size:34px;font-weight:700;background:var(--card);border:3px solid var(--navy,#26396B);border-radius:20px;box-shadow:0 4px 0 var(--line);font-family:var(--ui)}
.pk:active{transform:translateY(3px);box-shadow:0 1px 0 var(--line)}
.pk[data-v="C"],.pk[data-v="B"]{font-size:22px}
/* iOS Safari hardening: buttons inside grid/flex must be allowed to shrink and wrap */
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
.opts,.arts{grid-template-columns:minmax(0,1fr)}
.opt,.art,.nart,.grade,.station,.abccard{min-width:0;max-width:100%;box-sizing:border-box}
.opt{width:100%;margin:0;-webkit-appearance:none;appearance:none;overflow-wrap:anywhere}
.opt>*{min-width:0}
.opt .v{overflow-wrap:anywhere}
@media (max-width:600px){
 .opt{padding-right:52px}
 .mark{width:40px;height:40px;right:8px}
}
/* 家事芽 */
.s-chores{--acc:#1C8C86;--acc-soft:#D7F0EE}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .s-chores{--acc:#6FD3CD;--acc-soft:#1E3B39}}
:root[data-theme="dark"] .s-chores{--acc:#6FD3CD;--acc-soft:#1E3B39}
@media (min-width:560px){.station.s-chores{grid-column:1/-1;display:grid;grid-template-columns:auto 1fr;grid-template-areas:"logo big" "logo sub";column-gap:26px;row-gap:4px;align-items:center;min-height:0;padding:22px 28px}.station.s-chores .slogo{grid-area:logo}.station.s-chores .big{grid-area:big;align-self:end}.station.s-chores .sub{grid-area:sub;align-self:start}}
.chlist{display:grid;gap:12px;margin:12px 0}
.chcard{font:inherit;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:14px;width:100%;min-width:0;text-align:left;background:var(--card);color:var(--ink);border:3px solid var(--line);border-left:10px solid var(--acc);border-radius:22px;padding:14px 18px;box-shadow:0 4px 0 var(--acc-soft);cursor:pointer}
.chcard.on{background:var(--acc-soft);border-color:var(--acc)}
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
.chfoot{margin-top:22px}
.chm{display:grid;gap:10px;margin:12px 0}
.chm-r{display:flex;align-items:center;gap:12px;background:var(--card);border:2px solid var(--line);border-radius:18px;padding:10px 14px}
.chm-t{font:inherit;font-size:20px;font-weight:700;min-width:64px;padding:8px 12px;border-radius:14px;border:2px solid var(--line);background:var(--card);color:var(--muted);cursor:pointer}
.chm-t.on{background:var(--acc);border-color:var(--acc);color:var(--card)}
.chm-e{font-size:34px}
.chm-n{flex:1;min-width:0;font-size:26px;overflow-wrap:anywhere}
.chm-form{gap:12px;margin-top:18px}
.chm-in{display:grid;grid-template-columns:96px minmax(0,1fr);gap:10px}
.chm-ei{text-align:center}
@media (max-width:600px){.chcard{padding:10px 14px;gap:10px}.che{font-size:36px}.chn{font-size:28px}.chk{width:40px;height:40px;font-size:24px}.chg-n{display:none}.chgrid{grid-template-columns:34px repeat(7,minmax(0,1fr));gap:4px}}
/* 集點卡 */
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
.chm-r{flex-wrap:wrap}
.chm-s{display:flex;align-items:center;gap:6px;font-size:22px}
.chm-s b{font-family:var(--ui);min-width:2ch;text-align:center}
.chm-s i{font-style:normal;color:var(--muted)}
.chm-b{font:inherit;width:40px;height:40px;border-radius:12px;border:2px solid var(--line);background:var(--card);color:var(--ink);font-size:22px;cursor:pointer;padding:0}
.chm-in3{display:grid;grid-template-columns:80px minmax(0,1fr) 110px;gap:10px}
.chrw .btn:disabled{opacity:.45}

/* ===== 寫寫芽 ===== */
.s-write{--acc:#C2417F;--acc-soft:#FBE3EE;--wink:#C2417F}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .s-write{--acc:#F29BC4;--acc-soft:#3E2232;--wink:#F29BC4}}
:root[data-theme="dark"] .s-write{--acc:#F29BC4;--acc-soft:#3E2232;--wink:#F29BC4}
@media (min-width:560px){.station.s-write{grid-column:1/-1;display:grid;grid-template-columns:auto minmax(0,1fr);grid-template-areas:"logo big" "logo sub";column-gap:26px;row-gap:4px;align-items:center;min-height:0;padding:22px 28px;min-width:0;max-width:100%;box-sizing:border-box;-webkit-appearance:none;appearance:none}.station.s-write .slogo{grid-area:logo}.station.s-write .big{grid-area:big;align-self:end;min-width:0}.station.s-write .sub{grid-area:sub;align-self:start;min-width:0;overflow-wrap:anywhere}}

.wsteps{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;font-size:18px;color:var(--muted);min-width:0}
.wst{padding:4px 10px;border-radius:999px;border:1.5px solid var(--line);background:var(--card);white-space:nowrap}
.wst.on{border-color:var(--acc);color:var(--acc)}
.wst.cur{background:var(--acc);border-color:var(--acc);color:#fff}
.wst.cur .b{color:#fff}
.wsep{font-family:var(--ui)}
.wcharhd{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);gap:18px;align-items:center;background:var(--card);border:2px solid var(--acc);border-radius:24px;padding:16px 18px;min-width:0}
.wbig{font-size:96px;line-height:1;min-width:0}
.winfo{display:flex;flex-direction:column;gap:6px;font-size:22px;min-width:0;overflow-wrap:anywhere}
.winfo .crow{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;min-width:0}
.winfo .lb,.wmust .lb,.wref .lb{font-family:var(--ui);font-size:14px;color:#fff;background:var(--acc);border-radius:8px;padding:2px 8px;white-space:nowrap}
.wemo{font-size:1.1em;margin-right:6px;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.wtag{display:inline-flex;align-items:center;font-size:16px;padding:2px 10px;border-radius:999px;background:var(--acc-soft);color:var(--acc);border:1.5px solid var(--acc)}
.wcharhd .wtag{position:absolute;top:-14px;right:14px}
.wlbl{font-size:20px;color:var(--muted);text-align:center}
.wpad{display:flex;justify-content:center;width:100%}
.wbox{position:relative;width:min(78vw,340px);height:min(78vw,340px);border:3px solid var(--acc);border-radius:18px;background:
  linear-gradient(var(--line),var(--line)) center/1.5px 100% no-repeat,linear-gradient(var(--line),var(--line)) center/100% 1.5px no-repeat,var(--card);overflow:hidden;
  -webkit-user-select:none;user-select:none;-webkit-touch-callout:none;touch-action:none}
.wbox::before{content:"";position:absolute;left:0;top:0;right:0;bottom:0;background:
  linear-gradient(45deg,transparent calc(50% - .75px),var(--line) calc(50% - .75px),var(--line) calc(50% + .75px),transparent calc(50% + .75px)),
  linear-gradient(-45deg,transparent calc(50% - .75px),var(--line) calc(50% - .75px),var(--line) calc(50% + .75px),transparent calc(50% + .75px));opacity:.55;pointer-events:none}
.wglyph{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font-size:250px;line-height:1;color:var(--line);font-family:var(--font);pointer-events:none}
.wglyph.svg{font-size:0}
.wglyph svg{position:absolute;left:4%;top:4%;width:92%;height:92%}
.wglyph .skbase{fill:var(--line)}
.wglyph:not(.play) .skn{opacity:0}
.wcv{position:absolute;left:0;top:0;width:100%;height:100%;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}
.wcount{text-align:center;font-size:20px;color:var(--muted)}
.wcount .en{font-family:var(--ui);font-weight:700;color:var(--acc)}
.wtools{justify-content:center}
.wtools .btn,.wres .btn,.wwarn .btn,.wprev .btn{-webkit-appearance:none;appearance:none;min-width:0;max-width:100%}
.wwarn{font-size:22px}
.wwarn b{font-family:var(--ui);color:var(--red)}
.wstrip{background:var(--card);border:1.5px solid var(--line);border-radius:18px;padding:12px}
.wstrip .lb{font-family:var(--ui);font-size:14px;color:#fff;background:var(--acc);border-radius:8px;padding:2px 8px}
/* 看圖造句 */
.wscene{position:relative;width:100%;height:0;padding-bottom:56%;border-radius:22px;overflow:hidden;border:3px solid var(--navy,#26396B)}
.wsin{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;flex-direction:column;justify-content:space-between;padding:4% 5% 3%}
.wsky,.wgr{display:flex;justify-content:space-around;align-items:flex-end;gap:2%;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif;line-height:1;min-width:0}
.wsky{font-size:min(9vw,64px)}
.wgr{font-size:min(12vw,88px)}
.wsky span,.wgr span{min-width:0}
.bg-day{background:linear-gradient(#BFE3FF 0 62%,#A8D88A 62% 100%)}
.bg-rain{background:linear-gradient(#B9C3CF 0 62%,#9CC08A 62% 100%)}
.bg-night{background:linear-gradient(#1E2A5A 0 66%,#2F4A3A 66% 100%)}
.bg-indoor{background:linear-gradient(#FCEFD8 0 64%,#D9B48A 64% 100%)}
.bg-sea{background:linear-gradient(#BFE3FF 0 45%,#5FB4E6 45% 70%,#F1D9A4 70% 100%)}
.wmust{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;font-size:26px;min-width:0}
.wkw{background:var(--acc-soft);border:2px solid var(--acc);border-radius:14px;padding:2px 12px;min-width:0;max-width:100%;overflow-wrap:anywhere}
.wta{font-size:26px;line-height:1.5;min-height:120px;resize:vertical;-webkit-appearance:none;appearance:none;display:block;margin:0}
.wta::placeholder{color:var(--muted);opacity:.7}
.wchk{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
.wchk li{display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;min-width:0;overflow-wrap:anywhere}
.wmk{font-family:var(--ui);font-weight:700;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex:none;font-size:18px}
.wchk li.ok .wmk{background:#DDF3E4;color:#1F7A44}
.wchk li.no .wmk{background:#FDE7D6;color:#C25A12}
.wref{background:var(--card);border:1.5px dashed var(--acc);border-radius:16px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;align-items:flex-start;min-width:0}
.wrefs,.wqw{min-width:0;overflow-wrap:anywhere}
.wmine{font-size:26px;line-height:1.6;overflow-wrap:anywhere}
.wdc{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.wct{display:inline-flex;font-size:44px;min-width:0}
.gword .wemo{vertical-align:middle}
.wprev .h1{text-align:center}
@media (max-width:600px){
  .wbig{font-size:72px}
  .winfo{font-size:19px}
  .wcharhd{gap:12px;padding:14px}
  .wmust,.wta,.wmine{font-size:22px}
  .wsteps{font-size:16px}
}
/* ===== 節日主題 ===== */
.hgar{display:flex;justify-content:space-between;width:100%;max-width:100%;overflow:hidden;margin:-6px 0 -8px;height:46px;pointer-events:none}
.hflag{flex:1 1 0;min-width:0;display:flex;justify-content:center;position:relative;height:42px}
.hflag::before{content:"";position:absolute;left:8%;right:8%;top:0;height:40px;background:var(--h1);clip-path:polygon(0 0,100% 0,50% 100%);-webkit-clip-path:polygon(0 0,100% 0,50% 100%);opacity:.9}
.hflag.b::before{background:var(--h2)}
.hflag i{position:relative;font-style:normal;font-size:16px;line-height:1;margin-top:5px;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.hgar::after{content:"";position:absolute}
@media (max-width:600px){.hflag:nth-child(n+11){display:none}.hgar{height:38px}.hflag{height:34px}.hflag::before{height:32px}.hflag i{font-size:13px}}
.hfall{position:fixed;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;z-index:0}
.hfall span{position:absolute;top:-60px;opacity:.38;animation-name:hfall;animation-timing-function:linear;animation-iteration-count:infinite;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif;will-change:transform}
@keyframes hfall{0%{transform:translate3d(0,-60px,0) rotate(0deg)}50%{transform:translate3d(18px,55vh,0) rotate(160deg)}100%{transform:translate3d(-12px,112vh,0) rotate(320deg)}}
@media (prefers-reduced-motion:reduce){.hfall{display:none}}
:root[data-hol] .wrap{position:relative;z-index:1}
.hlwrap{position:relative;display:inline-block}
.hbadge{position:absolute;right:-14px;bottom:-8px;font-size:46px;line-height:1;filter:drop-shadow(0 3px 2px rgba(0,0,0,.18));font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.hcard{background:var(--card);border:3px solid var(--h1);border-radius:26px;padding:16px 18px;display:flex;flex-direction:column;gap:10px;box-shadow:0 6px 0 var(--h2);min-width:0}
.hct{display:flex;align-items:center;gap:10px;flex-wrap:wrap;min-width:0}
.hce{font-size:40px;line-height:1;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.hcg{font-size:30px;font-weight:700;color:var(--h1);min-width:0}
.hci{font-size:22px;line-height:1.5;min-width:0;overflow-wrap:anywhere}
.hcard .btn{-webkit-appearance:none;appearance:none;max-width:100%}
.hwords .hw{display:grid;grid-template-columns:auto auto minmax(0,1fr) auto;align-items:center;gap:6px 12px;padding:8px 0;border-top:1.5px dashed var(--line);min-width:0}
.hwe{font-size:30px;font-weight:700;color:var(--h1)}
.hwk{font-size:16px;color:var(--muted)}
.hwz{font-size:22px;min-width:0}
@media (max-width:600px){.hcg{font-size:24px}.hci{font-size:19px}.hwords .hw{grid-template-columns:auto minmax(0,1fr) auto;grid-template-areas:"e z s" "k z s"}.hwe{grid-area:e}.hwk{grid-area:k}.hwz{grid-area:z}.hwords .wsay{grid-area:s}.hbadge{font-size:38px;right:-10px}}
.hmq{margin-right:8px;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
:root[data-hol="halloween"]{--h1:#E8711A;--h2:#5B2A86}
:root[data-hol="christmas"]{--h1:#C8302D;--h2:#1F7A44}
:root[data-hol="newyear"]{--h1:#C9921A;--h2:#3B4EA5}
:root[data-hol="spring"]{--h1:#D7262B;--h2:#E8A317}
:root[data-hol="lantern"]{--h1:#E4572E;--h2:#F2B134}
:root[data-hol="children"]{--h1:#3D8BFD;--h2:#FFB020}
:root[data-hol="mother"]{--h1:#E05683;--h2:#F29BB5}
:root[data-hol="dragon"]{--h1:#2C9B5A;--h2:#E8B13A}
:root[data-hol="father"]{--h1:#2D5DB0;--h2:#F2B134}
:root[data-hol="midautumn"]{--h1:#E39B21;--h2:#6B4FA0}
:root[data-hol="halloween"]{--paper:#FFF3E4;--grid:rgba(160,80,10,.08)}
:root[data-hol="christmas"]{--paper:#F3F9F1;--grid:rgba(30,120,60,.08)}
:root[data-hol="newyear"]{--paper:#FBF5E3;--grid:rgba(150,110,20,.08)}
:root[data-hol="spring"]{--paper:#FFF0EA;--grid:rgba(200,40,40,.07)}
:root[data-hol="lantern"]{--paper:#FFF3E6;--grid:rgba(220,90,40,.07)}
:root[data-hol="children"]{--paper:#F1F6FF;--grid:rgba(60,130,240,.07)}
:root[data-hol="mother"]{--paper:#FFF1F4;--grid:rgba(220,80,130,.07)}
:root[data-hol="dragon"]{--paper:#EEF8F0;--grid:rgba(40,150,90,.08)}
:root[data-hol="father"]{--paper:#EEF4FF;--grid:rgba(45,93,176,.07)}
:root[data-hol="midautumn"]{--paper:#FBF4E4;--grid:rgba(110,80,160,.07)}
@media (prefers-color-scheme: dark){:root[data-hol]:not([data-theme="light"]){--paper:#18213A;--grid:rgba(160,180,235,.06)}
  :root[data-hol="halloween"]:not([data-theme="light"]){--paper:#211A2E;--grid:rgba(232,113,26,.08)}
  :root[data-hol="christmas"]:not([data-theme="light"]){--paper:#15241D;--grid:rgba(200,48,45,.08)}
  :root[data-hol="spring"]:not([data-theme="light"]){--paper:#2A1A1D;--grid:rgba(232,163,23,.08)}}

.s-write .btn:disabled,.s-write .btn[disabled]{opacity:.4;box-shadow:none}
/* layout fix 2026-11-12: subtitles wrap, no horizontal overflow */
.station .sub{min-width:0;max-width:100%;overflow-wrap:anywhere}
@media (max-width:600px){.station .sub{flex-basis:100%}}
html,body{overflow-x:hidden}
`;
