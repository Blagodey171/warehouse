import * as React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {connect} from 'react-redux'
import {compose} from 'redux'


import './menu.scss'
import {Query} from '../app/app'


const Menu: React.FC<{queryParams:Query, children: React.ReactNode}> = (props) => {
    const menuBlockHandler = (): void => {
        document.querySelector('.header__menu-block').classList.toggle('view')
    }
    return (
        <div className='menu-container' onClick={menuBlockHandler}>
            <span className='menu-container__menu-name '>Меню</span>
            {props.children}
        </div>

    )
}

let mapStateToProps = (state:any) => {
    return {
    }
}
export default compose(
    connect(mapStateToProps, {
    }),
)(Menu)