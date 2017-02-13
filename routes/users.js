var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const userDb = require('../db/userDb')
const eventsDb = require('../db/eventsDb')

/* GET users listing. */
router.get('/', function(req, res, next) {
  userDb.getUserById(1)
    .then((users) => {
      res.json(users[0])
    })
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user);
  eventsDb.getAllEvents()
    .then(events => {
      res.json({user: req.user, events})
    })
    .catch(err => {
      res.status(400)
      res.send(err)
    })
})

module.exports = router;
