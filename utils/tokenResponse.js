const User = require('../models/User')

exports.tokenResponse = async (id, statuscode, res) => {

    // Generate Token
    const token = await User.getSignedJwtToken(id)

    const cookieOptions = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res
        .status(statuscode)
        .cookie('token', token, cookieOptions)
        .json({
            success: true,
            token
        })

}