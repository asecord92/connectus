const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, User, Rsvp } = require('../../models');
const { Op } = require('sequelize');
const withAuth = require('../../utils/auth');


// GET /api/events/week
router.get('/week', (req, res) => {
  // Access our Event model and run .findAll() method)
  
  const {fns,addDays, subDays} = require('date-fns');
  const startDate = new Date();
  const endDate = addDays(startDate, 7);

  Event.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate]
      }
    }
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/events/today
router.get('/today', (req, res) => {
  // Access our Event model and run .findAll() method)
  
  const { startOfDay, endOfDay } = require('date-fns');
  const today = new Date();
  const { Op } = require('sequelize');
  const startdate = startOfDay(today);
  const enddate = endOfDay(today);
  console.log(`${startdate}
   ${enddate} -----------`);
  Event.findAll({
    where: {
      date: {
        [Op.between]: [startOfDay(today), endOfDay(today)]
      }
    }
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/events/new
router.get('/new', (req, res) => {
  // Access our Event model and run .findAll() method)
  
  const {fns,subDays} = require('date-fns');
  const endDate = new Date();
  const startDate = subDays(endDate, 3);
  const { Op } = require('sequelize');

  Event.findAll({
    where: {
      created_at: {
        [Op.between]: [startDate, endDate]
      }
    }
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET /api/events/1
router.get('/:id', (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'description',
      'date',
      'location',
      'creator_id',
      'created_at'
    ],
    include: [
      {
        model: Rsvp,
        attributes: ['id', 'user_id', 'event_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbEventData => {
      if (!dbEventData) {
        res.status(404).json({ message: 'No event found with this id' });
        return;
      }
      res.json(dbEventData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/events
router.get('/', (req, res) => {
    // Access our Event model and run .findAll() method)
    Event.findAll()
      .then(dbEventData => res.json(dbEventData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // POST /api/events
router.post('/', withAuth, (req, res) => {
  // expects {name: 'Knitting meetup', description: 'Meetup with knitters for holiday crafting', date: '2008-11-11 13:23:44', location: "123 main st., small town ...", creator_id: 2}
  Event.create({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    //might need to use session id here?
    creator_id: req.session.user_id
  })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/events/1
router.put('/:id', withAuth, (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  Event.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbEventData => {
      if (!dbEventData[0]) {
        res.status(404).json({ message: 'No event found with this id' });
        return;
      }
      res.json(dbEventData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/events/1
router.delete('/:id', withAuth, (req, res) => {
    Event.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbEventData => {
      if (!dbEventData) {
        res.status(404).json({ message: 'No event found with this id' });
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