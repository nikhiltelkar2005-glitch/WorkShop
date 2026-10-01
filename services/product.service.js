const db = require('../database/db');

async function getAllProducts() {
    return await db.readDbWithDelay();
}

async function getProductById(id) {
    const products = await db.readDbWithDelay();
    return products.find(p => p.id == id);
}

async function createProduct(productData) {
    const products = await db.readDb();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, ...productData };
    products.push(newProduct);
    await db.writeDb(products);
    return newProduct;
}

async function updateProduct(id, updateData, isPatch = false) {
    const products = await db.readDb();
    const index = products.findIndex(p => p.id == id);
    if (index === -1) {
        return null;
    }

    if (isPatch) {
        products[index] = { ...products[index], ...updateData, id: products[index].id };
    } else {
        products[index] = { ...updateData, id: products[index].id };
    }

    await db.writeDb(products);
    return products[index];
}

async function deleteProduct(id) {
    const products = await db.readDb();
    const index = products.findIndex(p => p.id == id);
    if (index === -1) {
        return null;
    }

    const deletedProduct = products.splice(index, 1)[0];
    await db.writeDb(products);
    return deletedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
