const router = require('express').Router();
const { id } = require('date-fns/locale');
const sequelize = require('../config/connection');
const { Rsvp, User, Event } = require('../models');
const { fns, addDays, subDays, startOfDay, endOfDay } = require('date-fns');
const { Op } = require('sequelize');
const withAuth = require('../utils/auth')

router.get('/all', (req, res) => {
    Event.findAll()
        .then(dbEventData => {
            var data = {
                loggedIn: req.session.user_id !== undefined,
                title: 'All events',
                events: [],
            };

            data.events = dbEventData.map(event => {
                const newDate = new Date(event.dataValues.date)
                const formatedDate = `${newDate.getMonth()}-${newDate.getDay()}-${newDate.getFullYear()}`
                var currentEvent = {
                    id: event.dataValues.id,
                    name: event.dataValues.name,
                    date: formatedDate,
                    location: event.dataValues.location,
                }

                return currentEvent;

            });
            res.render('allevents', data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/hosting', (req, res) => {
    Event.findAll({
        where: {
            creator_id: req.session.user_id
        }
    })
        .then(dbEventData => {
            var data = {
                loggedIn: req.session.user_id !== undefined,
                title: 'Hosting events',
                events: [],
            };
            data.events = dbEventData.map(event => {
                const newDate = new Date(event.dataValues.date)
                const formatedDate = `${newDate.getMonth()}-${newDate.getDay()}-${newDate.getFullYear()}`
                var currentEvent = {
                    id: event.dataValues.id,
                    name: event.dataValues.name,
                    date: formatedDate,
                }
                return currentEvent;
            });
            res.render('allevents', data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/attending', (req, res) => {
    Rsvp.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
        .then(dbRsvpData => {
            rsvpEventIDs = dbRsvpData.map(rsvp => {return rsvp.dataValues.event_id});
            Event.findAll({
                where: {
                    id: rsvpEventIDs
                }
            })
                .then(dbEventData => {
                    var data = {
                        loggedIn: req.session.user_id !== undefined,
                        title: 'Attending events',
                        events: [],
                    };
                    data.events = dbEventData.map(event => {
                        const newDate = new Date(event.dataValues.date)
                        const formatedDate = `${newDate.getMonth()}-${newDate.getDay()}-${newDate.getFullYear()}`
                        var currentEvent = {
                            id: event.dataValues.id,
                            name: event.dataValues.name,
                            date: formatedDate,
                        }
                        return currentEvent;
                    });
                    res.render('attendingevents', data );
                })
            })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/today', (req, res) => {
    const now = new Date();
    const startDate = startOfDay(now);
    const endDate = endOfDay(now);
    console.log(`start ${startDate}    end ${endDate}`);

    Event.findAll({
        where: {
            date: {
                [Op.between]: [startDate, endDate]
            }
        }
    })
        .then(dbEventData => {
            var data = {
                loggedIn: req.session.user_id !== undefined,
                title: "Today's events",
                events: [],
            };
            data.events = dbEventData.map(event => {
                const newDate = new Date(event.dataValues.date)
                const formatedDate = `${newDate.getMonth()}-${newDate.getDay()}-${newDate.getFullYear()}`
                var currentEvent = {
                    id: event.dataValues.id,
                    name: event.dataValues.name,
                    date: formatedDate,
                }
                return currentEvent;
            });
            res.render('today', data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/thisweek', (req, res) => {
    const now = new Date();
    const startDate = startOfDay(now);
    const endDate = addDays(startDate, 7);

    Event.findAll({
        where: {
            date: {
                [Op.between]: [startDate, endDate]
            }
        }
    })
        .then(dbEventData => {
            var data = {
                loggedIn: req.session.user_id !== undefined,
                title:"This week's events",
                events: [],
            }
            data.events = dbEventData.map(event => {
                const newDate = new Date(event.dataValues.date)
                const formatedDate = `${newDate.getMonth()}-${newDate.getDay()}-${newDate.getFullYear()}`
                var currentEvent = {
                    id: event.dataValues.id,
                    name: event.dataValues.name,
                    date: formatedDate,
                }
                return currentEvent;
            });
            res.render('allevents', data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/new', (req, res) => {
    const now = new Date();
    const endDate = now;
    const startDate = subDays(endDate, 3);

    Event.findAll({
        where: {
            created_at: {
                [Op.between]: [startDate, endDate]
            }
        }
    })
        .then(dbEventData => {
            var data = {
                loggedIn: req.session.user_id !== undefined,
                title:"New events",
                events: [],
            }
            data.events = dbEventData.map(event => {
                const newDate = new Date(event.dataValues.date)
                const formatedDate = `${newDate.getMonth()}-${newDate.getDay()}-${newDate.getFullYear()}`
                var currentEvent = {
                    id: event.dataValues.id,
                    name: event.dataValues.name,
                    date: formatedDate,
                }
                return currentEvent;
            })
            res.render('allevents', data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/event/:id', withAuth, (req, res) => {
    const eventId = req.params.id;

    Rsvp.findAll({
        where: {
            event_id: eventId
        }
    })
    .then(dbRsvpData => {
        if (!dbRsvpData) {
            res.status(404).json({ message: 'No RSVPs found' });
            return;
        }
        res.locals.dbRsvpData = dbRsvpData;
    })
    .then(() => {
        var rsvpsArray = [];
        for (let i = 0; i < res.locals.dbRsvpData.length; i++) {
            User.findByPk(res.locals.dbRsvpData[i].dataValues.user_id)
                .then(dbUserData => {
                    rsvpsArray.push(dbUserData.dataValues.username);
                });
        }
        res.locals.rsvps = rsvpsArray;
    })

    Event.findByPk(eventId)
    .then(dbEventData => {
        if (!dbEventData) {
            res.status(404).json({ message: 'No event found with this id' });
            return;
        }
        res.locals.event = dbEventData.dataValues;
        return;
    })
    .then(() => {
        User.findByPk(res.locals.event.creator_id)
        .then(dbCreatorData => {
            res.locals.creator = dbCreatorData.dataValues;
            const newDate = new Date(res.locals.event.date);
            const formatedDate = `${newDate.getMonth()}-${newDate.getDay()}-${newDate.getFullYear()}`
            const data = {
                loggedIn: req.session.user_id !== undefined,
                isCreator: res.locals.event.creator_id === req.session.user_id,
                isAttending: res.locals.rsvps.includes(req.session.username),
                creator: res.locals.creator.username,
                name: res.locals.event.name,
                date: formatedDate,
                description: res.locals.event.description,
                location: res.locals.event.location,
                create_date: res.locals.event.created_at,
                rsvps: res.locals.rsvps,
            };
            res.render('single-event', data);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/hosted', (req, res) => {
    const creator_id = req.session.user_id;

    Event.findAll({
        where: {
            creator_id: creator_id
        }
    })
        .then(dbEventData => {
            const data = {
                title:"New events",
                events: [],
            }
            data.events = dbEventData.map(event => {
                const newDate = new Date(event.dataValues.date)
                const formatedDate = `${newDate.getMonth()}-${newDate.getDay()}-${newDate.getFullYear()}`
                var currentEvent = {
                    id: event.dataValues.id,
                    name: event.dataValues.name,
                    date: formatedDate,
                }
                return currentEvent;
            })
            res.render('hostedevents', data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
})
module.exports = router; 