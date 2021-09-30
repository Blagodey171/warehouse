import { registration } from '../DAL/authUsers'
import { authentification } from '../DAL/authUsers'
import { setAuthStatusAC } from './appReducer'
import { batch } from 'react-redux'

const LOGIN = 'LOGIN'
const REGISTRATION = 'REGISTRATION'
const SHOW_ERROR = 'SHOW_ERROR'
const LOGOUT = 'LOGOUT'

const initialState = {
    login: null,
    token: null,
    newUserLogin: null,
    errorMessage: null,
}


const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: {
            return {
                ...state,
                login: action.login,
                token: action.token,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: null,
                token: null,
            }
        }
        case REGISTRATION : {
            return {
                ...state,
                newUserLogin: action.login
            }
        }
        case SHOW_ERROR : {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        default : {
            return {
                ...state
            }
        }
    }
}



export const loginAC = (login, token) => {
    return {
        type: LOGIN,
        login,
        token
    }
}
export const logoutAC = () => {
    return {
        type: LOGOUT,
    }
}
export const registrationAC = (login) => {
    return {
        type: REGISTRATION,
        login,
    }
}
export const showErrorAC = (errorMessage) => {
    return {
        type: SHOW_ERROR,
        errorMessage,
    }
}

export const authentificationThunk = (login, password) => {
    return async (dispatch) => {
        let loginRequest = await authentification(login, password, LOGIN)
        if (loginRequest.data.errorMessage) {
            dispatch(showErrorAC(loginRequest.data.errorMessage))
        } else {
            batch(() => {
                dispatch(showErrorAC(null))
                dispatch(loginAC(loginRequest.data.login, loginRequest.data.token))
                dispatch(setAuthStatusAC(true))
            })
            localStorage.setItem('token', loginRequest.data.token)
        }
    }
}
export const registrationThunk = (login, password) => {
    return async (dispatch) => {
        let registrationResponse = await registration(login, password, REGISTRATION)
        if (registrationResponse.data.errorMessage) {
            dispatch(showErrorAC(registrationResponse.data.errorMessage))
        } else {
            dispatch(registrationAC(registrationResponse.data.newUserLogin))
        }
    }
}


export default loginReducer