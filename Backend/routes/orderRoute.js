const express = require('express');
const {
  authenticate,
  adminAuth,
  userVerifty,
} = require('../controllers/authController');
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

router.get('/', authenticate, adminAuth, getAllOrder);
router.get('/userorder', authenticate, userVerifty, getEachUserOrder);
router.get('/adminorder/:id', authenticate, adminAuth, getOrderbyId);
router.post('/', authenticate, adminAuth, uploadSingle, createOrder);
router.put('/:id', authenticate, adminAuth, updateOrder);
router.delete('/', deleteOrder);
module.exports = router;
