
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/myAppDb');
const db = mongoose.connection;

// User Schema 
const UserSchema = new Schema({
    username: {
        type: String,
        index: true
    }, 
    name: { type: String },
    email: { type: String },
    password: { type: String },
    profileimage: {type: String}
});

const User = mongoose.model('User', UserSchema );
module.exports = User;

module.exports.createUser = (newUser, callBack) => 
{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callBack);
        });
    });
}

module.exports.getUserByUsername = function(username, callBack){
    User.findOne({username: username}, callBack);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(inPassword, hash, callback){
    bcrypt.compare(inPassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    })
}