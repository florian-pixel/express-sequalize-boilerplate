const User = require('../models/User')

const dayjs = require('dayjs')

exports.createUser = (req, res, next) => {
    const user = User.create({
        "lastName": "Bally ",
        "firstName": "Charles",
        "dateOfBirth": new Date(dayjs('11-10-1999', 'DD-MM-YYYY')),
        "email": "charles@hotmail.com",
        "status": "active"
    })
    return user
}

exports.readAllUser = (req, res, next) => {
    const users = User.findAll()
    return users
}

exports.readOneUser = (req, res, next) => {
    
}