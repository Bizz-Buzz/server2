
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('events').insert({title: "Jazz Drinks", description: "Does this need any more explaining?", user_id: 1, group_id: 1, day_id: 1, month_id: 0, year_id: 2017, hour_id: 0, minute_id: 0})
      ]);
    });
};
