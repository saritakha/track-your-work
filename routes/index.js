const express = require('express'),
      users = require('./modules/users'),
      tasks = require('./modules/tasks'),
      router = express.Router();  
      

router.use('/api/users',users);
router.use('/api/tasks',tasks);

//set route for accesing data
router.get('/', (req, res) => {
    res.render('index', { title : 'login'});
});

router.get('/setting', (req, res) => {
    res.render('setting', { title : 'Setting'});
});

module.exports = router;
