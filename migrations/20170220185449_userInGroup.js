
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('joins', (table) => {
    table.increments('join_id')
    table.integer('group_id')
    table.integer('user_id')
    table.boolean('isAdmin').defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('joins')
};
