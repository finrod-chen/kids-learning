# 芽芽學堂

給家裡小一、小三孩子用的學習網站，網址 <https://kids.finrod.xyz>。
跑在 Cloudflare Worker（`kids-reading`）上，資料存在 D1（`kids-reading`）。

站台：讀讀芽（閱讀）、說說芽（英文單字）、算算芽（心算）、新聞芽、寫寫芽、聊聊芽（苗苗）、家事芽、芽書櫃，加上首頁的「我的小芽」與「貼貼芽」。

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
