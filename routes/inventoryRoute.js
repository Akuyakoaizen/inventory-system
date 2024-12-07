const express = require('express');
const router = express.Router();
const { getInventory, createInventory, createInventoryPost, editInventory, editInventoryPost, deleteInventory, deleteInventoryPost } = require("../controllers/inventoryController");

router.get("/", getInventory);
router.get("/add", createInventory);
router.post("/", createInventoryPost);
router.get("/edit/:id", editInventory);
router.put("/edit/:id", editInventoryPost);
router.get("/delete/:id", deleteInventory);
router.delete("/delete/:id", deleteInventoryPost);

module.exports = router;
