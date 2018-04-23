const express = require('express'),
    ejs = require('ejs'),
    https = require('https'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    helmet = require('helmet'),
    cors = require('cors'),
    session = require('express-session');
    tasks = require('./routes/tasks'),
    users = require('./routes/users');

//initiating app
const app = express();

//set view engine
app.set('view engine', 'ejs');
// app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/api/tasks', tasks);
// app.use('/',users);

//joining app to public
app.use(express.static('public'));


//set route for accesing data
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/undone', (req, res) => {
    res.render('undone');
});

app.get('/done', (req, res) => {
    res.render('done');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/new', (req, res) => {
    res.render('addTask');
});

//listening port 3000
app.listen(3000, () => {
    console.log('server running');
});