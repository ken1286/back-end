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
  removeMenuItem,
  addReview,
  removeReview
};

async function find() {
  // all trucks
  const trucks = await db('trucks');

  const reviews = await db('reviews');

  trucks.forEach(truck => {
    ratings = [];
    reviews.forEach(review => {
      if (truck.id === review.truck_id) {
        ratings.push(review.rating);
      }
    });

    let total = 0;
    ratings.forEach(rating => {
      if (rating !== null) {
        total += rating;
      }
    });

    truck.avgRating = total / ratings.length;
  });

  return trucks;
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

  const reviews = await db('reviews')
    .join('users', 'reviews.user_id', 'users.id')
    .where({ truck_id: id })
    .select('reviews.*', 'users.username');

  const ratings = reviews.map(review => {
    if (review.rating !== null) {
      return review.rating;
    }
  });

  console.log(ratings);

  let total = 0;
  ratings.forEach(rating => {
    total += rating;
  });

  let avgRating = total / ratings.length;

  const result = { ...truck, menu, avgRating, reviews };

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

async function addReview(review, truckId, userId) {
  await db('reviews').insert({ ...review, truck_id: truckId, user_id: userId });

  return findById(truckId);
}

async function removeReview(reviewId, truckId) {
  await db('reviews')
    .where({ id: reviewId })
    .del();

  return findById(truckId);
}
