const { Rsvp } = require('../models');

const rsvpdata  = [
    {
        user_id: 1,
        event_id: 1
    },
    {
    user_id: 1,
    event_id: 2
    },{
        user_id: 1,
        event_id: 3
    },
    {
    user_id: 2,
    event_id: 2
    },
    {
        user_id: 2,
        event_id: 2
    },
    {
    user_id: 2,
    event_id: 3
    },
    {
        user_id: 3,
        event_id: 3
    },
    {
    user_id: 3,
    event_id: 4
    },
    {
    user_id: 4,
    event_id: 5
    },
    {
        user_id: 4,
        event_id: 6
    },
    {
    user_id: 4,
    event_id: 7
    }
];

const seedRsvps = () => Rsvp.bulkCreate(rsvpdata);

module.exports = seedRsvps;
