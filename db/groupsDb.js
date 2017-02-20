const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getGroupsNotJoinedByUser = (user_id) => {
	return knex('groups')
		.join('joins', 'groups.group_id', "joins.group_id")
		.whereNot('joins.user_id', user_id)
}

getGroupsByUser = (user_id) => {
	return knex('groups')
		.join('joins', 'groups.group_id', 'joins.group_id')
		.where('joins.user_id', user_id)
}


module.exports = {
	getGroupsByUser,
	getGroupsNotJoinedByUser
}
