import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import './header.scss'
import { getNavigationItemAC } from '../../redux/headerReducer';
import { logoutAC } from '../../redux/loginReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Menu from '../menu/menu'
import {Query} from '../app/app'

const Header: React.FC<{queryParams:Query}> = React.memo((props: any) => {
    const history = useHistory()
    const { formState: { errors }, handleSubmit } = useForm()
    const [openMenu, setOpenMenu] = useState(false)
    

    const getMenuElements = (amountElements:number) => {
        const links = [...props.navigationItem].splice(-amountElements, amountElements)
        return links.map(item => <NavLink to={item.link} className='menu-container__button' key={item.name}>{item.name}</NavLink>)
    }

    const getHeaderElements = (amountElements:number) => {
        const links = [...props.navigationItem]
        links.splice(-amountElements, amountElements)
        return links.map(item => <NavLink to={item.link} className='header__item' key={item.name}>{item.name}</NavLink>)
    }

    const setAllLinksInMenu = () => {
        return props.navigationItem.map((item:any) => <NavLink to={item.link} className='menu-container__button' key={item.name}>{item.name}</NavLink>)
    }

    const getLengthMenuElements = () => {
        let values = 0;
        Object.values(props.queryParams).forEach(value => {
            if (value) values++
        })
        return values
    }

    const menuHandler = (e:any) => {
        e.preventDefault()
        openMenu ? setOpenMenu(false) : setOpenMenu(true)
    }


    useEffect(() => {
        document.querySelector('.menu-container__menu-name').addEventListener('click' , menuHandler)
        return () => {document.querySelector('.menu-container__menu-name').removeEventListener('click' , menuHandler)}
    })

    const logout = () => {
        props.logoutAC()
        localStorage.clear()
        history.push('/login')
    }

    return (
            <header className='header'>
            <nav className='header__navigation'>
                <ul className='header__items'>
                    {
                        !props.queryParams.widthForTransformHeader530 ? getHeaderElements(getLengthMenuElements()) : null
                    }
                    {
                            <div className='header__menu-block' >
                                {
                                    props.authStatus ? <button onClick={logout} className='header__button'>logout</button> : <NavLink className='header__button' to='/login'>login</NavLink>
                                }
                                <NavLink to='/settings' className='header__button'>Настройки</NavLink>
                                <NavLink to='/registration' className='header__button'>Регистрация</NavLink>
                                {
                                    !props.queryParams.widthForTransformHeader530 ? getMenuElements(getLengthMenuElements()) : setAllLinksInMenu()
                                }
                            </div>
                    }
                    <Menu queryParams={props.queryParams}>
                        
                    </Menu>
                </ul>
            </nav>



        </header>
        
    )
})
// queryParams={props.queryParams}
let mapStateToProps = (state:any) => {
    return {
        navigationItem: state.headerReducer.navItems,
        menu: state.headerReducer.menu,
        authStatus: state.appReducer.authStatus,
    }

}

export default compose(
    connect(mapStateToProps, {
        getNavigationItemAC,
        logoutAC,
    })
)(Header)
