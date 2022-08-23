
exports.authentication = async (req, res, next) => {
    let token
    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({ msg: "Unauthorized !" });

    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(" ")[1]
    }
    
    console.log("token", token);

    if (token !== "authorized") return res.status(401).json({ msg: "Unauthorized !" });
    
    return next()

}