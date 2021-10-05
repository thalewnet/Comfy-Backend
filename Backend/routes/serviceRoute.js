const express = require('express');
const router = express.Router();
const {
  getProvinces,
  getDistrict,
  getAmphoeZip,
} = require('../controllers/serviceController');

router.get('/provinces', getProvinces);
router.get('/districts', getDistrict);
router.get('/subdistricts', getAmphoeZip);

module.exports = router;
