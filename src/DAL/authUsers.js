import axios from 'axios';

export const registration = async (login, password) => {
    return await axios({
        method: 'post',
        url: `http://localhost:3001/api/registration`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            login, password
        },
    });
}

export const authentification = async (login, password) => {
    return await axios({
        method: 'post',
        url: `http://localhost:3001/api/login`,
        headers: { 'Content-Type': 'application/json' },
        data: {
            login, password,
        },
    })
}

export const authorization = async (token) => {
    return await axios({
        method: 'post',
        url: `http://localhost:3001/api/authorization`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true
    })
}

