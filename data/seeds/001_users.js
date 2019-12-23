exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'operator1',
      password: '$2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw.',
      role: 'operator'
    },
    {
      username: 'operator2',
      password: '$2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw.',
      role: 'operator'
    },
    {
      username: 'diner1',
      password: '$2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw.',
      role: 'diner'
    }
  ]);
};

// $2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw. = '12345'
