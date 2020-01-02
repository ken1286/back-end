const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update,
  addFavorite,
  removeFavorite,
  addMenuItem,
  removeMenuItem
};

function find() {
  // all trucks
  return db('trucks');
}

function findBy(filter) {
  // good for operator_id
  return db('trucks').where(filter);
}

async function findById(id) {
  // truck id
  const truck = await db('trucks')
    .where({ id })
    .first();

  const menu = await db('menu')
    .where({ truck_id: id })
    .select('*');

  const result = { ...truck, menu };

  return result;
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

  const favTrucks = await db('trucks')
    .join('favorite_trucks', 'trucks.id', 'favorite_trucks.truck_id')
    .where({ 'favorite_trucks.diner_id': userId })
    .select('trucks.*');

  return favTrucks;
}

async function addMenuItem(item, truckId) {
  await db('menu').insert({ ...item, truck_id: truckId });

  return findById(truckId);
}

async function removeMenuItem(itemId, truckId) {
  await db('menu')
    .where({ id: itemId })
    .del();

  return findById(truckId);
}
