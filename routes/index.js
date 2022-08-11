const { Router } = require('express')

const userRouter = require('./user')
const postRouter = require('./post')


const appRouter = Router()

appRouter.use('/users', userRouter)
appRouter.use('/posts', postRouter)

module.exports = appRouter