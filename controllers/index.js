const router = require('express').Router();
const apiRoutes = require('./api/index.js');
const dashboardRoutes = require('./dashboard-routes');
const homeRoutes = require('./home-routes');
const eventsRoutes = require('./events-routes');
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes )
router.use('/', homeRoutes);
router.use('/events', eventsRoutes)

module.exports = router;