const express = require("express");
const router = express.Router();
const db = require("../config/db");

// API thêm sản phẩm
router.post("/add", async (req, res) => {
  const { name, price } = req.body;
  try {
    const [result] = await db.query("INSERT INTO products (name, price) VALUES (?, ?)", [name, price]);
    res.json({ message: "Sản phẩm đã được thêm", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// API tìm kiếm sản phẩm
router.get("/search", async (req, res) => {
    const { name } = req.query;
    try {
      const [products] = await db.query("SELECT * FROM products WHERE name LIKE ?", [`%${name}%`]);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
  