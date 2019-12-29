const router = require('express').Router();
const Trucks = require('../models/trucks-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, async (req, res) => {
  Trucks.find()
    .then(trucks => {
      res.status(200).json(trucks);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', restricted, (req, res) => {
  const id = req.params.id;

  Trucks.findById(id)
    .then(truck => {
      if (!truck) {
        res.status(404).json({ message: 'No truck found' });
      } else {
        res.status(200).json(truck);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
