const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getAllGroups = () => {
	return knex('groups')
		.where('invite_only', false)
}

getGroupsNotJoinedByUser = (groupIds, user_id) => {
	return knex('groups')
		.whereNotIn('group_id', groupIds)
		.andWhere('user_id', user_id)
}

getGroupsByUser = (user_id) => {
	return knex('groups')
		.join('joins', 'groups.group_id', 'joins.group_id')
		.where('joins.user_id', user_id)
}

createNewGroup = (group_name, group_description, invite_only, parent_id) => {
	return knex('groups')
		.insert({group_name, group_description, invite_only, parent_id})
}

createGroupJoin = (group_id, user_id, isAdmin) => {
	return knex('joins')
		.insert({group_id, user_id, isAdmin})
}

getGroupById = (group_id) => {
	return knex('groups')
		.where('groups.group_id', group_id)
		.join('joins', 'groups.group_id', 'joins.group_id')
}

module.exports = {
	getAllGroups,
	getGroupsByUser,
	getGroupsNotJoinedByUser,
	createNewGroup,
	createGroupJoin,
	getGroupById
}
