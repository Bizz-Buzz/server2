var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const userDb = require('../db/userDb')
const eventsDb = require('../db/eventsDb')

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.json({
      'error':
      {
        'type': 'auth',
        'code': 401,
        'message': 'authentication failed'
      }
    })
  }
}

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
