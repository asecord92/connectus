const seedEvents = require('./event-seeds');
const seedUsers = require('./user-seeds');
const seedRsvps = require('./rsvp-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');


    await seedUsers();
    console.log('--------------');

    await seedEvents();
    console.log('--------------');

    await seedRsvps();
    console.log('--------------');

  process.exit(0);
};

seedAll();
