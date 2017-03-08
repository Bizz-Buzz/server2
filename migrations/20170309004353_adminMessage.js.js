
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('adminMessages', (table) => {
    table.increments('message_id')
    table.string('content')
    table.integer('user_id')
    table.integer('group_id')
    table.boolean('is_pinned').defaultTo(false)
    table.timestamp('message_created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('adminMessages')
};
