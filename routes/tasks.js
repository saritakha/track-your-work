const express = require('express');

//initiating router
const router = express.Router();

router.use('/' , (req, res) => {
    res.render('done');
});

router.use('/new' , (req, res) => {
    res.render('done');
});

module.exports = router;
