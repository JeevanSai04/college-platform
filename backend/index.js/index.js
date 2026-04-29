const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (ADD THIS)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Test DB
app.get("/test-db", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

// Colleges
app.get("/colleges", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM colleges");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching colleges");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});