exports.up = function(knex) {
  return knex.schema.createTable('favorite_trucks', tbl => {
    tbl.increments();

    tbl
      .integer('diner_id')
      .unsigned()
      .references('id')
      .inTable('users');

    tbl
      .integer('truck_id')
      .unsigned()
      .references('id')
      .inTable('trucks');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('favorite_trucks');
};
