const express = require('express'),
multer = require('multer'),
upload = multer({dest: './uploads'}),
router = express.Router()
expressValidator = require('express-validator'),
passport = require('passport'),
localStrategy = require('passport-local'),
User = require('../../models/user');

router.use(expressValidator());

router.get('/register', (req, res, next) => {
    res.render('register', { title : 'Register'});
});

router.get('/login', (req, res, next) => {
    res.render('index', { title : 'login'});
});

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

router.post('/register', upload.single('profileImage'),(req, res, next) => {
   let name = req.body.name,
   email = req.body.email,
   username = req.body.username,
   password = req.body.password1,
   password2 = req.body.password2;

   if(req.file) {
       console.log('uploading file.....');
       var profileimage = req.file.filename;
   }
   else{
       console.log('no file uploaded...');
       var profileimage = 'noimage.jpg';
   }

   req.checkBody('name','Name field is required').notEmpty();
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
        name: name,
        email: email,
        username: username,
        password: password,
        profileimage: profileimage
    });
    User.createUser(newUser, (err, user) => {
     if(err) throw err;
     console.log(user);
    });

    res.redirect('/login');
   }
});

    // Authenicating the user input 
    passport.use(new LocalStrategy(
        function(username, password, done){
            User.getUserByUsername(username, function(err, user){
                if (err) throw err;
                if(!user){
                    return done(null, false, {message: 'Invalid User'});
                    console.log('Invalid User');
                }
                console.log('Username is Matched');
                User.comparePassword(password, user.password, function(err, isMatch){
                    if(err) throw err;
                    if(isMatch){
                        console.log('Password is Matched');
                        return done(null, user);
                    } else {
                        console.log('Invalid Password');
                        return done(null, false, {message: 'Invalid Password'});
                    }
                });

            });
        }
    ));

    // Serialize the User data
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    // Deserialize User Data
    passport.deserializeUser(function(id, done) {
        User.getUserById(id, function(err, user) {
          done(err, user);
        });
    });

    // Getting login data
    router.post('/login',
        passport.authenticate('local', {successRedirect: '/dashboard', failureRedirect: '/login'}),
        (req, res) => {
            res.redirect('/home');
        }
    )

    // Logging Out 
    router.get('/logout', (req, res) => {
        req.logout();
        console.log('User is logged out.');
        res.redirect('/login');
    })

module.exports = router;