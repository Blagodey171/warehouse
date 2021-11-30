import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './header.scss'

import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form'

import type {RootState} from '../../redux/store'

import { logoutThunk } from '../../redux/loginReducer';
import { setAuthStatusAC } from '../../redux/appReducer';
import { InavigationItems } from '../../redux/headerReducer/headerInterface'

interface ItransformQueryStateType {
    widthForTransformHeader330: boolean
    widthForTransformHeader530: boolean
    widthForTransformHeader580: boolean
    widthForTransformHeader700: boolean
    widthForTransformHeader900: boolean
}
interface IProps {
    queryParams: ItransformQueryStateType
    navigationItems: InavigationItems[]
    authStatus: boolean
    logoutThunk (login: string) : void
    setAuthStatusAC (status: boolean) : { type: string }
}

const Header: React.FC<IProps> = (props) => {
    const history = useHistory()
    const { formState: { errors }, handleSubmit } = useForm()
    const menuLinksClass:string = 'menu-container__button'
    const headerLinksClass:string = 'header__item'
    
    const createNavigationElements = (amountElements: number, linkClass: string) => {
        let links = [...props.navigationItems]
        switch (linkClass) {
            case menuLinksClass: {
                const deleteLinks = links.splice(-amountElements, amountElements) // splice возвращает массив удаленных элементов
                return deleteLinks.map(item => <NavLink to={item.link} className='menu-container__button' key={item.name}>{item.name}</NavLink>)
            }
            case headerLinksClass: {
                links.splice(-amountElements, amountElements) // splice удаляет элементы из массива(просто изменяет массив)
                return links.map(item => <NavLink to={item.link} className={`${linkClass}`} key={item.name}>{item.name}</NavLink>)
            }
        }
    }
    const getMenuElements = (amountElements:number) => {
        return createNavigationElements(amountElements, menuLinksClass)
    }
    const getHeaderElements = (amountElements:number) => {
        return createNavigationElements(amountElements, headerLinksClass)
    }
    const setAllLinksInMenu = () => {
        return props.navigationItems.map((item:any) => <NavLink to={item.link} className='menu-container__button' key={item.name}>{item.name}</NavLink>)
    }
    const getLengthMenuElements = (valueQuery = 0) => {
        let values = valueQuery;
        Object.values(props.queryParams).forEach(value => {
            if (value) values++
        })
        return values
    }
    
    const logout = (): void => {
        props.logoutThunk(localStorage.getItem('login'))
        props.setAuthStatusAC(false)
        history.push('/login')
    }

    return (
            <header className='header'>
            <nav className='header__navigation'>
                <ul className='header__items'>
                    {
                        !props.queryParams.widthForTransformHeader530 ? getHeaderElements(getLengthMenuElements()) : null
                    }
                    <div className='header__menu-container' >
                        <span className='header__menu-name'>Меню</span>
                    </div>
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
                    
                </ul>
            </nav>



        </header>
        
    )
}
let mapStateToProps = function (state: RootState) {
    return {
        navigationItems: state.headerReducer.navItems,
        authStatus: state.appReducer.authStatus,
    }

}

export default compose(
    connect(mapStateToProps, {
        logoutThunk,
        setAuthStatusAC
    })
)(Header)
