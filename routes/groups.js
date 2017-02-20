var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const groupsDb = require('../db/groupsDb')

/* GET users listing. */
router.get('/', function(req, res, next) {
  groupsDb.getGroupsByUser(req.user.user_id)
		.then((groups) => {
			res.json(groups)
		})
});

router.get('/unJoined', function(req, res, next) {
	groupsDb.getGroupsNotJoinedByUser(req.user.user_id)
		.then((groups) => {
			res.json(groups)
		})
})

module.exports = router;
