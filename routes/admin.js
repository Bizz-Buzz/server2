var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const adminDb = require('../db/adminDb')
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


router.post('/leaveRequests/new', ensureAuthenticated, function (req, res) {
  var data = req.body
  data.user_id = Number(req.user.user_id)
  adminDb.newLeaveRequest(data)
    .then((leave_request_id) => {
      res.json(leave_request_id)
    })
})

router.post('/messages/new', ensureAuthenticated, function (req, res) {
  var data = req.body
  data.user_id = Number(req.user.user_id)
  adminDb.newAdminMessage(data)
    .then((message_id) => {
      res.json(message_id)
    })
})

router.get('/', ensureAuthenticated, function(req, res) {
  groupsDb.getGroupsByUser(Number(req.user.user_id))
    .then(groups => {
      var adminGroups = groups.filter((group) => {
        return group.isAdmin
      })
      adminGroups.forEach((group, index) => {
        adminGroups[index] = Number(group.group_id)
      })
      adminDb.getAdminMessages(adminGroups)
        .then((adminMessages) => {
            adminDb.getAdminLeaveRequests(adminGroups)
              .then((leaveRequests) => {
                res.json({
                  adminMessages,
                  leaveRequests,
                  emergency: []
                })
              })
        })

    })
})

router.post('/messages/pin', ensureAuthenticated, (req, res) => {
  adminDb.setAdminMessagePin(Number(req.body.message_id), Boolean(!req.body.is_pinned))
    .then((response) => {
      res.json(response)
    })
})

router.post('/messages/delete', ensureAuthenticated, (req, res) => {
  adminDb.deleteAdminMessage(Number(req.body.message_id))
    .then((response) => {
      res.json(response)
    })
})

router.post('/leaveRequests/pin', ensureAuthenticated, (req, res) => {
  adminDb.setLeaveRequestPin(Number(req.body.request_id), Boolean(!req.body.is_pinned))
    .then((response) => {
      res.json(response)
    })
})

router.post('/leaveRequests/delete', ensureAuthenticated, (req, res) => {
  console.log("delete request", req.body);
  adminDb.deleteLeaveRequest(Number(req.body.request_id))
    .then((response) => {
      res.json(response)
    })
})


module.exports = router
