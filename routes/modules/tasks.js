const express = require('express'),
     _ =require('lodash'),
     {validate,Task} = require('../../models/task');

//initiating router
const router = express.Router();

router.get('/' , async (req, res) => {
    const tasks = await Task.find().sort('title');
    res.send(tasks);
});

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

     //using lodash to define schema
    let task = new Task(_.pick(req.body,['title', 'details']));
    task =  await task.save();

    res.send(task);
})

module.exports = router;
