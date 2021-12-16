import axios from 'axios';
const url = 'http://localhost:3001'
export const registration = async (login, password, handlerName) => {
    return await axios({
        method: 'post',
        url: `/api/registration`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            login, password, handlerName
        },
        withCredentials: true
    });
}

export const authentification = async (login, password, handlerName) => {
    return await axios({
        method: 'post',
        url: `/api/login`,
        headers: { 'Content-Type': 'application/json' },
        data: {
            login,
            password,
            handlerName
        },
        withCredentials: true
    })
}
export const logout = async (login, handlerName) => {
    return await axios({
        method: 'post',
        url: `/api/logout`,
        headers: { 'Content-Type': 'application/json' },
        data: {
            login,
            handlerName
        },
        withCredentials: true
    })
}

export const authorization = async (token) => {
    return await axios({
        method: 'post',
        url: `/api/authorization`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true
    })
}

