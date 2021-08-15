import React from 'react'
import { Redirect } from 'react-router-dom'



export const loginHoc = (Component) => {

    const withAuthRedirect = () => {
        return !localStorage.getItem('login') ? <Redirect to='/login' /> : <Component/>
    }

    return withAuthRedirect
}