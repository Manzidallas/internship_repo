const express = require('express');
const { stockIn, stockOut, getReport } = require('../controllers/stockController');
const router = express.Router();

router.post('/in', stockIn);
router.post('/out', stockOut);
router.get('/report', getReport);

module.exports = router;
