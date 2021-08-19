module.exports = function authorizationMW (req, res, next) {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];

        const userData = jwt.verify(token, config.jwtSecretAccessToken)
        
        if (userData.name) {
            req.authStatus = false
        }
        req.authStatus = true
        next()
    }
    next()
}
