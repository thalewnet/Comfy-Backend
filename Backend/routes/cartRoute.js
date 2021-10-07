const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/authController');

const {
  getProductInCart,
  createProductCart,
  deleteProductCart,
  getProductCartById,
  updateProductCart,
} = require('../controllers/cartController');
// Show in summary order
router.get('/', authenticate, getProductInCart);
router.get('/:id', authenticate, getProductCartById);
// Click add to cart
router.post('/', authenticate, createProductCart);

// Click edit amount , choice detail
router.put('/:id', authenticate, updateProductCart);

// Click delete item in cart
router.delete('/:id', authenticate, deleteProductCart);
module.exports = router;
