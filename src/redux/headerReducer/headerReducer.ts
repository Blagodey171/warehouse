import { AnyAction } from 'redux'
import { InavigationItems } from './headerInterface'

const GET_NAVIGATION_ITEM = 'GET_NAVIGATION_ITEM'

interface IheaderState {
    navItems: InavigationItems[]
    
}

const initialState: IheaderState = {
    navItems: [
        {
            name: 'Поступление товаров',
            link: '/goods-arrivals'
        },
        {
            name: 'Внутренние документы',
            link: '/internal-documents'
        },
        {
            name: 'Заказы клиентов',
            link: '/customer-orders'
        },
        {
            name: 'Документы оплаты',
            link: '/payment-documents'
        },
        {
            name: 'Возврат товаров от клиентов',
            link: '/return-goods'
        },
        {
            name: 'Обмен товаров клиентов',
            link: '/exchange-goods'
        },
    ],
    
}


const headerReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case GET_NAVIGATION_ITEM : {
            return {
                ...state
            }
        }
        default:
            return {...state}
    }


}
export const getNavigationItemAC = () => {
    return {
        type: GET_NAVIGATION_ITEM,
    }
}




export default headerReducer;




