const Order = require('../models/Order');
const User = require('../models/User');

// Place Order
const placeOrder = async (req, res) => {
    try {
        const newOrder = new Order({
            userId: req.user.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        
        await newOrder.save();

        // Clear user cart logic
        let userData = await User.findById(req.user.id);
        let cartData = userData.cartData;
        for (const item in cartData) {
            cartData[item] = 0;
        }
        await User.findByIdAndUpdate(req.user.id, { cartData });

        res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error placing order" });
    }
}

// Get User Orders
const userOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error retrieving orders" });
    }
}

module.exports = {
    placeOrder,
    userOrders
};
