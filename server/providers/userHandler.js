const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ConnectMongo = require('../connectMongo.js')

const User = require('../schema/UserModel')
const entryDataValidation = require('../services/entryDataValidation.js')
const findUser = require('../services/findUser')

const userHandler = () => {
    return {
        async login(req, res, next) {
            if (req.method === 'OPTIONS') {
                next()
            }

            try { // МОЖНО УДАЛИТЬ TRY-CATCH
                entryDataValidation(req, res)

                const userDataHandling = await findUser(req.body)
                
                return res.json(userDataHandling)
            } catch (errorMessage) {
                return res.json(errorMessage)
            }
        },

        async registration(req, res, next) {
            try {
                entryDataValidation(req, res)
                const userDataHandling = await findUser(req.body)
                res.status(201).json(userDataHandling)
            } catch (e) {
                return res.json({error: e})
            }
        },

        async authorization (req, res, next) {
            if (req.method === 'OPTIONS') {
                next()
            }
            try {
                let token = req.headers.authorization.split(' ')[1];
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
            } catch (error) {
                res.json(error)
            }
        }
    }
}


module.exports = userHandler