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

    menu
      .string('name') // item
      .notNullable();

    menu.float('price').notNullable();

    menu.string('imageUrl');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('menu');
};
