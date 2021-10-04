const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { getAllUser, getUserbyId, createUser, updateUser, deleteUser } =
  userController;

router.get('/', getAllUser);
router.get('/', getUserbyId);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;
