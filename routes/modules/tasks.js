const express = require('express'),
     _ =require('lodash'),
     {validate,Task} = require('../../models/task');

//initiating router
const router = express.Router();

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

     //using lodash to define schema
    let task = new Task(_.pick(req.body,['title', 'details']));
    task =  await task.save();

    res.send(task);
})

//create api
//////////////////////////////////////////////////////////////////
router.get('/', (req, res) => {
    Task.find({}, (err, data) => {
        res.json(data);
    })
})

module.exports = router;
