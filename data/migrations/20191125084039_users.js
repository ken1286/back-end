exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users
      .string('username', 128)
      .notNullable()
      .unique();

    users.string('password', 128).notNullable();

    users.integer('role').notNullable();
    // role: 1 operator, 2 diner

    users.float('latitude');
    users.float('longitude');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
