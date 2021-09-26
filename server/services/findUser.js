const User = require('../schema/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const findUser = async (body) => {
    try {
        const { login, password, handlerName } = body
        const findUser = await User.findOne({ login })
        
        if (handlerName === 'LOGIN') {
            if (!findUser) { 
                return {errorMessage: 'Данный пользователь не найден'} 
            }
            const hashPassword = await bcrypt.compare(password, findUser.password)
            if(!hashPassword) { 
                return {errorMessage: 'Неверный логин или пароль' }
            } else {
                return {
                    token: jwt.sign(
                        { userLogin: findUser.login },
                        process.env.JWT_SECRET_TOKEN,
                        { expiresIn: '200000' }
                    ),
                    login: findUser.login
                }
            }
        } else if (handlerName === 'REGISTRATION') {
            if (findUser) { 
                return {errorMessage: 'Данный пользователь существует'} 
            }
            const bcryptHash = await bcrypt.hash(password, 4)
            const user = new User({ login, password: bcryptHash })
            await user.save()

            return { message: 'Пользователь успешно создан', newUserLogin: login }
        }
        
    } catch (errorMessage) {
        return errorMessage
    }
    
}

module.exports = findUser