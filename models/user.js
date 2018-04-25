const mongoose = require('mongoose'),
      Joi = require('joi'),
      config = require('config'),
      jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength:50,
        minLength:5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength:255,
        minLength:5
    },
    password: {
        type: String,
        required: true,
        maxLength:1025,
        minLength:5
    }
});

userSchema.methods.generateAuthToken = function (){ // we don't use arrow function if we want to use 'this' 
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey') );
    return token;
}

//database model
//////////////////////////////////////////////////////////////////
const User = mongoose.model('User',userSchema );

const validateUser = (user) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
return Joi.validate(user,schema)
} 

 module.exports.User = User;
 module.exports.validate = validateUser;