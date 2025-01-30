const express = require('express');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', protect, (req, res) => {
    res.json({ message: `Добро пожаловать, ${req.user.username}! Это защищенный маршрут.` });
});

module.exports = router;
