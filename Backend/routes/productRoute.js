const express = require('express');
const { authenticate } = require('../controllers/authController');
const router = express.Router();
const productController = require('../controllers/productController');
const { uploadSingle } = require('../controllers/uploadCloud');

const {
  getAllProduct,
  getProductbyId,
  createProduct,
  updateProduct,
  deleteProduct,
} = productController;

// router.put('/:productId/:skuId', uploadSingle ,updateProduct);
router.put(
  '/update-product/:productId/:wetSkuId/:drySkuId/:honeySkuId',
  uploadSingle,
  updateProduct
);
router.post('/create-product', authenticate, uploadSingle, createProduct);
router.get('/', getAllProduct);
router.get('/:id', getProductbyId);

router.delete('/', deleteProduct);

module.exports = router;
