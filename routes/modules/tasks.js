const express = require('express');
const {validate,task} = require('../../models/task');

//initiating router
const router = express.Router();

router.use('/' , (req, res) => {
    res.render('done');
});

module.exports = router;
