const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const url = "http://localhost:4000/images/product_";

const getDetails = (id) => {
    let name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse";
    let category = "women";
    if (id >= 13 && id <= 24) { name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket"; category = "men"; }
    if (id >= 25 && id <= 36) { name = "Boys Orange Colourblocked Hooded Sweatshirt"; category = "kid"; }
    
    let new_price = 85.0; let old_price = 120.5;
    if (id === 1) { new_price = 50.0; old_price = 80.5; }
    if (id === 3) { new_price = 60.0; old_price = 100.5; }
    if (id === 4) { new_price = 100.0; old_price = 150.0; }

    return { name, category, new_price, old_price };
}

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");
        
        // Clear existing products to prevent duplicates (optional)
        await Product.deleteMany({}); 

        let products = [];
        for (let i = 1; i <= 36; i++) {
            let { name, category, new_price, old_price } = getDetails(i);
            products.push({
                id: i,
                name: name,
                category: category,
                image: `${url}${i}.png`,
                new_price: new_price,
                old_price: old_price
            });
        }

        await Product.insertMany(products);
        console.log("Database populated successfully with 36 products!");
    } catch (err) {
        console.error("Error seeding database: ", err);
    } finally {
        mongoose.connection.close();
    }
}

seedDB();
