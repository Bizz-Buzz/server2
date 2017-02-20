
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('joins').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('joins').insert({group_id: 1, user_id: 1, isAdmin: true}),
        knex('joins').insert({group_id: 2, user_id: 1, isAdmin: true}),
        knex('joins').insert({group_id: 1, user_id: 2, isAdmin: true}),
        knex('joins').insert({group_id: 1, user_id: 3, isAdmin: true})
      ]);
    });
};
