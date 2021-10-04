const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginUser, registerUser, forgetPassword, changePassword } =
  authController;

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
