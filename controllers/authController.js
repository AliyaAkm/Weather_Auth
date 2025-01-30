const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) return res.render('register', { title: 'Регистрация', error: 'Пользователь уже существует' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.redirect('/');
    } catch (error) {
        res.render('register', { title: 'Регистрация', error: 'Ошибка сервера' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.render('login', { title: 'Вход', error: 'Неверные учетные данные' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.render('login', { title: 'Вход', error: 'Неверные учетные данные' });

        req.session.user = { id: user._id, username: user.username };
        res.redirect('/dashboard');
    } catch (error) {
        res.render('login', { title: 'Вход', error: 'Ошибка сервера' });
    }
};
