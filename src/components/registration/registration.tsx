import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { registrationThunk, } from '../../redux/loginReducer'
import { settingsValidation } from '../../settings-validation/settings-validation'
import { loginHoc } from '../../HOC/redirect'
interface RegistrationData {
    login: String;
    password: String;
}

const Registration = (props: any) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    // const [color, setcolor] = useState(true)

    const registrationHandler = (data: RegistrationData) => {
        // setcolor(!color)
        props.registrationThunk(data.login, data.password)
    }
    console.log('registration')
    return (

        <section className='login-container'>
            {
                props.errorMessage ? <span className='login-container__toast-errorMessage' ><b>{props.errorMessage}</b></span> : null
            }
            <h1 className='login-container__section-title'> {props.newUserLogin ? `Успешная регистрация пользователя ${props.newUserLogin}` : 'Регистрация'} </h1>
            <div className='login-container__form-container'>
                <form onSubmit={handleSubmit(registrationHandler)} className='login-form'   >

                    <label className='login-form__label' >login / логин</label>
                    <input autoComplete='false' className='login-form__menu-item' {...register('login', { required: true, maxLength: settingsValidation.maxLenght, minLength: settingsValidation.minLenght })}></input>
                    {errors.login?.type === 'maxLength' && <p>Максимальная длина логина 20 символа</p>}
                    {errors.login?.type === 'minLength' && <p>Миниимальная длина логина 6 символа</p>}
                    {errors.login?.type === 'required' && <p>Обязательно поле</p>}

                    <label className='login-form__label' htmlFor="password">password / пароль</label>
                    <input autoComplete='false' type='password' className='login-form__menu-item' {...register('password', { required: true, maxLength: settingsValidation.maxLenght, minLength: settingsValidation.minLenght })}></input>
                    {errors.password?.type === 'maxLength' && <p>Максимальная длина логина 20 символа</p>}
                    {errors.password?.type === 'minLength' && <p>Миниимальная длина логина 6 символа</p>}
                    {errors.password?.type === 'required' && <p>Обязательно поле</p>}

                    <button type='submit'> submit  </button>
                </form>
            </div>
        </section>
    )
}

let mapStateToProps = (state: any) => {
    return {
        newUserLogin: state.loginReducer.newUserLogin,
        errorMessage: state.loginReducer.errorMessage
    }
}
export default compose(
    connect(mapStateToProps, {
        registrationThunk,
    })
)(Registration)