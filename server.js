const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//joining app to public
app.use(express.static('public'));

//listening port 3000
app.listen(3000, () => {
console.log('server running');
});

// //connect database 
// mongoose.connect('mongodb://localhost/myDB');

// //getModel
// const workModels = getSchema(workModel,"Works");
app.get('/try', (req, res) => {
        res.redirect('home.html');
    
})
