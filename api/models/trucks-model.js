const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
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

async function update(truckId, operatorId, changes) {
  const truck = await db('trucks')
    .where({ 'trucks.id': truckId, 'trucks.operator_id': operatorId })
    .first();

  const updatedTruck = { ...truck, changes };

  await db('trucks')
    .where({ 'trucks.id': truckId, 'trucks.operator_id': operatorId })
    .first()
    .update(updatedTruck);

  return findById(truckId);
}

function remove(id) {
  return db('trucks')
    .where({ id })
    .del();
}
