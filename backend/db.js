const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("data.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS responses (
    id TEXT PRIMARY KEY,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    raw_answers TEXT,
    openness REAL,
    conscientiousness REAL,
    extraversion REAL,
    agreeableness REAL,
    neuroticism REAL
  )
`);

module.exports = db;
