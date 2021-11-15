const User = require('./User');
const Event = require('./Event');
const Rsvp = require('./Rsvp');

// create associations
User.hasMany(Event, {
    foreignKey: 'creator_id'
  });

Event.belongsTo(User, {
    foreignKey: 'creator_id'
    });

User.belongsToMany(Event, {
  through: Rsvp,
  as: 'rsvp_events',
  foreignKey: 'user_id'
});
    
Event.belongsToMany(User, {
  through: Rsvp,
  as: 'rsvp_events',
  foreignKey: 'event_id'
});

Rsvp.belongsTo(User, {
  foreignKey: 'user_id'
});

Rsvp.belongsTo(Event, {
  foreignKey: 'event_id'
});

User.hasMany(Rsvp, {
  foreignKey: 'user_id'
});

Event.hasMany(Rsvp, {
  foreignKey: 'event_id'
});


module.exports = { User, Event, Rsvp };