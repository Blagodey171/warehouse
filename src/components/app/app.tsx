import React , { useEffect, useState, createContext } from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Route, Redirect, useHistory} from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { getDataAC } from '../../redux/appReducer'
import { loginAC } from '../../redux/loginReducer'
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


function App(props:any) {
    

    const mediaQueryParam: Query = {
        widthForTransformHeader330: useMediaQuery(props.mediaQuery.widthForTransformHeader330),
        widthForTransformHeader530: useMediaQuery(props.mediaQuery.widthForTransformHeader530),
        widthForTransformHeader580: useMediaQuery(props.mediaQuery.widthForTransformHeader580),
        widthForTransformHeader700: useMediaQuery(props.mediaQuery.widthForTransformHeader700),
        widthForTransformHeader900: useMediaQuery(props.mediaQuery.widthForTransformHeader900),
    
    }
    console.log(mediaQueryParam)
    const history = useHistory()
    useEffect(() => {
        if(localStorage.getItem('login')) {
            props.loginAC(localStorage.getItem('login'), localStorage.getItem('token'))
            history.push('/goods-arrivals')
        } else {
            history.push('/login')
        }
    })
    
    return (
            <div className='app'>
                <Header queryParams={mediaQueryParam}/>
                <main className='content'>
                    <React.Suspense fallback={<div>...Loading...</div>}>
                        <Route exact path='/goods-arrivals' render={() => <GoodsArrivals/>} />
                    </React.Suspense>
                    
                    <Route exact path='/registration' render={() => <Registration/>} />
                    <Route exact path='/login' render={() => <Login/>} />
                </main>
                
            </div>
            
    );
}

let mapStateToProps = (state:any) => {
    return {
        authStatus: state.loginReducer.authStatus,
        mediaQuery: state.appReducer.mediaQuery
    }
}
export default compose(
    connect(mapStateToProps, {
        // getDataAC,
        loginAC,
    }),
)(App) 
// 'http://45.90.33.6/posts'
// 
