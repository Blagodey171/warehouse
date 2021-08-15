import React, { useEffect } from 'react'
import './login.scss'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { settingsValidation } from '../../settings-validation/settings-validation'
import { setAuthStatusAC, authentificationThunk } from '../../redux/loginReducer'


let Login = (props:any) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    interface RegistrationData {
        login: String;
        password: String;
    }
    const authentification = (data:RegistrationData) => {
        return props.authentificationThunk(data.login, data.password)
    }
    if (props.authStatus) {
        return <Redirect to='/goods-arrivals' />
    }
    return (
        <section className='login-container'>
            <h1 className='login-container__section-title'>Вход</h1>
            <div className='login-container__form-container'>
                <form onSubmit={handleSubmit(authentification)} className='login-form'>

                    <label className='login-form__label' htmlFor='login'>Login / Логин</label>
                    <input autoComplete='false' className='login-form__menu-item' {...register('login', { required: true, maxLength: settingsValidation.maxLenght, minLength: settingsValidation.minLenght })} />
                    {errors.login?.type === 'maxLength' && <p>Максимальная длина логина 20 символа</p>}
                    {errors.login?.type === 'minLength' && <p>Миниимальная длина логина 6 символа</p>}
                    {errors.login?.type === 'required' && <p>Обязательно поле</p>}


                    <label className='login-form__label' htmlFor="password">Password / Пароль</label>
                    <input autoComplete='false' type='password' className='login-form__menu-item' {...register('password', { required: true, maxLength: settingsValidation.maxLenght, minLength: settingsValidation.minLenght })} />
                    {errors.password?.type === 'maxLength' && <p>Максимальная длина логина 20 символа</p>}
                    {errors.password?.type === 'minLength' && <p>Миниимальная длина логина 6 символа</p>}
                    {errors.password?.type === 'required' && <p>Обязательно поле</p>}
                    <input type='submit'/>
                </form>
            </div>
        </section>
    )
}

let mapStateToProps = (state:any) => {
    return {
        authStatus: state.loginReducer.authStatus,
        user: state.loginReducer.user,
        token: state.loginReducer.token,
        error: state.loginReducer.error,
    }
}
export default compose(
    connect(mapStateToProps, {
        authentificationThunk,
        setAuthStatusAC,
    }),
)(Login)