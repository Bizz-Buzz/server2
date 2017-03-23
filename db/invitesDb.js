const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getIncomingByGroupId = (group_id) => {
  return knex('invitesIncoming')
    .join('users', 'invitesIncoming.user_id', 'users.user_id')
    .where('invitesIncoming.group_id', group_id)

}

getOutgoingByGroupId = (group_id) => {
  return knex('invitesOutgoing')
    .join('users', 'invitesOutgoing.user_id', 'users.user_id')
    .where('invitesOutgoing.group_id', group_id)
}

module.exports = {
  getIncomingByGroupId,
  getOutgoingByGroupId
}
