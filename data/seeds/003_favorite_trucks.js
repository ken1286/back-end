exports.seed = function(knex) {
  return knex('favorite_trucks').insert([{ diner_id: 3, truck_id: 1 }]);
};
