import { authentification, registration, logout } from '../DAL/authUsers'
import { setAuthStatusAC } from './appReducer'
import { batch } from 'react-redux'
import { AnyAction } from 'redux'

import { AppDispatch } from './store'

const LOGIN = 'LOGIN'
const REGISTRATION = 'REGISTRATION'
const SHOW_ERROR = 'SHOW_ERROR'
const LOGOUT = 'LOGOUT'
const VIEW_USER_DATA_LOGIN = 'VIEW_USER_DATA_LOGIN';

interface Istate  {
    login: string,
    token: string,
    newUserLogin: string,
    errorMessage: string,
    data: null
}

const initialState: Istate = {
    login: null,
    token: null,
    newUserLogin: null,
    errorMessage: null,
    data: null
}


const loginReducer = (state = initialState, action: AnyAction ) => {
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
                login: null,
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
        case VIEW_USER_DATA_LOGIN: {
            return {
                ...state,
                data: action.data
            }
        }
        default : {
            return {
                ...state
            }
        }
    }
}



export const loginAC = (login: string, token: string) => {
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
export const registrationAC = (login: string) => {
    return {
        type: REGISTRATION,
        login,
    }
}
export const showErrorAC = (errorMessage: string) => {
    return {
        type: SHOW_ERROR,
        errorMessage,
    }
}
export const viewUserDataAClogin = (data: object) => {
    return {
        type: VIEW_USER_DATA_LOGIN,
        data
    }
}

export const loginThunk = (login: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        let loginRequest = await authentification(login, password, LOGIN)
        if (loginRequest.data.errorMessage) {
            dispatch(showErrorAC(loginRequest.data.errorMessage))
        } else {
            batch(() => {
                dispatch(showErrorAC(null))
                dispatch(loginAC(loginRequest.data.login, loginRequest.data.token))
                dispatch(setAuthStatusAC(true))
                dispatch(viewUserDataAClogin(loginRequest.data))
            })
            localStorage.setItem('token', loginRequest.data.token)
            localStorage.setItem('login', loginRequest.data.login)
        }
    }
}

export const logoutThunk = (userLogin: string) => {
    return async (dispatch: AppDispatch) => {
        localStorage.clear()
        dispatch(logoutAC())
        await logout(userLogin, LOGOUT)
    }
}
export const registrationThunk = (login: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        let registrationResponse = await registration(login, password, REGISTRATION)
        if (registrationResponse.data.errorMessage) {
            dispatch(showErrorAC(registrationResponse.data.errorMessage))
        } else {
            dispatch(registrationAC(registrationResponse.data.newUserLogin))
        }
    }
}


export default loginReducer