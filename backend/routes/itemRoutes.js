const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

// GET /api/items
// View all items.
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to get items" });
  }
});

// POST /api/items
// Add a new item.
router.post("/", async (req, res) => {
  try {
    const { name, quantity, description } = req.body;

    const newItem = new Item({
      name,
      quantity,
      description
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to add item" });
  }
});

// DELETE /api/items/:id
// Delete one item by MongoDB id.
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item" });
  }
});

module.exports = router;
