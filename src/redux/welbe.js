import { Switch } from "react-router"

const GETDATA = 'GETDATA'

const initialState = {
    data: [
        {
            date: '12.01.20',
            name: 'coding',
            pcs: '3',
            distance: '123'
        },
        {
            date: '12.01.20',
            name: 'run',
            pcs: '5',
            distance: '1111'
        },
        {
            date: '12.01.20',
            name: 'cooking',
            pcs: '7',
            distance: '12'
        },
        {
            date: '12.01.20',
            name: 'sleep',
            pcs: '42',
            distance: '1'
        },
        {
            date: '12.01.20',
            name: 'trade',
            pcs: '9872',
            distance: '900'
        },

    ]
}

const welbeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETDATA: {
            return {
                data: action.data
            }
        }
            
    
        default: {
            return state
        }
            
    }
}

export const getDataAC = (data) => {
    return {
        type: GETDATA,
        data
    }
}

export const getdataThunk = () => {
    return (dispatch) => {

    }
}