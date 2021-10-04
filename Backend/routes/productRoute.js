const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { uploadSingle } = require('../controllers/uploadCloud');

const {
  getAllProduct,
  getProductbyId,
  getAllImported,
  getAllLocal,
  createProduct,
  updateProduct,
  deleteProduct,
} = productController;

// router.put('/:productId/:skuId', uploadSingle ,updateProduct);
router.put('/:productId/:skuId', updateProduct);
router.get('/', getAllProduct);
router.get('/:id', getProductbyId);
// router.post('/create-product', uploadSingle, createProduct);
router.post('/create-product', createProduct);
router.delete('/', deleteProduct);
router.get('/imported', getAllImported);
router.get('/local', getAllLocal);
module.exports = router;
