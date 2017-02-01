var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const userDb = require('../db/userDb')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({users: [{name: 'Timmy'}]});
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
})

module.exports = router;
