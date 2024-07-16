const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../Controller/userController.js');

router.post('/register',userController.registerUser)
router.get('/login',userController.loginUser)

module.exports = router;