
// import packages
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

// global constants
const port = 3000;

app.use(express.static('public'));
app.use('/', express.static(__dirname + 'public/css'));
app.use(cookieParser());

const connectPages = path => {
    app.get(path, (req, res) => {
        res.sendFile(`${__dirname}/views${path}.html`);
    });
}

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

connectPages('/home');
connectPages('/signin');
connectPages('/signup');
connectPages('/console');

// parse all body requests
app.use(express.json());

// middleware to handle all required requests
app.use('/user', require('./routes/otherRequests.js'));
app.use('/user', require('./routes/postRequests.js'));

// connect to database
mongoose.connect(process.env.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('database connected [ignore]')
});

// boot server
app.listen(port, () => {
    console.log('\nserver running [ignore]')
});