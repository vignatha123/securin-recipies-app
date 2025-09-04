import express from "express";
import pool from "../db.js";

const router = express.Router();

// Get all recipes (paginated + sorted by rating)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const total = await pool.query("SELECT COUNT(*) FROM recipes");
  const result = await pool.query(
    "SELECT * FROM recipes ORDER BY rating DESC NULLS LAST LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  res.json({
    page: Number(page),
    limit: Number(limit),
    total: Number(total.rows[0].count),
    data: result.rows,
  });
});

// Search recipes
router.get("/search", async (req, res) => {
  let query = "SELECT * FROM recipes WHERE 1=1";
  let values = [];
  let idx = 1;

  if (req.query.title) {
    query += ` AND title ILIKE $${idx++}`;
    values.push(%${req.query.title}%);
  }
  if (req.query.cuisine) {
    query += ` AND cuisine = $${idx++}`;
    values.push(req.query.cuisine);
  }
  if (req.query.rating) {
    const [op, val] = req.query.rating.match(/(<=|>=|=|<|>)(\d+(\.\d+)?)/).slice(1,3);
    query += ` AND rating ${op} $${idx++}`;
    values.push(val);
  }
  if (req.query.total_time) {
    const [op, val] = req.query.total_time.match(/(<=|>=|=|<|>)(\d+)/).slice(1,3);
    query += ` AND total_time ${op} $${idx++}`;
    values.push(val);
  }

  const result = await pool.query(query, values);
  res.json({ data: result.rows });
});

export default router;
