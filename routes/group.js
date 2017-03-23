var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const groupsDb = require('../db/groupsDb')
const groupDb = require('../db/groupDb')

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

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  groupDb.getUsersByGroupId(Number(req.query.group_id))
    .then(groupMembers => {
        groupDb.getGroupSettings(Number(req.query.group_id))
          .then(group => {
            res.json({groupMembers, group: group[0]})
          })
    })
    //Still needs to interact with incoming/outgoing group invites
});

module.exports = router
