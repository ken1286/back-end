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

router.post('/', restricted, (req, res) => {
  const role = req.jwt.role;
  const userId = req.jwt.user_id;
  const newTruck = req.body;
  console.log(newTruck);

  if (role !== 1) {
    return res
      .status(500)
      .json({ message: 'User must be a truck operator to add a truck.' });
  }

  Trucks.add(newTruck, userId)
    .then(truck => {
      res.status(200).json(truck);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', restricted, async (req, res) => {
  const role = req.jwt.role;
  const userId = req.jwt.user_id;
  const truckId = req.params.id;
  const truckChanges = req.body;
  console.log(truckChanges);

  if (role !== 1) {
    return res
      .status(500)
      .json({ message: 'User must be a truck operator to update a truck.' });
  }

  let truckToUpdate = await Trucks.findById(truckId);

  if (truckToUpdate) {
    Trucks.update(truckId, userId, truckToUpdate, truckChanges)
      .then(truck => {
        res.status(200).json(truck);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

router.delete('/:id', restricted, (req, res) => {
  const role = req.jwt.role;

  if (role !== 1) {
    return res
      .status(500)
      .json({ message: 'User must be a truck operator to delete a truck.' });
  }

  const truckId = req.params.id;

  Trucks.remove(truckId)
    .then(truck => {
      res.status(200).json(truck);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
