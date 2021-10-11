const express = require('express');
const router = express.Router();
const { authenticate, userVerifty } = require('../controllers/authController');

const {
  getProductInCart,
  createProductCart,
  deleteProductCart,
  getProductCartById,
  updateProductCart,
} = require('../controllers/cartController');
// Show in summary order
router.get('/', authenticate, userVerifty, getProductInCart);
userVerifty; // Click add to cart
router.post('/', authenticate, userVerifty, createProductCart);

// Click edit amount , choice detail
router.put('/:id', authenticate, userVerifty, updateProductCart);

// Click delete item in cart
router.delete('/:id', authenticate, userVerifty, deleteProductCart);
module.exports = router;
