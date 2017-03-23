
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('invitesOutgoing', (table) => {
    table.increments('invite_id')
    table.integer('group_id')
    table.integer('user_id')
    table.boolean('approved').defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('invitesOutgoing')
};
