const jwt = require('jsonwebtoken')
const config = require('../config.js')

module.exports = function authorizationMW(req, res, next) {
    if (req.headers.authorization) {
        try {
            let token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, config.jwtSecretAccessToken);
            if (decoded) {
                req.body.authStatus = true
            }
        } catch (e) {
            return res.json({middle: e})
        }
    }
    next()
}
