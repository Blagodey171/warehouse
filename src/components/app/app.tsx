import React , { useEffect, useState, createContext, useContext, Context, MouseEvent } from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Route, useHistory} from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import type {RootState} from '../../redux/store'

import { verifyUserTokenThunk, displayLoadingPageAC } from '../../redux/appReducer'
import type { IappState } from '../../redux/appReducer'
import type {AppDispatch} from '../../redux/store'

import './app.scss';
import Header from '../header/header'
import Login from '../login/login'
import Registration from '../registration/registration'
import LoadingPage from '../loading/loadingpage'
import {loginHoc} from '../../HOC/redirect' 
const GoodsArrivals = React.lazy(() => import('../goods-arrivals/goods-arrivals'))


interface Iprops extends IappState {
    verifyUserTokenThunk(token: string): Promise<void>
    displayLoadingPageAC(status: boolean): object
}
// Добавить ХОК-редирект роутам(кроме регистрации)

const closeMenuBlock = (e: MouseEvent) => {
    const menuBlock = document.querySelector('.header__menu-block')
    const containsClassMenuName = document.querySelector('.header__menu-name')
    if (e.target === containsClassMenuName) {
        menuBlock.classList.toggle('view')
    } else if (menuBlock.classList.contains('view')) {
        menuBlock.classList.remove('view')
    }
}
// проверка на наличие токена - если есть то проверка на актуальность
// проверка на наличие сессии,ищем по куке(если сессии нет то выкидываем ошибку-логаут. Заново логинимся-создается сессия)
// если сессия есть - делается запрос на восстановление сессии с помощью куки(айди)
// сессия содержит: JWT, user...
// создаем по полю user(содержится в сессии)новый токен
// Например хранение JWT 5 часов,а сессии 12 часов
// Если время жизни JWT истекло то ошибка и нужно логиниться и сохранять новый JWT в сессию
// если нет куки сессия удалилась и логинимся/создаем(пока что создается при любом запросе на сервер) сессию по новой(можно ли создавать сессию при запросе на определенный эндпоинт)

const App: React.FC<Iprops> = (props) => {
    const queryParams = {
        widthForTransformHeader330: useMediaQuery(props.mediaQuery.widthForTransformHeader330),
        widthForTransformHeader530: useMediaQuery(props.mediaQuery.widthForTransformHeader530),
        widthForTransformHeader580: useMediaQuery(props.mediaQuery.widthForTransformHeader580),
        widthForTransformHeader700: useMediaQuery(props.mediaQuery.widthForTransformHeader700),
        widthForTransformHeader900: useMediaQuery(props.mediaQuery.widthForTransformHeader900),
    }
    const history = useHistory()
    
    useEffect(() => {
        if(localStorage.getItem('token')) {
            props.verifyUserTokenThunk(localStorage.getItem('token'))  
        } else {
            history.push('/login')
        }
    }, [])
    
    console.log(props)
    return (
            <div className='app' onClick={closeMenuBlock}>
                <Header queryParams={queryParams} />
                <main className='content'>
                    {
                        props.displayLoadingPage 
                        ? <LoadingPage/> 
                        :   <>
                                <React.Suspense fallback={<div>...Loading...</div>}>
                                        <Route exact path='/goods-arrivals' render={() =><GoodsArrivals /> }/>
                                </React.Suspense>
                                <Route exact path='/registration' render={() => <Registration />} />
                                <Route exact path='/login' render={() => <Login />} />
                            </>
                    }
                </main>
                
            </div>
            
            
    );
}
// подключение библиотеки reselect!
let mapStateToProps = (state: RootState) => {
    return {
        authStatus: state.appReducer.authStatus,
        mediaQuery: state.appReducer.mediaQuery,
        displayLoadingPage: state.appReducer.displayLoadingPage,
        dataApp: state.appReducer.dataApp,
    }
}
export default compose(
    connect(mapStateToProps, {
        verifyUserTokenThunk,
        displayLoadingPageAC
    }),
)(App) 
