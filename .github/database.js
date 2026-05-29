const sqlite3 = require("sqlite3").verbose();

// create or open database file
const db = new sqlite3.Database("users.db");

// create users table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

module.exports = db;