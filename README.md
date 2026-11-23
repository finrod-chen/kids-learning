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

- 站台選單：手機是漢堡鈕開的抽屜，電腦寬度（900px 以上）是固定的側邊欄。站台圖示一律用首頁各站原本的 LOGO（`/img/...`），要加新站只改 `shared.js` 的 `STATIONS`。
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
