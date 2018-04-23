const mongoose = require('mongoose');
const Joi = require('joi');

//database model
//////////////////////////////////////////////////////////////////
const User = mongoose.model('User', new mongoose.Schema({
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
}));

const validateUser = (user) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
return Joi.validate(user,schema)
} 

 module.exports.user = User;
 module.exports.validate = validateUser;