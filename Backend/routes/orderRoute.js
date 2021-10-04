const express = require('express');
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
router.get('/userorder', getEachUserOrder);
router.get('/:id', getOrderbyId);
router.post('/', uploadSingle, createOrder);
router.put('/', updateOrder);
router.delete('/', deleteOrder);
module.exports = router;
