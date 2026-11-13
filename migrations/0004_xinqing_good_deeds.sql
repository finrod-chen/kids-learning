-- 心情芽：每日好事打勾（幫助／讚美／關心／照顧別人）
-- 只新增資料表，不動既有資料；可重複執行。
-- 執行：npx wrangler d1 execute kids-reading --remote --file=migrations/0004_xinqing_good_deeds.sql
CREATE TABLE IF NOT EXISTS good_deeds (uid TEXT NOT NULL, day TEXT NOT NULL, deeds TEXT NOT NULL DEFAULT '[]', updated_at TEXT NOT NULL, PRIMARY KEY(uid, day));
