const express = require('express'),
      config = require('config'),
      mongoose = require('mongoose'),
      users = require('./modules/users'),
      tasks = require('./modules/tasks'),
      auth = require('./modules/auth'),
      port = process.env.PORT,
      app = express();
      

if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

// Connecting to database and starting the server
//mongoose.connect(`mongodb:${process.env.DB_USR}:${process.env.DB_PWD}@${process.env.DB_HOST}:27017/${process.env.DB_DATABASE}?authSource=admin`)
mongoose.connect('mongodb://localhost/myAppDb')

app.use(express.json());
app.use('/api/users',users);
app.use('/api/tasks',tasks);
app.use('/api/auth',auth);

//set route for accesing data
app.get('/', (req, res) => {
    res.render('home', { title : 'login'});
});

app.get('/undone', (req, res) => {
    res.render('undone', { title : 'Undone'});
});

app.get('/done', (req, res) => {
    res.render('done', { title : 'Done'});
});

app.get('/home', (req, res) => {
    res.render('home', { title : 'Home'});
});

app.get('/new', (req, res) => {
    res.render('addTask', { title : 'New'});
});

app.get('/setting', (req, res) => {
    res.render('setting', { title : 'Setting'});
});



module.exports = app;
