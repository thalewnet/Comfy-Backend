const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/authController');

const {
  getProductInCart,
  createProductCart,
} = require('../controllers/cartController');
// Show in summary order
router.get('/', getProductInCart);

// Click add to cart
router.post('/', createProductCart);

// Click edit amount , choice detail
// router.put('/:id', authenticate, updateProductCart);

// Click delete item in cart
// router.delete('/:id', authenticate, deleteProductCart);
module.exports = router;
