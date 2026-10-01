const productService = require('../services/product.service');
const { clearCache } = require('../middleware/cache.middleware');

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

async function createProduct(req, res) {
    try {
        const newProduct = await productService.createProduct(req.body);
        clearCache(); 
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateProduct(req, res) {
    try {
        const productId = req.params.id;
        const updatedProduct = await productService.updateProduct(productId, req.body, false);
        
        if (updatedProduct) {
            clearCache();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function patchProduct(req, res) {
    try {
        const productId = req.params.id;
        const patchedProduct = await productService.updateProduct(productId, req.body, true);
        
        if (patchedProduct) {
            clearCache(); 
            res.json(patchedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;
        const deletedProduct = await productService.deleteProduct(productId);
        
        if (deletedProduct) {
            clearCache();
            res.json({ message: 'Product deleted successfully', product: deletedProduct });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
