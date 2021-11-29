const jwt = require('jsonwebtoken')

type dataForCrateJWT = string

export function createJWTToken (payload:dataForCrateJWT, time:dataForCrateJWT) {
    const JWTToken: string = jwt.sign(
        { userLogin: payload },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: time }
    )
    return JWTToken
}