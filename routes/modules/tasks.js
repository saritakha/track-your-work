const express = require('express'),
     moment = require('moment'),
     {validate,Task} = require('../../models/task');

//initiating router
const router = express.Router();
/**
 * @api {post} /tasks  tasks posted
 * @apiName postTasks
 */
router.post('/',  (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

//post to form
//////////////////////////////////////////////////////////////////
    const myTask = new Task({
        title: req.body.title,
        details:req.body.details,
        plan:req.body.plan,
        time: moment(Date.now()).format('LL')
    });
    console.log(myTask);
    myTask.save();

    res.redirect('/users/undone');
})

//delete
/**
 * @api {delete} /tasks/:id  Go to task with some id
 * @apiName deleteTasks
 */
router.delete('/:id',  function (req, res) {
    let id = req.params.id;
    Task.remove({_id: id}, (err) => {
      if(err)  console.log(err);
    });
    res.redirect('/users/undone');
});


//delete
/**
 * @api {patch} /tasks/:id  update task
 * @apiName patchTasks
 */
router.patch('/:id', function (req, res) {
    res.redirect('/update');
    var updateObject = {
        title: req.body.title,
        details: req.body.details
     }
    var id = req.params.id;
    db.users.update({_id  : ObjectId(id)}, {$set: updateObject});
});


module.exports = router;

