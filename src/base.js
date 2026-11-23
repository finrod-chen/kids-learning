// 各站獨立頁面共用的底版：<head> 與共用樣式（米色方格紙底、海軍藍粗框卡片、霞鶩文楷、注音元件、
// .top/.brand/.chip/.btn/.card/.note 等元件，深色模式跟系統）。
// 各頁用 baseHead() 取得「到 </style> 之前」的字串，再接自己的主題色與樣式、</style></head><body>…。
// 注意：這段樣式原本寫在心情芽頁面裡，這裡的內容與當時逐字相同。
const RAW = `<!doctype html><html lang="zh-Hant-TW"><head><meta charset="utf-8"><title>__TITLE__</title>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="芽芽學堂">
<meta name="theme-color" content="#F8F4E6">
<link rel="icon" type="__ICONTYPE__" href="__ICON__"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest">
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
button{font:inherit;color:inherit;cursor:pointer;border:0;background:none;white-space:normal}
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
`;

export function baseHead({ title, icon, iconType = "image/webp" }) {
  return RAW.replace("__TITLE__", () => title).replace("__ICONTYPE__", () => iconType).replace("__ICON__", () => icon);
}
