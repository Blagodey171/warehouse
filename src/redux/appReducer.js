import { authorization } from '../DAL/authUsers'
// import { logoutAC } from '../redux/loginReducer'


const POST_DATA = 'POST_DATA';
const SET_AUTH_STATUS = 'SET_AUTH_STATUS'
const SET_DISPLAY_LOADING_PAGE_STATUS = 'SET_DISPLAY_LOADING_PAGE_STATUS'
const DELETE_JWT_TOKEN = 'DELETE_JWT_TOKEN'

const initialState = {
    authStatus: false,
    mediaQuery: {
        widthForTransformHeader330: "(max-width: 330px)",
        widthForTransformHeader530: "(max-width: 530px)",
        widthForTransformHeader580: "(max-width: 580px)",
        widthForTransformHeader700: "(max-width: 700px)",
        widthForTransformHeader900: "(max-width: 900px)",
    },
    displayLoadingPage: null,
} 

const appReducer = (state = initialState, action) => {
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
        default: return state;
    }
} 

export const setAuthStatusAC = (status) => {
    return {
        type: SET_AUTH_STATUS,
        status
    }
}
export const displayLoadingPageAC = (status) => {
    return {
        type: SET_DISPLAY_LOADING_PAGE_STATUS,
        status
    }
}

const repeatedRequest = async (token) => { // перезапуск поиска сессии юзера.после удаления сессии,чтобы получить новую необходимо сделать запрос к серверу - нужно исправить: вместо перезагрузки,обращаться к серверу чтобы получать новую сессию
    let decoded = await authorization(token)
    if (decoded.data.findResult == false) {
        repeatedRequest(token)
    }
    return decoded
}
export const verifyUserTokenThunk = (token) => {
    return async (dispatch) => {
        dispatch(displayLoadingPageAC(true))
        const decoded = await repeatedRequest(token)
        if ( decoded.data.errorMessage ) { // ЕСЛИ ОШИБКА, errorMessage можно передать в обработчик ошибки
            dispatch(setAuthStatusAC(false))
            localStorage.clear()
            dispatch(displayLoadingPageAC(false))
        } else if (decoded.data.decodeUserData) {
            dispatch(setAuthStatusAC(true))
             // для отображение в пропсах,чтобы смотреть что пришло
            dispatch(displayLoadingPageAC(false))
        }
    }
}

export default appReducer;