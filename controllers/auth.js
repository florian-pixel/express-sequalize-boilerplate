const database = require('../database/db')
const User = require('../models/User')
const {tokenResponse} = require('../utils/tokenResponse')


/*
@desc       Signin User
@route      POST /api/v1/signin
@access     Public
*/
exports.signin = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            email : req.body.email
        }
    })
    
    const compare = user.matchPassword(req.body.password)
    if (!user || !compare) {
        return res.status(401).json({msg: 'Invalid Credentials'})
    }

    return tokenResponse(user.id, 200, res)
}

/*
@desc       Get current logged in user
@route      GET /api/v1/me
@access     private
*/
exports.me = async (req, res, next) => {

}

/*
@desc       Log out User / Clear cookies
@route      POST /api/v1/logout
@access     Private
*/
exports.logout = async (req, res, next) => {

}