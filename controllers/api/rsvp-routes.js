const router = require('express').Router();
// const { regexp } = require('sequelize/types/lib/operators');
const { Rsvp } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/rsvp/1
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbRsvpData => {
      if (!dbRsvpData) {
        res.status(404).json({ message: 'No RSVP found with this id' });
        return;
      }
      res.json(dbRsvpData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/rsvp
router.get('/', (req, res) => {
    // Access our Rsvp model and run .findAll() method)
    Rsvp.findAll()
      .then(dbRsvpData => res.json(dbRsvpData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
// POST /api/rsvp
router.post('/', withAuth, (req, res) => {
  // expects {user_id: 1, event_id: 2}

  Rsvp.create({
    user_id: req.session.user_id,
    event_id: req.body.event_id
  })
    .then(dbRsvpData => res.json(dbRsvpData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/rsvp/1
router.put('/:id', withAuth, (req, res) => {
});

// DELETE /api/rsvp/1
router.delete('/:id', (req, res) => {
  console.log(req.session.user_id);
  Rsvp.destroy({
    where: {
      user_id: req.session.user_id,
      event_id: req.params.id,
    }
  })
    .then(dbRsvpData => {
      if (!dbRsvpData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbRsvpData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;