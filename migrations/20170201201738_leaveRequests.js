
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('leaveRequests', (table) => {
    table.increments('request_id')
    table.integer('user_id')
    table.string('is_sick_leave').defaultTo('sick')
    table.boolean('paid_leave').defaultTo(false)
    table.integer('day_id')
    table.integer('month_id')
    table.integer('year_id')
    table.string('leave_reason')
    table.integer('group_id')
    table.integer('leave_days').defaultTo(1)
    table.boolean('is_pinned').defaultTo(false)
    table.timestamp('request_created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('leaveRequests')
};
