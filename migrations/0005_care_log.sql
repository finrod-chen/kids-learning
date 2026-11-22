-- 照顧芽：孩子記錄今天照顧／幫助了哪位兄弟姐妹
-- 只新增資料表，不動既有資料；可重複執行。
-- 執行：npx wrangler d1 execute kids-reading --remote --file=migrations/0005_care_log.sql
CREATE TABLE IF NOT EXISTS care_log (id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT NOT NULL, to_uid TEXT NOT NULL, to_nick TEXT NOT NULL, what TEXT NOT NULL, z TEXT NOT NULL DEFAULT '', mood TEXT NOT NULL DEFAULT '', day TEXT NOT NULL, at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_care_uid_day ON care_log(uid, day);
