const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');

router.post('/login', login);
router.post('/logout', logout);
router.get('/check', checkAuth);

module.exports = router;
