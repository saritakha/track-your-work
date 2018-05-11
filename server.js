const express = require('express'),
    ejs = require('ejs'),
    https = require('https'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    helmet = require('helmet'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    expressValidator = require('express-validator'),
    users = require('./routes/modules/users'),
    {validate,Task} = require('./models/task'),
    db = require('./config/config.js'),
    routes = require('./routes/index');

//initiating app
const app = express();

//tls/ssl certificate/key for https
const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
    key: sslkey,
    cert: sslcert
};

//set view engine
app.set('view engine', 'ejs');

//joining app to public
app.use(express.static('public'));

//upload file
// app.use(multer({dest:'./uploads'}));

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

//helmet implemented to make the app secure
app.use(helmet());
app.use('/',routes);
app.use('/users',users);



//using express session
app.use(session({
    secret: 'secret',
    saveUninitialized:true,
    resave:true
}));

app.use(passport.initialize());
app.use(passport.session());

// Global Variable for User Login
app.use(function(req, res, next){
    res.locals.user = req.user || null;
    if(req.user!= null){
      app.loggedUser = req.user._id;
      res.locals.loggedUser = req.user._id;
      module.exports.loggedUser = app.loggedUser;
    } else {
      app.loggedUser = null;
      res.locals.loggedUser = null;
      module.exports.loggedUser = app.loggedUser;
    }
    next();
  })

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
  app.post('/',
  passport.authenticate('local', {successRedirect: '/users/home', failureRedirect: '/users/home'}),
  (req, res) => {
      res.redirect('/users/home');
  }
)
  
https.createServer(options, app).listen(3000 || db.process.env.PORT);

// Connecting to database and starting the server

require('dotenv').config();
mongoose.connect('mongodb://heroku_0j98rs97:jgtn160mid326um362ha4tkarf@ds119640.mlab.com:19640/heroku_0j98rs97');

//mongoose.connect(`mongodb://${db.usr}:${db.pwd}@${db.host}:${db.port}/${db.dbName}`)
//create api
//////////////////////////////////////////////////////////////////
app.get('/api', (req, res) => {
    Task.find({}, (err, data) => {
        res.json(data);
    })
})


