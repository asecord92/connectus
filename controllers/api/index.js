const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const eventRoutes = require('./event-routes');
const eventnameRoutes = require('./eventname-routes');
const rsvpRoutes = require('./rsvp-routes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/eventname', eventnameRoutes);
router.use('/rsvp', rsvpRoutes);

module.exports = router;
