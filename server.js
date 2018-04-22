const express = require('express'),
      ejs = require('ejs'),
      https = require('https'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      helmet = require('helmet'),
      cors = require('cors'),
      session = require('express-session');
      tasks = require('./routes/task'),
      users = require('./routes/user');

const app = express();

//set view engine
app.set('view engine', 'ejs');
app.use('/api/tasks',tasks);
app.use('/',users);


//joining app to public
app.use(express.static('public'));

//set route for accesing data
app.get('/', (req, res) => {
        res.render('home');
    });

    
//listening port 3000
app.listen(3000, () => {
console.log('server running');
});

