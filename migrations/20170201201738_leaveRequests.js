
exports.up = function(knex, Promise) {
  return knex.schema.creatTableIfNotExists('leaveRequests', (table) => {
    table.increments('request_id')
    table.integer('user_id')
    table.string('leave_type').defaultTo('sick')
    table.boolean('paid_leave').defaultTo(false)
    table.integer('group_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('leaveRequests')
};
