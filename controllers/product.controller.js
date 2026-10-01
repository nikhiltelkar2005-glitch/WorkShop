const productService = require('../services/product.service');

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getProductById(req, res) {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getProducts,
    getProductById
};
