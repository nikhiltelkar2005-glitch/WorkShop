const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { cacheMiddleware } = require('../middleware/cache.middleware');

router.get('/', cacheMiddleware, productController.getProducts);
router.get('/:id', cacheMiddleware, productController.getProductById);

router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.patchProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
