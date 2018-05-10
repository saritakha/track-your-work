const express = require('express'),
      users = require('./modules/users'),
      tasks = require('./modules/tasks'),
      passport = require('passport'),
LocalStrategy = require('passport-local'),
User = require('../models/user'),
      router = express.Router();  
 
//used to work req.checkBody
const expressValidator = require('express-validator');
router.use(expressValidator())

router.use('/users',users);
router.use('/tasks',tasks);

//set route for accesing data
router.get('/', (req, res) => {
    res.render('index', { title : 'login'});
});

 // Logging Out 
router.get('/logout', (req, res) => {
    req.logout();
    console.log('User is logged out.');
    res.render('index', { title : 'login'});
})

router.get('/register', (req, res, next) => {
    res.render('register', { title : 'Register'});
});

router.post('/register', (req, res, next) => {
    let email = req.body.email,
    username = req.body.username,
    password = req.body.password1,
    password2 = req.body.password2;

    req.checkBody('email','Email field is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('username','UserName field is required').notEmpty();
    req.checkBody('password1','Password field is required').notEmpty();
    req.checkBody('password2','Passwords do not match').equals(req.body.password1);
    
    const errors = req.validationErrors();
 
    if(errors){
        console.log(errors);
        res.render('register', {title : 'Register' });
    }else{
     const newUser = new User({
         email: email,
         username: username,
         password: password
     });
     User.createUser(newUser, (err, user) => {
      if(err) throw err;
      console.log(user);
     });
 
     res.redirect('/');
    }
 });


 
module.exports = router;
