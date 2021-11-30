const ConnectMongo = require('../connectMongo.js')
const jwt = require('jsonwebtoken')

const entryDataValidation = require('../services/entryDataValidation.js')
const processingUserData = require('../services/login/processingUserData')
const {upgradeJWTTokenInSession} = require('../services/auth/upgradeJWTTokenInSession')


const optionsRequestHandler = (req) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
}
const userHandler = () => {
    return {
        async login(req, res, next) {
            optionsRequestHandler(req)
            try {
                entryDataValidation(req)
                let userDataHandling = await processingUserData(req)

                res.json(userDataHandling)
            } catch (errorMessage) {
                res.json(errorMessage)
            }
        },

        async logout (req, res, next) {
            optionsRequestHandler(req)
            try {
                await processingUserData(req)

                res.status(200)
            } catch (errorMessage) {
                res.json(errorMessage)
            }
        },

        async registration(req, res, next) {
            optionsRequestHandler(req)
            try {
                entryDataValidation(req, res)
                const userDataHandling = await processingUserData(req)

                res.status(201).json(userDataHandling)
            } catch (errorMessage) {
                res.json(errorMessage)
            }
        },

        async authorization (req, res, next) {
            if (req.method === 'OPTIONS') {
                next()
            }
            try {
                if (!req.headers.authorization) {
                    throw {errorMessage: 'К сожалению Вы не прошли авторизацию'} // СДЕЛАТЬ ОТОБРАЖЕНИЕ ОШИБКИ НА КЛИЕНТЕ
                }
                let token = req.headers.authorization.split(' ')[1]
                const decodeUserData = jwt.verify(token, process.env.JWT_SECRET_TOKEN)

                // тут вытаскиваем объект с данными сессии
                // req.session.test = 'test Hello'
                // const sessionBase = req.session
                
                res.json({
                    decodeUserData,
                })
            } catch (errorMessage) {
                // сюда перейдем ТОЛЬКО если нет\не валидный токен
                // req.sessionID берется из тела запроса, sessionID берется тот который создался и записался при последнем логине 
                const upgradeSession = upgradeJWTTokenInSession(req, res, errorMessage)
                return upgradeSession
                // const cookiesSessionWarehouse = req.sessionID
                // let connectMongo = new ConnectMongo(process.env.DATABASE_NAME, process.env.COLLECTION_NAME_SESSIONS)
                // let connectMongoDatabaseCollection = await connectMongo.connectDB()
                // let findResult = await connectMongoDatabaseCollection.find({id: cookiesSessionWarehouse}).toArray()

                // if (findResult.length) { //<= Если есть сессия(сессия будет в массиве,поэтому length)
                //     const parse = JSON.parse(findResult[0].session)
                //     const newJWTToken = createJWTToken(parse.user, process.env.TOKEN_EXPIRES_IN)
                //     parse.token = newJWTToken

                //     const newSessionObject = JSON.stringify(parse)
                //     await connectMongoDatabaseCollection.updateOne(
                //         {id: cookiesSessionWarehouse},
                //         {
                //             $set: { 'session': `${newSessionObject}`},
                //             $currentDate: {lastModified: true}
                //         }
                //     )
                //     connectMongo.disconnectDB()
                    
                //     res.json({
                //         parseSession: {
                //             ...parse,
                //             thisIs: 'test'
                //         }
                //     })
                // } else {// Если не нашлась сессия,то выкинем ошибку и будет логаут
                //     res.json({
                //         errorMessage,
                //     })
                // }
                
            }
        }
    }
}


module.exports = userHandler