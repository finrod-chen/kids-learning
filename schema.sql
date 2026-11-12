-- 芽芽學堂 D1 (kids-reading) 資料表結構，2026-10-31 由線上資料庫匯出，僅供參考／重建用。
-- 線上資料庫已存在這些表，部署時不會執行本檔。

CREATE TABLE articles (id TEXT PRIMARY KEY, week TEXT NOT NULL, grade TEXT NOT NULL, data TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE INDEX idx_articles_week ON articles(week);

-- 舊版單人作答紀錄（多使用者前已改名）。注意：worker.js 不帶 uid 的舊路徑仍查 `answers` 表，目前前端都帶 uid，不會走到
CREATE TABLE "answers_legacy" (qid TEXT PRIMARY KEY, article_id TEXT NOT NULL, week TEXT NOT NULL, grade TEXT NOT NULL, first_choice TEXT NOT NULL, first_correct INTEGER NOT NULL, last_choice TEXT NOT NULL, last_correct INTEGER NOT NULL, tries INTEGER NOT NULL DEFAULT 1, first_at TEXT NOT NULL, last_at TEXT NOT NULL);
CREATE INDEX idx_answers_week ON "answers_legacy"(week);

-- 首頁 HTML（page / page:next / page:bak-*）、圖片（img:*）、注音字典（zydict）、PIN、家事清單等都存在這張表
CREATE TABLE tools (name TEXT PRIMARY KEY, code TEXT NOT NULL, updated_at TEXT NOT NULL);

CREATE TABLE users(id TEXT PRIMARY KEY, nick TEXT NOT NULL, grade TEXT NOT NULL, created_at TEXT);
CREATE TABLE uanswers(uid TEXT, qid TEXT, article_id TEXT, week TEXT, grade TEXT, first_choice TEXT, first_correct INT, last_choice TEXT, last_correct INT, tries INT, first_at TEXT, last_at TEXT, PRIMARY KEY(uid,qid));
CREATE TABLE ustate(uid TEXT, k TEXT, v TEXT, updated_at TEXT, PRIMARY KEY(uid,k));
CREATE TABLE ubooks(id TEXT PRIMARY KEY, uid TEXT NOT NULL, title TEXT NOT NULL, read_on TEXT NOT NULL, note TEXT NOT NULL DEFAULT '', created_at TEXT, updated_at TEXT);
CREATE INDEX idx_ubooks_uid ON ubooks(uid, read_on);
CREATE TABLE uchat (id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT NOT NULL, role TEXT NOT NULL, t TEXT NOT NULL, z TEXT, src TEXT, day TEXT NOT NULL, at TEXT NOT NULL);
CREATE INDEX uchat_uid ON uchat(uid, id);

-- 心情芽（2026-11 新增，建立方式見 migrations/0001_xinqingya.sql）
CREATE TABLE scenarios (id TEXT PRIMARY KEY, type TEXT NOT NULL CHECK(type IN ('emotion','conflict')), level INT NOT NULL CHECK(level BETWEEN 1 AND 3), data TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft', updated_at TEXT NOT NULL);
CREATE INDEX idx_scenarios_type ON scenarios(type, level, status);
CREATE TABLE mood_log (uid TEXT NOT NULL, day TEXT NOT NULL, temp INT, answers TEXT NOT NULL DEFAULT '{}', done INT NOT NULL DEFAULT 0, updated_at TEXT NOT NULL, PRIMARY KEY(uid, day));
