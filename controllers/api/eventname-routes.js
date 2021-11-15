const router = require('express').Router();
const { Event } = require('../../models');
const { Op } = require('sequelize');


// GET /api/eventname/baskesball
router.get('/:name', (req, res) => {
  Event.findOne({
    where: {
        name: {
          [Op.like]: '%' + req.params.name + '%'
        }
      }
  })
    .then(dbEventData => {
      if (!dbEventData) {
        res.status(404).json({ message: 'No event found with this name' });
        return;
      }
      res.json(dbEventData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;