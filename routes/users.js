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
  console.log(req.user);
  groupsDb.getGroupsByUser(req.user.user_id)
    .then((groups) => {
      console.log({groups});
      groupsDb.getGroupById(1)
        .then((currentGroup) => {
          console.log({currentGroup});
          res.json({user: req.user, groups, currentGroup})
        })
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router;
