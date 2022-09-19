const { Router } = require('express')

const userRouter = require('./user')
const postRouter = require('./post')
const authRouter = require('./auth')


const appRouter = Router()

appRouter.use('/users', userRouter)
appRouter.use('/auth', authRouter)
appRouter.use('/posts', postRouter)

module.exports = appRouter