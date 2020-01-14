exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'operator1',
      password: '$2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw.',
      role: 1
    },
    {
      username: 'operator2',
      password: '$2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw.',
      role: 1
    },
    {
      username: 'diner1',
      password: '$2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw.',
      role: 2
    }
  ]);
};

// 1: operator, 2: diner
// $2a$10$PXUW6bh6S.N3qEUHbH7g5.6wL7/XJ6oA.YvCsA8SLaXu2.dEV0pw. = '12345'
