const { Event } = require('../models');

const eventdata  = [
    {
        name: 'Pick up basketball',
        description: '5-on-5 20 minute games',
        date: '2021-03-08 09:00:00',
        location: 'YMCA',
        creator_id: 1
  },
  {
      name: 'Double Dipsea',
      description: '20 mile out and back run along the Dipsea trail',
      date: '2008-11-11 09:00:00',
      location: 'Dipsea Trailhead',
      creator_id: 1
},
{
    name: 'Beach clean up',
    description: 'Beach clean up',
    date: '2021-11-14 09:00:00',
    location: 'Ocean Beach Lighthouse',
    creator_id: 2
},
{
    name: 'Sewing circle',
    description: 'Come sew, quilt and craft',
    date: '2021-12-09 16:00:00',
    location: 'Senior Center',
    creator_id: 3
},
{
    name: 'Election day',
    description: 'Vote on local measuresg',
    date: '2021-11-13 16:00:00',
    location: '',
    creator_id: 3
},
{
    name: 'Critical Mass',
    description: 'Bike rally',
    date: '2021-10-13 16:00:00',
    location: 'Bike rally',
    creator_id: 2
},
{
    name: 'SF marathon',
    description: '26.2 mile run around SF',
    date: '2021-11-10 09:00:00',
    location: 'Embarcadero',
    creator_id: 3
}
];

const seedEvents = () => Event.bulkCreate(eventdata);

module.exports = seedEvents;
