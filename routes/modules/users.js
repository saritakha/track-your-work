const express = require('express'),
router = express.Router()
passport = require('passport'),
LocalStrategy = require('passport-local'),
User = require('../../models/user');

/**
 * @api {get} /home Go to home
 * @apiName home
 */

router.get('/home', (req, res) => {
    res.render('home', { title : 'Home'});
});

/**
 * @api {get} /newTask Go to  form to add task
 * @apiName newTask
 */
router.get('/newTask', (req, res) => {
    res.render('addTask', { title : 'New'});
});

/**
 * @api {get} /undone Go to worklist
 * @apiName undone
 */
router.get('/undone', (req, res) => {
    res.render('undone', { title : 'Undone'});
});

module.exports = router;