const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const fetchUser = require('../middleware/fetchUser');
const cartRouter = express.Router();

cartRouter.post('/addtocart', fetchUser, addToCart);
cartRouter.post('/removefromcart', fetchUser, removeFromCart);
cartRouter.post('/getcart', fetchUser, getCart);

module.exports = cartRouter;
