const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import {User} from '../schema/UserModel'

interface IloginObject {
    token: string,
    login: string
}
interface IregistrationObject {
    message: string,
    newUserLogin: string
}
async function processingUserData<T extends {
    login: string,
    password: string,
    handlerName: string
}> (body: T) {
    try {
        const { login, password, handlerName } = body
        const findUserInDatabase = await User.findOne({ login })
        if (handlerName === 'LOGIN') {
            if (!findUserInDatabase) { 
                throw {errorMessage: 'Данный пользователь не найден'} 
            }
            const hashPassword: boolean = await bcrypt.compare(password, findUserInDatabase.password)
            if (!hashPassword) {
                throw {errorMessage: 'Неверный логин или пароль' } 
            }

            findUserInDatabase.isAuthorisation = true
            await findUserInDatabase.save()

            const responseLogin: IloginObject = {
                token: jwt.sign(
                    { userLogin: findUserInDatabase.login },
                    process.env.JWT_SECRET_TOKEN,
                    { expiresIn: '100000' }
                ),
                login: findUserInDatabase.login
            }
            return responseLogin
        } else if (handlerName === 'LOGOUT') {
            findUserInDatabase.isAuthorisation = false
            await findUserInDatabase.save()
            return
        } else if (handlerName === 'REGISTRATION') {
            if (findUserInDatabase) { 
                throw {errorMessage: 'Данный пользователь существует'} 
            }
            const bcryptHash: string = await bcrypt.hash(password, 4)
            const user = new User({ login, password: bcryptHash })
            await user.save()
            const responseRegistration: IregistrationObject = { message: 'Пользователь успешно создан', newUserLogin: login }
            return responseRegistration
        }
    } catch (errorMessage) {
        throw errorMessage
    }
    
}
module.exports = processingUserData