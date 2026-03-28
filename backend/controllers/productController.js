const Product = require('../models/Product');

// Add Product
const addProduct = async (req, res) => {
    try {
        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        } else {
            id = 1;
        }

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        
        await product.save();
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to add product" });
    }
};

// Remove Product
const removeProduct = async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to remove product" });
    }
}

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        let products = await Product.find({});
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to fetch products" });
    }
}

// Get New Collections
const getNewCollections = async (req, res) => {
    try {
        let products = await Product.find({});
        let newcollection = products.slice(-8); // Get last 8 products
        res.send(newcollection);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to fetch new collections" });
    }
}

// Get Popular in Women
const getPopularInWomen = async (req, res) => {
    try {
        let products = await Product.find({ category: "women" });
        let popular_in_women = products.slice(0, 4); // Get first 4 products in women category
        res.send(popular_in_women);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to fetch popular products" });
    }
}

module.exports = {
    addProduct,
    removeProduct,
    getAllProducts,
    getNewCollections,
    getPopularInWomen
};
