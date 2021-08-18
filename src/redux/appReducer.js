import { authorization } from '../DAL/authUsers'


const POST_DATA = 'POST_DATA';
const USER_TOKEN_STATUS = 'USER_TOKEN_STATUS';

const initialState = {
    data: null,
    mediaQuery: {
        widthForTransformHeader330: "(max-width: 330px)",
        widthForTransformHeader530: "(max-width: 530px)",
        widthForTransformHeader580: "(max-width: 580px)",
        widthForTransformHeader700: "(max-width: 700px)",
        widthForTransformHeader900: "(max-width: 900px)",
    }
} 

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case USER_TOKEN_STATUS: {
            return {
                ...state,
                data: action.data
            }
        }
        default: return state;
    }
} 


export const userTokenStatus = (data) => {
    return {
        type: USER_TOKEN_STATUS,
        data
    }
}

export const verifyUserTokenThunk = (token) => {
    return async (dispatch) => {
        const decoded = await authorization(token)
        
        dispatch(userTokenStatus(decoded))
    }
}

export default appReducer;