const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getAllGroups = () => {
	return knex('groups')
}

getGroupsNotJoinedByUser = (groupIds, user_id) => {
	return knex('groups')
		.whereNotIn('group_id', groupIds)
		.andWhere('user_id', user_id)
}

getGroupsByUser = (user_id) => {
	console.log({user_id});
	return knex('groups')
		.join('joins', 'groups.group_id', 'joins.group_id')
		.where('joins.user_id', Number(user_id))
}

createNewGroup = (group_name, group_description, invite_only, parent_id) => {
	return knex('groups')
		.insert({group_name, group_description, invite_only, parent_id}, 'group_id')
}

createGroupJoin = (group_id, user_id, isAdmin) => {
	return knex('joins')
		.insert({group_id, user_id, isAdmin}, 'join_id')
}

getGroupById = (group_id) => {
	return knex('groups')
		.join('joins', 'groups.group_id', 'joins.group_id')
		.where('groups.group_id', Number(group_id))
}

getAdminGroupsByUser = (user_id) => {
	return knex('groups')
		.join('joins', 'groups.group_id', 'joins.group_id')
		.where('joins.user_id', user_id)
		.andWhere('joins.isAdmin', true)
}

module.exports = {
	getAllGroups,
	getGroupsByUser,
	getGroupsNotJoinedByUser,
	createNewGroup,
	createGroupJoin,
	getGroupById,
	getAdminGroupsByUser
}
