const Inventory = require("../models/inventory");

const createInventory = (req, res) => {
  res.render('addItem');
};

const createInventoryPost = async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  try {
    const newItem = new Inventory({ name, category, quantity, price, description });
    await newItem.save();
    res.redirect('/inventory');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.render('index', { items });
  } catch (err) {
    res.status(500).send('Error retrieving inventory');
  }
};

const editInventory = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await Inventory.findById(itemId);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.render('editItem', { item });
  } catch (err) {
    res.status(500).send('Error fetching item for editing');
  }
};

const editInventoryPost = async (req, res) => {
  const itemId = req.params.id;
  const { name, category, quantity, price, description } = req.body;
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(itemId, { name, category, quantity, price, description }, { new: true });
    res.redirect('/inventory');
  } catch (err) {
    res.status(500).send('Error updating item');
  }
};

const deleteInventory = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await Inventory.findById(itemId);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.render('deleteConfirmation', { item });
  } catch (err) {
    res.status(500).send('Error fetching item for deletion');
  }
};

const deleteInventoryPost = async (req, res) => {
  const itemId = req.params.id;
  try {
    await Inventory.findByIdAndDelete(itemId);
    res.redirect('/inventory');
  } catch (err) {
    res.status(500).send('Error deleting item');
  }
};

module.exports = {
  getInventory,
  createInventory,
  createInventoryPost,
  editInventory,
  editInventoryPost,
  deleteInventory,
  deleteInventoryPost
};
