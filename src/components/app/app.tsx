import React, { useEffect, createContext, MouseEvent} from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Route, useHistory } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import type { RootState } from '../../redux/store'

import { verifyUserTokenThunk, displayLoadingPageAC } from '../../redux/appReducer'
import type { IappState } from '../../redux/appReducer'

import './app.scss';
import Header from '../header/header'
import Login from '../login/login'
import Registration from '../registration/registration'
import LoadingPage from '../loading/loadingpage'
import { loginHoc } from '../../HOC/redirect'
const GoodsArrivals = React.lazy(() => import('../goods-arrivals/goods-arrivals'))

export const mediaQueryContext = createContext({})

interface Iprops extends IappState {
    verifyUserTokenThunk(token: string): Promise<void>
    displayLoadingPageAC(status: boolean): object
}
// Добавить ХОК-редирект роутам(кроме регистрации)

const App: React.FC<Iprops> = (props) => {

    const history = useHistory()
    // const queryParams = useCallback(
    //     function createUseMediaQueryObject<T>(query: T) {
    //         interface testObj {
    //             [key: string]: boolean
    //         }

    //         let queryObject: testObj = {}
    //         const entries = Object.entries(query)
    //         entries.forEach((arr: string[]) => {
    //             queryObject[arr[0]] = useMediaQuery(arr[1])
    //         })
    //         console.log('transform')
    //         return queryObject
    //     }
    //     , [props.mediaQuery])
    const mediaQuery = {
        widthForTransformHeader330: useMediaQuery("(max-width: 330px)"),
        widthForTransformHeader530: useMediaQuery("(max-width: 530px)"),
        widthForTransformHeader580: useMediaQuery("(max-width: 580px)"),
        widthForTransformHeader700: useMediaQuery("(max-width: 700px)"),
        widthForTransformHeader900: useMediaQuery("(max-width: 900px)"),
    }
    
    const closeMenuBlock = (e: MouseEvent) => {
        const menuBlock = document.querySelector('.header__menu-block')
        const menuName = document.querySelector('.header__menu-name')
        if (e.target === menuName) {
            menuBlock.classList.toggle('view')
        } else if (menuBlock.classList.contains('view')) {
            menuBlock.classList.remove('view')
        }
    }
    
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.verifyUserTokenThunk(localStorage.getItem('token'))
        } else {
            history.push('/login')
        }
    }, [])
    return (
        <div className='app' onClick={closeMenuBlock}>
            <mediaQueryContext.Provider value={mediaQuery}>
                <Header />
            </mediaQueryContext.Provider>
            <main className='content'>
                {
                    props.displayLoadingPage
                        ? <LoadingPage />
                        : <>
                            <React.Suspense fallback={<div>...Loading...</div>}>
                                <Route exact path='/goods-arrivals' render={() => <GoodsArrivals />} />
                            </React.Suspense>
                            <Route exact path='/registration' render={() => <Registration />} />
                            <Route exact path='/login' render={() => <Login />} />
                        </>
                }
            </main>

        </div>


    )
}
// подключение библиотеки reselect!
let mapStateToProps = (state: RootState) => {
    return {
        authStatus: state.appReducer.authStatus,
        displayLoadingPage: state.appReducer.displayLoadingPage,
        dataApp: state.appReducer.dataApp, // для просмотра пропсов - потом удалить
    }
}
export default compose(
    connect(mapStateToProps, {
        verifyUserTokenThunk,
        displayLoadingPageAC
    }),
)(App)
