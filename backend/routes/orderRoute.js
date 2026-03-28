const express = require('express');
const { placeOrder, userOrders } = require('../controllers/orderController');
const fetchUser = require('../middleware/fetchUser');
const orderRouter = express.Router();

orderRouter.post('/place', fetchUser, placeOrder);
orderRouter.post('/history', fetchUser, userOrders);

module.exports = orderRouter;
