const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Нет доступа, нужен токен' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Неверный токен' });
    }
};

module.exports = protect;
