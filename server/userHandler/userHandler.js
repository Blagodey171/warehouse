const config = require('../config.js')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../schema/UserModel')
const Token = require('../schema/TokenModel')


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
                    config.jwtSecretAccessToken,
                    { expiresIn: '180' }
                )
                const refreshToken = jwt.sign(
                    { userLogin: user.login },
                    config.jwtSecretRefreshToken,
                    { expiresIn: '30d' }
                )
                const token = new Token({
                    user: user._id,
                    refreshToken: refreshToken
                })

                token.save()
                
                return res.json({ token: accessToken , login: user.login, })
            } catch (e) {
                next(e)
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

                const userFind = await User.findOne({ login })
                if (userFind) {
                    return res.status(400).json({ message: 'Данный пользователь существует' })
                }

                const bcryptHash = await bcrypt.hash(password, 4)
                const user = new User({ login, password: bcryptHash })
                await user.save()

                res.status(201).json({ message: 'Пользователь успешно создан', newUserLogin: login })
            } catch (e) {
                res.status(500).json({ message: e })
            }
        }
    }
}


module.exports = userHandler