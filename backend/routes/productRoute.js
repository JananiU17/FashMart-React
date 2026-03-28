const express = require('express');
const { addProduct, removeProduct, getAllProducts, getNewCollections, getPopularInWomen } = require('../controllers/productController');
const productRouter = express.Router();

productRouter.post('/addproduct', addProduct);
productRouter.post('/removeproduct', removeProduct);
productRouter.get('/allproducts', getAllProducts);
productRouter.get('/newcollections', getNewCollections);
productRouter.get('/popularinwomen', getPopularInWomen);

module.exports = productRouter;
