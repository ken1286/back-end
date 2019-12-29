exports.up = function(knex) {
  return knex.schema.createTable('trucks', trucks => {
    trucks.increments();

    trucks
      .integer('operator_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    trucks.string('imageUrl');

    trucks.string('cuisine');

    trucks.float('current_latitude');
    trucks.float('current_longitude');

    trucks.float('next_latitude');
    trucks.float('next_longitude');

    trucks.datetime('arrival_time', { precision: 6 });
    // .defaultTo(knex.fn.now(6));

    trucks.datetime('departure_time', { precision: 6 });
    // .defaultTo(knex.fn.now(6));

    // trucks.specificType('menu', 'text ARRAY');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('trucks');
};
