const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getUsersByGroupId = (group_id) => {
  return knex('joins')
    .join('users', 'joins.user_id', 'users.user_id')
    .where('joins.group_id', group_id)
}

getGroupSettings = (group_id) => {
  return knex('groups')
    .where('group_id', group_id)
}

module.exports = {
  getUsersByGroupId,
  getGroupSettings
}
