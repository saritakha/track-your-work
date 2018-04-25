const express = require('express'),
    ejs = require('ejs'),
    https = require('https'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    helmet = require('helmet'),
    route = require('./routes/index');

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
app.use(route);

//joining app to public
app.use(express.static('public'));

//https.createServer(options, app).listen(3000 || port);

app.listen(3000);
