const config = require('../config.js')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ConnectMongo = require('../connectMongo.js')

const User = require('../schema/UserModel')

const userHandler = () => {
    return {
        async login(req, res, next) {
            if (req.method === 'OPTIONS') {
                next()
            }

            try {
                let error = validationResult(req)
                if (!error.isEmpty()) {
                    return res.status(400).json({
                        ...error,
                        message: 'Некорректные данные при регистрации',
                    })
                }
                const { login, password } = req.body
                const user = await User.findOne({ login })
                if (!user) {
                    return res.json({ error: 'Данный пользователь не найден' })
                }

                const hashPassword = await bcrypt.compare(password, user.password)

                if (!hashPassword) {
                    return res.json({ error: 'Неверный логин или пароль' })
                }

                const accessToken = jwt.sign(
                    { userLogin: user.login },
                    process.env.JWT_SECRET_TOKEN,
                    // config.jwtSecretAccessToken,
                    { expiresIn: '200000' }
                )
                return res.json({ token: accessToken , login: user.login,  })
            } catch (error) {
                return res.json(error)
            }
        },

        async registration(req, res, next) {
            try {
                let err = validationResult(req)
                if (!err.isEmpty()) {
                    return res.status(400).json({
                        ...err,
                        message: 'Некорректные данные при регистрации',
                    })
                }
                const { login, password } = req.body

                const findUser = await User.findOne({ login })
                if (findUser) {
                    return res.status(400).json({ message: 'Данный пользователь существует' })
                }

                const bcryptHash = await bcrypt.hash(password, 4)
                const user = new User({ login, password: bcryptHash })
                await user.save()

                res.status(201).json({ message: 'Пользователь успешно создан', newUserLogin: login})
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
                const decodeUserData = jwt.verify(token, config.jwtSecretAccessToken)
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