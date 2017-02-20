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

router.get('/unjoined', function(req, res, next) {
	groupsDb.getGroupsNotJoinedByUser(req.user.user_id)
		.then((groups) => {
			res.json(groups)
		})
})

router.post('/new', function(req, res) {
	const {group_name, group_description, invite_only, parent_id} = req.body
	groupsDb.createNewGroup(group_name, group_description, invite_only, parent_id)
		.then(group_id => {
			console.log({group_id});
			groupsDb.createGroupJoin(group_id[0], req.user.user_id, true)
				.then(join_id => {
					console.log({join_id});
					groupsDb.getGroupById(group_id[0])
						.then((group) => {
							console.log({group});
							res.json(group[0])
						})
				})
		})
})

module.exports = router;
