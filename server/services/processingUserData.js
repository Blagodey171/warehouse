const User = require('../schema/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// <T extends {
//     login: string,
//     password: string,
//     handlerName: string
// }>

async function processingUserData (body) {
    try {
        const { login, password, handlerName } = body
        const findUserInDatabase = await User.findOne({ login })
        if (handlerName === 'LOGIN') {
            if (!findUserInDatabase) { 
                throw {errorMessage: 'Данный пользователь не найден'} 
            }
            const hashPassword = await bcrypt.compare(password, findUserInDatabase.password)
            if (!hashPassword) {
                throw {errorMessage: 'Неверный логин или пароль' } 
            }
            return {
                token: jwt.sign(
                    { userLogin: findUserInDatabase.login },
                    process.env.JWT_SECRET_TOKEN,
                    { expiresIn: '100000' }
                ),
                login: findUserInDatabase.login
            }
        }
         else if (handlerName === 'REGISTRATION') {
            if (findUserInDatabase) { 
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