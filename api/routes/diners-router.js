const router = require('express').Router();
const db = require('../../data/dbConfig.js');

// const Users = require('../models/users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, async (req, res) => {
  const data = await db('users')
    .where({ role: 2 })
    .select('*');

  res.status(200).json(data);
});

module.exports = router;
