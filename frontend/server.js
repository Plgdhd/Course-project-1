const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/index.html'));
});

app.get('/flights', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/flights.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/about.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/register.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/profile.html'));
});

app.get('/flight-card', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/flight-card.html'));
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});