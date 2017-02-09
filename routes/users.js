var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const userDb = require('../db/userDb')

/* GET users listing. */
router.get('/', function(req, res, next) {
  userDb.getUserById(1)
    .then((users) => {
      res.json(users[0])
    })
});

router.get('/login', function(req, res) {
  res.send('login')
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user);
  res.json(req.user)
})

module.exports = router;
