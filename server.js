const express = require('express'),
    ejs = require('ejs'),
    https = require('https'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    helmet = require('helmet'),
    cors = require('cors'),
    session = require('express-session');
    tasks = require('./routes/modules/tasks'),
    route = require('./routes/index');
    users = require('./routes/modules/users'),
    mongoose = require('mongoose'),
    port = process.env.PORT; 

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
// app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
//helmet implemented to make the app secure
app.use(helmet());
app.use('/api/tasks', tasks);
// app.use('/',users);

//joining app to public
app.use(express.static('public'));

// Connecting to database and starting the server
// mongoose.connect(`mongodb://${process.env.DB_USR}:${process.env.DB_PWD}@${process.env.DB_HOST}:27017/${process.env.DB_DATABASE}?authSource=admin`)
mongoose.connect('mongodb://127.0.0.1:27017/myAppDb')
.then(() => {
https.createServer(options, app).listen(3000 || port);
});

route(app);
