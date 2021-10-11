const express = require('express');
const { authenticate, adminAuth } = require('../controllers/authController');
const router = express.Router();
const productController = require('../controllers/productController');
const { uploadSingle } = require('../controllers/uploadCloud');

const {
  getAllProduct,
  getProductbyId,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducAdminPage,
  reactiveProduct,
} = productController;

// router.put('/:productId/:skuId', uploadSingle ,updateProduct);
router.put(
  '/update-product/:productId/:wetSkuId/:drySkuId/:honeySkuId',
  authenticate,
  uploadSingle,
  updateProduct
);
router.post('/create-product', authenticate, uploadSingle, createProduct);
router.get('/', getAllProduct);
router.get('/admin', authenticate, adminAuth, getAllProducAdminPage);
router.get('/:id', getProductbyId);
router.put('/:id', authenticate, adminAuth, reactiveProduct);
router.delete('/:id', authenticate, adminAuth, deleteProduct);

module.exports = router;
