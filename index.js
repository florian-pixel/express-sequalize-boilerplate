const express =  require('express')
const db = require('./database/db')


const app = express()


db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(error))
app.listen(3000)