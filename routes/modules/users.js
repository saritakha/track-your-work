const express = require('express'),
router = express.Router()
passport = require('passport'),
LocalStrategy = require('passport-local'),
User = require('../../models/user');


router.get('/home', (req, res) => {
    res.render('home', { title : 'Home'});
});

router.get('/newTask', (req, res) => {
    res.render('addTask', { title : 'New'});
});

router.get('/done', (req, res) => {
    res.render('done', { title : 'Done'});
});

router.get('/undone', (req, res) => {
    res.render('undone', { title : 'Undone'});
});

module.exports = router;