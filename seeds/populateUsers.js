
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({user_id: 1, email: '', first_name: 'blank', last_name: "user", username: '', password: '', user_bio: 'test account'})
      ]);
    });
};
