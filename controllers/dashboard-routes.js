const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Rsvp, User, Event } = require('../models');
const { Op } = require('sequelize');
const {format} =require('date-fns')

router.get('/', withAuth, (req,res) => {
  Event.findAll({
    where: {
        creator_id: req.session.user_id
    }
})
    .then(dbEventData => {
        var data = {
            loggedIn: req.session.user_id !== undefined,
            title: 'My Events',
            events: [],
        };
        data.events = dbEventData.map(event => {
            const newDate = new Date(event.dataValues.date)
            const formatedDate = format(newDate, 'MM-dd-yyyy');
            var currentEvent = {
                id: event.dataValues.id,
                name: event.dataValues.name,
                date: formatedDate
            }
            return currentEvent;
        });
        res.render('dashboard', data);
    })
    .catch(err => {
        res.status(500).json(err);
    });
  });
//route for create event

router.get('/create_event', withAuth, (req,res)=> {
  res.render('create-event', {loggedIn: true});
});

module.exports = router;