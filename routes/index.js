const express = require('express'),
      mongoose = require('mongoose'),
      users = require('./modules/users'),
      tasks = require('./modules/tasks'),
      router = express.Router();  
      

router.use('/api/users',users);
router.use('/api/tasks',tasks);

//set route for accesing data
router.get('/', (req, res) => {
    res.render('index', { title : 'login'});
});

router.get('/undone', (req, res) => {
    res.render('undone', { title : 'Undone'});
});

router.get('/done', (req, res) => {
    res.render('done', { title : 'Done'});
});

router.get('/home', (req, res) => {
    res.render('home', { title : 'Home'});
});

router.get('/new', (req, res) => {
    res.render('addTask', { title : 'New'});
});

router.get('/setting', (req, res) => {
    res.render('setting', { title : 'Setting'});
});

module.exports = router;
