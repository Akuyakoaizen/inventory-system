const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
    description: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
})

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory
