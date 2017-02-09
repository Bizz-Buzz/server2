
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('events', (table) => {
    table.increments('event_id')
    table.integer('user_id')
    table.integer('group_id')
    table.string('title')
    table.time('time')
    table.datetime('date_time')
    table.timestamp('event_created_at').defaultTo(knex.fn.now())
    table.string('description').defaultTo(null)
    table.integer('respones').defaultTo(0)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('events')
};


// table.integer('day')
// table.integer('month')
// table.integer('year')