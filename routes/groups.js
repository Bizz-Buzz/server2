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

router.get('/find', function(req, res, next) {
	groupsDb.getGroupsByUser(req.user.user_id)
		.then((groups) => {
      var unjoined = groups.map(group => group.group_id)
      groupsDb.getGroupsNotJoinedByUser(unjoined, req.user.user_id)
        .then(unjoinedGroups => {
          res.json(unjoinedGroups)
        })
		})
})

router.post('/new', function(req, res) {
	groupsDb.createNewGroup(req.body.group_name, req.body.group_description, req.body.invite_only, req.body.parent_id)
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
