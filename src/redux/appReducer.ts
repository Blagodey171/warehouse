// import { displayLoadingPageAC } from './appReducer';
import { authorization } from '../DAL/authUsers'
import { AnyAction } from 'redux'
import type {AppDispatch} from './store'
// import { logoutAC } from '../redux/loginReducer'


const VIEW_USER_DATA_APP = 'VIEW_USER_DATA_APP';
const SET_AUTH_STATUS = 'SET_AUTH_STATUS'
const SET_DISPLAY_LOADING_PAGE_STATUS = 'SET_DISPLAY_LOADING_PAGE_STATUS'
const DELETE_JWT_TOKEN = 'DELETE_JWT_TOKEN'
export interface IqueryParams {
    widthForTransformHeader330: string,
    widthForTransformHeader530: string,
    widthForTransformHeader580: string,
    widthForTransformHeader700: string,
    widthForTransformHeader900: string,
}
export interface IappState {
    authStatus: boolean, 
    displayLoadingPage: boolean,
    dataApp: object
}
const initialState : IappState = {
    authStatus: false,
    
    displayLoadingPage: false,
    dataApp: {}
} 

const appReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        
        
        case SET_AUTH_STATUS: {
            return {
                ...state,
                authStatus: action.status
            }
        }
        case SET_DISPLAY_LOADING_PAGE_STATUS: {
            return {
                ...state,
                displayLoadingPage: action.status
            }
        }
        case VIEW_USER_DATA_APP: {
            return {
                ...state,
                dataApp: action.data
            }
        }
        default: return state;
    }
} 

export const setAuthStatusAC = (status: boolean) => {
    return {
        type: SET_AUTH_STATUS,
        status
    }
}
export const displayLoadingPageAC = (status: boolean) => {
    return {
        type: SET_DISPLAY_LOADING_PAGE_STATUS,
        status
    }
}
export const viewUserDataACapp = (data: object) => {
    return {
        type: VIEW_USER_DATA_APP,
        data
    }
}

export const verifyUserTokenThunk = (token: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(displayLoadingPageAC(true))
        const decoded = await authorization(token)
        if ( decoded.data.parseSession ) { 
            dispatch(displayLoadingPageAC(false))
            localStorage.setItem('token', decoded.data.parseSession.token)
            dispatch(setAuthStatusAC(true))
        } else if (decoded.data.decodeUserData) {
            dispatch(setAuthStatusAC(true))
            dispatch(viewUserDataACapp(decoded.data))
             // для отображение в пропсах,чтобы смотреть что пришло
            dispatch(displayLoadingPageAC(false))
        } else {
            // нужно удалить
            dispatch(setAuthStatusAC(false))
            localStorage.clear()
            dispatch(displayLoadingPageAC(false))
        }
    }
}

export default appReducer;