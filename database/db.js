const { Sequelize } = require('sequelize')

const db = new Sequelize('databasetest', 'postgres', 'officer', {
    host:'localhost',
    dialect:'postgres'
})

module.exports = db