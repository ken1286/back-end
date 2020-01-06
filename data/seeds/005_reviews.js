exports.seed = function(knex) {
  return knex('reviews').insert([
    {
      title: 'my review',
      review: 'review stuff here',
      rating: 3,
      truck_id: 3,
      user_id: 3
    },
    {
      title: 'my review',
      review: 'review stuff here',
      rating: 2,
      truck_id: 3,
      user_id: 3
    },
    {
      title: 'my review',
      review: 'review stuff here',
      rating: 5,
      truck_id: 3,
      user_id: 3
    },
    {
      title: 'my review',
      review: 'review stuff here',
      rating: 4,
      truck_id: 3,
      user_id: 3
    },
    {
      title: 'my review',
      review: 'review stuff here',
      rating: 3,
      truck_id: 3,
      user_id: 3
    }
  ]);
};
