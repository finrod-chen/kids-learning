// 沿用首頁 SPA 外觀（綠色方格紙）的獨立頁面底版：寫寫芽，之後的讀讀、說說、算算、新聞也用這份。
// 樣式（SPA_CSS）與函式（SPA_LIB_JS）都是從首頁逐字切出來的，所以搬出來以後看起來、動起來和原本一樣。
import { SPA_CSS } from "./spa-css.js";

export function spaHead({ title, icon, iconType = "image/png" }) {
  return `<!doctype html><html lang="zh-Hant-TW"><head><meta charset="utf-8"><title>${title}</title>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="芽芽學堂">
<meta name="theme-color" content="#F8F4E6">
<link rel="icon" type="${iconType}" sizes="32x32" href="${icon}">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@400;700&display=swap" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@400;700&display=swap"></noscript>
<style>
${SPA_CSS}`;
}
