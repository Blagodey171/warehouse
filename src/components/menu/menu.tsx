import * as React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {connect} from 'react-redux'
import {compose} from 'redux'


import './menu.scss'


const Menu: React.FC<{}> = (props) => {
    const menuBlockHandler = (): void => {
        document.querySelector('.header__menu-block').classList.toggle('view')
    }
    return (
        <div className='menu-container' onClick={menuBlockHandler}>
            <span className='menu-container__menu-name '>Меню</span>
        </div>

    )
}

let mapStateToProps = (state:any) => {
    return {
        authStatus: state.appReducer.authStatus,
    }
}
export default compose(
    connect(mapStateToProps, {
    }),
)(Menu)