
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('invitesIncoming', (table) => {
    table.increments('invite_id')
    table.integer('group_id')
    table.integer('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('invitesIncoming')
};
