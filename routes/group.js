var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const groupsDb = require('../db/groupsDb')
const groupDb = require('../db/groupDb')
const invitesDb = require('../db/invitesDb')
const userDb = require('../db/userDb')

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
            invitesDb.getIncomingByGroupId(Number(req.query.group_id))
              .then(invitesIncoming => {
                  invitesDb.getOutgoingByGroupId(Number(req.query.gorup_id))
                    .then(invitesOutgoing => {
                      res.json({groupMembers, group: group[0], invitesIncoming, invitesOutgoing})
                    })
              })
          })
    })
});

router.post('/invites/incoming/new', ensureAuthenticated, (req, res) => {
  console.log("incoming");
  invitesDb.createIncomingInvite(req.body)
    .then((invite_id) => {
      res.json(invite_id[0])
    })
})

router.post('/invites/incoming/new', ensureAuthenticated, (req, res) => {
  console.log("outgoing");
  invitesDb.createOutgoingInvite(req.body)
    .then(invite_id => {
      res.json(invite_id[0])
    })
})

function checkValid(user, group_user_ids) {
  for(var i = 0; i < group_user_ids.length; i++) {
    console.log(user.user_id, group_user_ids[i]);
    if (group_user_ids[i] == user.user_id) {
      return false
    }
  }
  return true
}

router.get('/userList', ensureAuthenticated, (req, res) => {
  userDb.getUserList()
    .then((users) => {
      // console.log({users});
      userDb.getUsersByGroup(req.query.group_id)
        .then((group_users) => {
          // console.log({group_users});
          var group_user_ids = group_users.map((user) => {
            return user.user_id
          })
          console.log({group_user_ids});
          var user_list = []
          users.forEach((user) => {
            if (checkValid(user, group_user_ids)) user_list.push(user)
          })
          console.log({user_list});
          res.json(user_list)
        })
    })
})

module.exports = router
