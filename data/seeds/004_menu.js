exports.seed = function(knex) {
  return knex('menu').insert([
    { name: 'taco supreme', truck_id: 1, price: 2.99 },
    { name: 'sushi supreme', truck_id: 1, price: 3.99 },
    { name: 'spaghetti supreme', truck_id: 2, price: 34.99 },
    { name: 'meatloaf supreme', truck_id: 3, price: 4.99 },
    { name: 'chicken supreme', truck_id: 3, price: 5.99 }
  ]);
};
