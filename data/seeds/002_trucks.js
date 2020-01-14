exports.seed = function(knex) {
  return knex('trucks').insert([
    {
      operator_id: 1,
      cuisine: 'mexican',
      current_latitude: 35,
      current_longitude: 40
    },
    {
      operator_id: 1,
      cuisine: 'chinese',
      current_latitude: 20,
      current_longitude: 45
    },
    {
      operator_id: 2,
      cuisine: 'italian',
      current_latitude: 25,
      current_longitude: 50
    }
  ]);
};
