const POST_DATA = 'POST_DATA';
const initialState = {
    data: 1,
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
        case POST_DATA: {
            return {
                ...state,
                data: ++state.data
            }
        }
        default: return state;
    }
} 

export const getDataAC = (data) => {
    return {
        type: POST_DATA,
        data
    }
}

export default appReducer;