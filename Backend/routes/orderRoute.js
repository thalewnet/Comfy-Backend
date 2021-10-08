const express = require('express');
const { authenticate } = require('../controllers/authController');
const router = express.Router();
const orderControlloer = require('../controllers/orderController');
const { uploadSingle } = require('../controllers/uploadCloud');
const {
  getAllOrder,
  getOrderbyId,
  createOrder,
  updateOrder,
  deleteOrder,
  getEachUserOrder,
} = orderControlloer;

router.get('/', getAllOrder);
router.get('/userorder', authenticate, getEachUserOrder);
router.get('/:id', getOrderbyId);
router.post('/', authenticate, uploadSingle, createOrder);
router.put('/', updateOrder);
router.delete('/', deleteOrder);
module.exports = router;
