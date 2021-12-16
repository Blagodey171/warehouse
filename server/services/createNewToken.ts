const jwt = require('jsonwebtoken')


export function createJWTToken (payload:string, time:string) {
    const JWTToken: string = jwt.sign(
        { userLogin: payload },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: time }
    )
    return JWTToken
}