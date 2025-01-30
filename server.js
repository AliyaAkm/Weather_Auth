const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Настройка сессий
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false
}));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/protected', require('./routes/protectedRoutes'));

// Маршруты для фронта
app.get('/', (req, res) => {
    res.render('login', { title: 'Вход', error: null });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Регистрация', error: null });
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.render('dashboard', { title: 'Личный кабинет', user: req.session.user });
});


app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`));
