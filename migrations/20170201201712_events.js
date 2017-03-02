
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('events', (table) => {
    table.increments('event_id')
    table.integer('user_id')
    table.integer('group_id')
    table.string('title')
    table.integer('minute_id')
    table.integer('hour_id')
    table.integer('day_id')
    table.integer('month_id')
    table.integer('year_id')
    table.timestamp('event_created_at').defaultTo(knex.fn.now())
    table.string('description').defaultTo('')
    table.integer('RSVP_count').defaultTo(0)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('events')
};


// table.integer('day')
// table.integer('month')
// table.integer('year')
