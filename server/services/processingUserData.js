const User = require('../schema/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const processingUserData = async (body) => {
    try {
        const { login, password, handlerName } = body
        const findUserDatabase = await User.findOne({ login })
        if (handlerName === 'LOGIN') {
            if (!findUserDatabase) { 
                throw {errorMessage: 'Данный пользователь не найден'} 
            }
            const hashPassword = await bcrypt.compare(password, findUserDatabase.password)
            if (!hashPassword) {
                throw {errorMessage: 'Неверный логин или пароль' } 
            }
            return {
                token: jwt.sign(
                    { userLogin: findUserDatabase.login },
                    process.env.JWT_SECRET_TOKEN,
                    { expiresIn: '200000' }
                ),
                login: findUserDatabase.login
            }

        } else if (handlerName === 'REGISTRATION') {
            if (findUserDatabase) { 
                throw {errorMessage: 'Данный пользователь существует'} 
            }
            const bcryptHash = await bcrypt.hash(password, 4)
            const user = new User({ login, password: bcryptHash })
            await user.save()

            return { message: 'Пользователь успешно создан', newUserLogin: login }
        }
    } catch (errorMessage) {
        throw errorMessage
    }
    
}

module.exports = processingUserData