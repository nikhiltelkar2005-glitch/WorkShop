const db = require('../database/db');

async function getAllProducts() {
    return await db.readDbWithDelay();
}

async function getProductById(id) {
    const products = await db.readDbWithDelay();
    return products.find(p => p.id == id);
}

module.exports = {
    getAllProducts,
    getProductById
};
