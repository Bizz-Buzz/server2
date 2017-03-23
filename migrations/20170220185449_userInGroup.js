
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('joins', (table) => {
    table.increments('join_id')
    table.integer('group_id')
    table.integer('user_id')
    table.boolean('can_create').defaultTo(false)
    table.boolean('can_invite').defaultTo(false)
    table.boolean('isAdmin').defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('joins')
};
