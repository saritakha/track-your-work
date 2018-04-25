const {User} = require('../../models/user'),
     jwt = require('jsonwebtoken'),
     config = require('config'),
      _ = require('lodash'),
      bcrypt = require('bcrypt'),
      Joi = require('Joi'),
      mongoose = require('mongoose'),
      express = require('express'),
      cors = require('cors'),
      router = express.Router();

router.post('/',  async (req, res) => {
const { error } = validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

let user = await User.findOne({ email: req.body.email });
if(!user) return res.status(400).send('Invalid email or password');

const validPassword = await bcrypt.compare(req.body.password,user.password);
if(!validPassword) return res.status(400).send('Invalid email or password'); 

const token = user.generateAuthToken();
res.send(token);
});

const validate = (req) => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
return Joi.validate(req,schema)
} 

module.exports = router;
