const mongoose = require('mongoose');
const Joi = require('joi');

//database model
//////////////////////////////////////////////////////////////////
const Task = mongoose.model('Task', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength:255,
        minLength:5
    },
    details: {
        type: String,
        required: true,
        maxLength:255,
        minLength:5
    },
    time: {
        type:Date
    }
}));

const validateTask = (task) => {
    const schema = {
        title: Joi.string().min(1).max(50).required(),
        details: Joi.string().min(5).max(50).required()
    };
return Joi.validate(task,schema)
} 

 module.exports.Task = Task;
 module.exports.validate = validateTask;