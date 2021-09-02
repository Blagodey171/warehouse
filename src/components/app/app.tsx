import React , { useEffect, useState, createContext } from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Route, Redirect, useHistory} from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { verifyUserTokenThunk } from '../../redux/appReducer'
import './App.scss';
import Header from '../header/header'
import Login from '../login/login'
import Registration from '../registration/registration'
import {loginHoc} from '../../HOC/redirect' 
const GoodsArrivals = React.lazy(() => import('../goods-arrivals/goods-arrivals'))

// Добавить ХОК-редирект роутам(кроме регистрации)
export interface Query {
    widthForTransformHeader330: boolean
    widthForTransformHeader530: boolean
    widthForTransformHeader580: boolean
    widthForTransformHeader700: boolean
    widthForTransformHeader900: boolean
}
// 1.если при входе на сайт есть кука,делаю запрос,в БД ищу запись по id сессии, возвращаю на клиент данные сессии,вношу данные
// через dispatch(actionCreator)
// 1.1. при входе делается запрос на восстановление сессии с помощью куки(айди),на эндпоинте проверка JWT, проверка на наличие куки.Например хранение токена 5 часов,а сессии 12 часов.Если время жизни токена истекло то ошибка сама по себе,если нет куки сессия удалилась и все
function App(props:any) {
    const mediaQueryParam: Query = {
        widthForTransformHeader330: useMediaQuery(props.mediaQuery.widthForTransformHeader330),
        widthForTransformHeader530: useMediaQuery(props.mediaQuery.widthForTransformHeader530),
        widthForTransformHeader580: useMediaQuery(props.mediaQuery.widthForTransformHeader580),
        widthForTransformHeader700: useMediaQuery(props.mediaQuery.widthForTransformHeader700),
        widthForTransformHeader900: useMediaQuery(props.mediaQuery.widthForTransformHeader900),
    }
    const history = useHistory()
    useEffect( () => {
        if(localStorage.getItem('token')) {
            props.verifyUserTokenThunk(localStorage.getItem('token'))
        }
        if(props.authStatus) {
            history.push('/goods-arrivals')
        } else {
            history.push('/login')
        }
    }, [])
    console.log(props)
    return (
            <div className='app'>
                <Header queryParams={mediaQueryParam}/>
                <main className='content'>
                    <React.Suspense fallback={<div>...Loading...</div>}>
                        <Route exact path='/goods-arrivals' render={() => props.authStatus ? <GoodsArrivals/> : null} />
                    </React.Suspense>
                    
                    <Route exact path='/registration' render={() => <Registration/>} />
                    <Route exact path='/login' render={() => <Login/>} /> 
                </main>
                
            </div>
            
    );
}

let mapStateToProps = (state:any) => {
    return {
        authStatus: state.appReducer.authStatus,
        mediaQuery: state.appReducer.mediaQuery,
        data: state.appReducer.data,
    }
}
export default compose(
    connect(mapStateToProps, {
        verifyUserTokenThunk
    }),
)(App) 
