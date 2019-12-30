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

    trucks.string('cuisine').notNullable();

    trucks.float('current_latitude');
    trucks.float('current_longitude');

    trucks.float('next_latitude');
    trucks.float('next_longitude');

    trucks.string('arrival_time');

    trucks.string('departure_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('trucks');
};
