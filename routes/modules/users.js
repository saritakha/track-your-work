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


router.post('/login',
  passport.authenticate('local', {failureRedirect:'/users/home'}),
  (req, res) => {
  res.redirect('/home');
  });

  passport.use(new localStrategy((username,password, done) => {
      User.getUserByUsername(username, (err, user) => {
          if(err) throw err;
          if(!user){
      return done(null, false, {message:'Unknown user'});
}  
     User.comparePassword(password,user.password),(err,isMatch) => {
        if(err) throw err;
        if(isMatch){
    return done(null, user);
} else{
return done(null, false, {message:'Invalid Password'});

}
     }   
})
  }));

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

    res.location('/login');
    res.redirect('/login');
   }
});
module.exports = router;