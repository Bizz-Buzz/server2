
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('messageSeen', (table) => {
    table.increment('message_seen_id')
    table.integer('message_id')
    table.integer('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messageSeen')
};
