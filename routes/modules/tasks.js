const express = require('express'),
     moment = require('moment'),
     {validate,Task} = require('../../models/task');

//initiating router
const router = express.Router();
router.post('/',  (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

//post to form
//////////////////////////////////////////////////////////////////
    const myTask = new Task({
        title: req.body.title,
        details:req.body.details,
        plan1:req.body.plan1,
        plan2:req.body.plan2,
        time: moment(Date.now()).format('LLLL')
    });
    console.log(myTask);
    myTask.save();

    res.redirect('/users/undone');
})

//delete
router.delete('/:id', function (req, res) {
    let id = req.params.id;
    Task.remove({_id: id}, (err) => {
      if(err)  console.log(err);
    });
    res.redirect('/users/undone');
});


module.exports = router;

