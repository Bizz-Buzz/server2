var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const userDb = require('../db/userDb')
const eventsDb = require('../db/eventsDb')
const groupsDb = require('../db/groupsDb')

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
  groupsDb.getGroupsByUser(req.user.user_id)
    .then((groups) => {
      groupsDb.getGroupById(1)
        .then((currentGroup) => {
          res.json({user: req.user, groups, currentGroup})
        })
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router;
