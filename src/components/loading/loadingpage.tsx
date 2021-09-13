import React from 'react'


interface IProps {
    messageLoadingPage?: string
}
const LoadingPage: React.FC<IProps> = ({ messageLoadingPage }) => {

    return (
        <div>
            <h1>LOADING PAGE {messageLoadingPage}</h1>
        </div>
    )
}

export default LoadingPage