const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres:jeevans2522j_@db.tjlxmsrlhchbicnzzdbb.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;