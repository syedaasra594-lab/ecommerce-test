const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:pg12345@localhost:5432/ecommerce_test",
});

module.exports = pool;