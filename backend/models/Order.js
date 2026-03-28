const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Processing" },
    date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
