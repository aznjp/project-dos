const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [{
        username: 'crazylilaznj',
        email: 'jpark103193@gmail.com',
        password: 'password123'
    },
    {
        username: 'mylilpony',
        email: 'mylilponey@gmail.com',
        password: 'password123'
    },
    {
        username: 'iboddam2',
        email: 'cstoneman2@gmail.com',
        password: 'password123'
    },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;