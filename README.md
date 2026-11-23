# 芽芽學堂

給家裡小一、小三孩子用的學習網站，網址 <https://kids.finrod.xyz>。
跑在 Cloudflare Worker（`kids-reading`）上，資料存在 D1（`kids-reading`）。

站台：讀讀芽（閱讀）、說說芽（英文單字）、算算芽（心算）、新聞芽、寫寫芽、心情芽（情緒練習）、聊聊芽（苗苗）、家事芽、芽書櫃，加上首頁的「我的小芽」與「貼貼芽」。

## 架構

| 東西 | 放在哪 |
|---|---|
| API、路由、PWA manifest、service worker | `src/worker.js`（本 repo） |
| 首頁 HTML | D1 `tools` 表 `name = 'page'`（`page:next` 為預覽，對應 `/__next`） |
| 圖示、貼紙圖片 | D1 `tools` 表 `img:*`（base64） |
| 注音字典 | D1 `tools` 表 `zydict`、`zydict:patch` |
| 文章、使用者、進度 | D1 其餘資料表，見 `schema.sql` |
| 聊聊芽 AI | n8n webhook，金鑰在 Worker secret `N8N_KEY` |

> 首頁 HTML 與圖片目前仍存在 D1，改它們不需要經過 git；本 repo 的自動部署只更新 Worker 程式。

## 部署

推到 `main` → Cloudflare Workers Builds 自動執行 `npx wrangler deploy`，更新 `kids-reading` Worker。

本機手動：

```sh
npm install
npx wrangler login
npm run check    # 只打包不部署
npm run deploy
```

## 共用層與家長專區

各站逐步從首頁搬成獨立路由（`/read`、`/chores` …），共用的部分放在 `src/shared.js`：

- 站台選單：手機是漢堡鈕開的抽屜，電腦寬度（900px 以上）是固定的側邊欄。站台圖示一律用首頁各站原本的 LOGO（`/img/...`），家長專區用 `parent-192.webp`（原檔在 `assets/`，由 `src/care-img.js` 提供），要加新站只改 `shared.js` 的 `STATIONS`。
- 用法：`withShell(頁面字串, 站代號)`，頁首第一顆放 `HBG`（`<button class="hbg" data-shell="open">`）。尚未搬出的站，選單暫時連到 `/?s=站名`。
- 內嵌模式：頁面網址加 `?embed=1` 時不顯示頁首與選單，並用 `postMessage` 回報高度給家長專區。

家長專區統一入口是 `/parent`（`src/parent-page.js`）：進來先鎖一次、輸入一次網站密碼，用分頁切換「總覽」和各站的家長頁（以 `?embed=1` 內嵌）。舊的 `/xinqing/parent`、`/care/parent` 直接開會轉址到 `/parent#xinqing`、`/parent#care`。新站要加家長功能，在 `parent-page.js` 的 `TABS` 加一筆，並讓該站的家長頁支援 `?embed=1`（不要在內嵌時自己鎖家長閘）。

## 心情芽

每天約 5 分鐘的情緒練習：心情溫度計（1–5）→ 2 題「猜猜他怎麼了」→ 1 題「你會怎麼做」。另外每天有「今天的好事」打勾：幫助／讚美／關心／照顧別人。

| 東西 | 放在哪 |
|---|---|
| 頁面 | `/xinqing`（小孩）、`/parent#xinqing`（家長檢視＋CSV，舊網址 `/xinqing/parent` 會轉址），HTML 在 `src/xinqingya-page.js` |
| API | `/api/xq/today`、`/api/xq/temp`、`/api/xq/answer`、`/api/xq/deed`、`/api/xq/log`（一樣要 PIN；`/api/xq/log` 另外要家長密碼） |
| 題庫 | D1 `scenarios`，原始檔 `data/xinqingya-scenarios.json`；`status='off'` 可隱藏單題 |
| 每日紀錄 | D1 `mood_log`；好事打勾在 `good_deeds`（migration 0004） |
| 圖示 | D1 `tools` 的 `img:xinqingya-192.webp`、`img:xinqingya-512.webp`，原檔在 `assets/` |

難度：使用者 `grade` 為 g1 只抽 level 1–2，其他抽 1–3。每天的題目由 uid＋日期固定，避開最近 10 天做過的。

### 已獨立成頁的站

`/shelf`（芽書櫃，`src/shelf-page.js`）、`/chores`（家事芽孩子畫面，`src/chores-page.js`）、`/write`（寫寫芽，`src/write-page.js`）、`/news`（新聞芽，`src/news-page.js`，程式在 `src/news-lib.js`）。兩者沿用原本的 API 與資料，頁面外殼同樣由 `withShell` 包。家事芽的家長設定（開關家事、每項點數、獎勵、兌換紀錄）是 `/parent` 的「家事芽」分頁，直接寫在 `parent-page.js` 裡（不是內嵌 iframe），點數與獎勵跟著上方選的孩子，家事清單全家共用。

### 共用層的程式分工（2026-11-23 整理）

- `src/base.js`：各獨立頁面共用的 `<head>` 與底版 CSS，用 `baseHead({ title, icon, iconType })` 取得，後面接各頁自己的主題色與樣式。
- `src/runtime.js`：前端共用腳本（`$`/`app`、`esc`、注音 `zyChar`/`zy`/`Z`、頁首 `rtHead`、`noteOnly`、`apiRaw`），用 `${RT_JS}` 插在頁面 `<script>` 最前面；頁面自己宣告 `NICK` 並寫一行 `head()` 呼叫 `rtHead`。
- `src/shared.js`：站台清單與側邊選單（`STATIONS`、`HBG`、`withShell`）。
- `src/worker.js` 的 `PAGES` 路由表：新增一站只要在這裡加一行（路徑 → 已包 `withShell` 的頁面），service worker「不當成首頁快取」的清單會自動跟著長出來，回應標頭統一用 `H_HTML`。
- 沿用首頁外觀的頁面（綠色方格紙、`zy({t,z})` 注音）走另一條底版：`src/spa-base.js` 的 `spaHead()`＋`src/spa-css.js`（樣式）＋`src/spa-lib.js`（注音、語音、日期/亂數、筆順、小芽澆水）。這三份和 `src/write-data.js`、`src/write-lib.js`（寫寫芽生字資料與程式）都是**從首頁逐字切出來的，不要手改**；寫寫芽搬家前後用瀏覽器逐步比對畫面 DOM 與存下的資料，完全相同。之後讀讀、說說、算算、新聞搬家時，把用到的首頁函式繼續切進 `spa-lib.js`，首頁最後整份退役。
- 側邊選單的站名注音預設呼叫 `window.zy(文字, 注音)`；沿用首頁 `zy` 的頁面要另外提供 `window.zyDrawer`。
- 首頁（D1 `page`）支援 `/?s=read|vocab|math|news|chat` 深層連結（側邊選單連到還沒搬的站用），開完會把 `s` 從網址拿掉。
