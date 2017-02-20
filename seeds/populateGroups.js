
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('groups').insert({group_id: 1, group_name: 'Bizz Buzz'}),
        knex("groups").insert({group_id: 2, group_name: 'buzz', parent_id: 1})
      ]);
    });
};
