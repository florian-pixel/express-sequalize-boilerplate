const {Sequelize} = require('sequelize')

const db = new Sequelize('databasetest', 'florian', 'flo256', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = db