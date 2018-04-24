const mongoose = require('mongoose');
const Joi = require('joi');

//database model
//////////////////////////////////////////////////////////////////
const Task = mongoose.model('Task', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength:100,
        minLength:5
    },
    details: {
        type: String,
        required: true,
        maxLength:100,
        minLength:5
    }
}));

const validateTask = (task) => {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };
return Joi.validate(task,schema)
} 

 module.exports.task = Task;
 module.exports.validate = validateTask;