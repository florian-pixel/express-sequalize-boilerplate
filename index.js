const express =  require('express')
const db = require('./database/db')
const router = require('./routes')
// const routerPost = require('./routes/post')
const app = express()

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error(err))

db.sync({force:true})
// db.sync()
    .catch(err => console.error(err))

app.use(express.urlencoded({ extended: true }, { limit: '50mb' }))
app.use(express.json({ limit: '50mb' }, { type: '*/*' }))

app.use('/api', router)
// app.use('/api',routerPost)

app.listen(3000)

