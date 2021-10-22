const ConnectMongo = require('../connectMongo.js')
const jwt = require('jsonwebtoken')
const entryDataValidation = require('../services/entryDataValidation.js')
const processingUserData = require('../services/processingUserData')

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
                let userDataHandling = await processingUserData(req.body)

                res.json(userDataHandling)
            } catch (errorMessage) {
                res.json(errorMessage)
            }
        },

        async logout (req, res, next) {
            optionsRequestHandler(req)
            try {
                await processingUserData(req.body)
                res.status(200)
            } catch (errorMessage) {
                res.json(errorMessage)
            }
        },

        async registration(req, res, next) {
            optionsRequestHandler(req)
            try {
                entryDataValidation(req, res)
                const userDataHandling = await processingUserData(req.body)
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
                const cookiesSessionWarehouse = req.sessionID
                
                let connectMongo = new ConnectMongo(process.env.DATABASE_NAME, process.env.COLLECTION_NAME)
                let connectMongoDatabaseCollection = await connectMongo.connectDB()
                let findResult = await connectMongoDatabaseCollection.find({_id: cookiesSessionWarehouse}).toArray()
                connectMongo.disconnectDB()
                
                res.json({
                    decodeUserData,
                    cookiesSessionWarehouse,
                    findResult,
                })
            } catch (errorMessage) {
                res.json({
                    errorMessage
                })
            }
        }
    }
}


module.exports = userHandler