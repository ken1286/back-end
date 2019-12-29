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
  // return db('users').select('id', 'username', 'password');
  return db('users').select('username', 'role', 'latitude', 'longitude');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');

  return findById(id);
}

async function findById(id) {
  // user ID
  console.log('test');
  const user = await db('users')
    .where({ id })
    .first()
    .select('username', 'role', 'latitude', 'longitude', 'id');

  const trucks = await db('trucks')
    .join('favorite_trucks', 'trucks.id', 'favorite_trucks.truck_id')
    .where({ 'favorite_trucks.diner_id': id })
    .select('trucks.id');

  console.log(trucks);
  console.log(user);
  const result = { ...user, trucks };
  return result;
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes, '*');
}
