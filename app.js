const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Загружаем переменные из .env

const app = express();
app.use(bodyParser.json());

// Import routes
const apiRoutes = require('./routes/api');
const featureRoutes = require('./routes/features');

// Serve static files
app.use(express.static(path.join(__dirname, 'front')));

// Use routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/features', featureRoutes);

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'signup.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
