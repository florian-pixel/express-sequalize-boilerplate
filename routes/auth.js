const express = require('express')
const { createUser} = require('../controllers/user')
const { signin, me, logout } = require('../controllers/auth')

const authRouter = express.Router()

authRouter.post('/signup', createUser)
authRouter.post('/signin', signin)
authRouter.get('/me', me)
authRouter.get('/logout', logout)


module.exports = authRouter