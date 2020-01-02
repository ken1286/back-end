const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update,
  addFavorite,
  removeFavorite
};

function find() {
  // all trucks
  return db('trucks');
}

function findBy(filter) {
  // good for operator_id
  return db('trucks').where(filter);
}

function findById(id) {
  // truck id
  return db('trucks')
    .where({ id })
    .first();
}

async function add(truck, operatorId) {
  const newTruck = {
    ...truck,
    operator_id: operatorId
  };

  await db('trucks').insert(newTruck);

  return find();
}

async function update(truckId, operatorId, originalTruck, changes) {
  await db('trucks')
    .where({ 'trucks.id': truckId, 'trucks.operator_id': operatorId })
    .first()
    .update({ ...originalTruck, changes });

  return findById(truckId);
  // const truck = await db('trucks')
  //   .where({ 'trucks.id': truckId, 'trucks.operator_id': operatorId })
  //   .first();

  // // console.log(truck);

  // const updatedTruck = { ...truck, changes };

  // if (truck && truck.operator_id === operatorId) {
  //   return db('trucks')
  //     .where({ 'trucks.id': truckId})
  //     .first()
  //     .update(updatedTruck);
  // }

  // return findById(truckId);
}

async function remove(id) {
  await db('trucks')
    .where({ id })
    .del();

  return find();
}

async function removeFavorite(userId, truckId) {
  await db('favorite_trucks')
    .where({ diner_id: userId, truck_id: truckId })
    .del();

  const trucks = await db('trucks')
    .join('favorite_trucks', 'trucks.id', 'favorite_trucks.truck_id')
    .where({ 'favorite_trucks.diner_id': userId })
    .select('trucks.*');

  return trucks;
}

async function addFavorite(userId, truckId) {
  await removeFavorite(userId, truckId);

  await db('favorite_trucks').insert({ diner_id: userId, truck_id: truckId });

  const trucks = await db('trucks')
    .join('favorite_trucks', 'trucks.id', 'favorite_trucks.truck_id')
    .where({ 'favorite_trucks.diner_id': userId })
    .select('trucks.*');

  return trucks;
}
