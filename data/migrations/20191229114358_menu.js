exports.up = function(knex) {
  return knex.schema.createTable('menu', menu => {
    menu.increments();

    menu
      .integer('truck_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('trucks')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('menu');
};
