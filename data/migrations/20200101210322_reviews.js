exports.up = function(knex) {
  return knex.schema.createTable('reviews', reviews => {
    reviews.increments();

    reviews
      .integer('truck_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('trucks')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    reviews
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    reviews.text('review').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('reviews');
};
