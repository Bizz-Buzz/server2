const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

newLeaveRequest = (leaveRequest) => {
  return knex('leaveRequests')
    .insert(leaveRequest)
}

newAdminMessage = (adminMessage) => {
  return knex('adminMessages')
    .insert(adminMessage)
}

getAdminMessages = (group_ids) => {
  console.log(typeof group_ids[0]);
  return knex('adminMessages')
    .whereIn('adminMessages.group_id', group_ids)
    .join('users', 'adminMessages.user_id', 'users.user_id')
    .join('groups', 'adminMessages.group_id', 'groups.group_id')

}

getAdminLeaveRequests = (group_ids) => {
  return knex('leaveRequests')
    .whereIn('leaveRequests.group_id', group_ids)
    .join('users', 'leaveRequests.user_id', 'users.user_id')
    .join('groups', 'leaveRequests.group_id', 'groups.group_id')

}

setAdminMessagePin = (message_id, is_pinned) => {
  return knex('adminMessages')
    .where('message_id', message_id)
    .update({is_pinned})
}

deleteAdminMessage = (message_id) => {
  return knex('adminMessages')
    .where('message_id', message_id)
    .del()
}

setLeaveRequestPin = (request_id, is_pinned) => {
  return knex('leaveRequests')
    .where('request_id', request_id)
    .update({is_pinned})
}

deleteLeaveRequest = (request_id) => {
  return knex('leaveRequests')
    .where('request_id', request_id)
    .del()
}

module.exports = {
  newLeaveRequest,
  newAdminMessage,
  getAdminMessages,
  getAdminLeaveRequests,
  setAdminMessagePin,
  deleteAdminMessage,
  setLeaveRequestPin,
  deleteLeaveRequest
}
