const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/clock-in', userController.clockIn);
router.post('/request-break', userController.requestBreak);
router.get('/view-analytics', userController.analytics);

module.exports = router;