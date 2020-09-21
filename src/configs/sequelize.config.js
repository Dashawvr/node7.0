const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    'test',
    'root',
    'HomeHome20012018',
    {
        dialect:'mysql',

    }
)
