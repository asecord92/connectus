const { User } = require('../models');

const userdata  = [
    {
        username: 'leebu',
        first_name: 'Lee',
        last_name: 'Burridge',
        email: 'leebu@mail.com',
        password: 'leebu123'
  },
  {
      username: 'yokoo',
      first_name: 'Yoko',
      last_name: 'O',
      email: 'yokoo@mail.com',
      password: 'yokoo123'
},
{
    username: 'damianl',
    first_name: 'Damian',
    last_name: 'Lazarus',
    email: 'damianl@mail.com',
    password: 'damianl123'
}
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
