import React, {useCallback, useMemo, useContext } from 'react'
import './header.scss'

import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form'

import type {RootState} from '../../redux/store'
import { mediaQueryContext } from '../app/app'
import { logoutThunk } from '../../redux/loginReducer';
import { setAuthStatusAC, IqueryParams } from '../../redux/appReducer';
import { InavigationItems } from '../../redux/headerReducer/headerInterface'


type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean
}
interface testObj {
    [key: string]: boolean
}
interface IProps {
    navigationItems: InavigationItems[]
    authStatus: boolean 
    logoutThunk (login: string) : void
    setAuthStatusAC (status: boolean) : { type: string }
}

const Header: React.FC<IProps> = React.memo((props) => {

    const context = useContext(mediaQueryContext)
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
    const getLengthMenuElements = useMemo(() => {
        return () => {
            console.log({render: props})
            let values = 0
            Object.values(context).forEach(value => {
                if (value) values++
            })
            return values
        }
    }, [context])

    const getMenuElements = useCallback(
        (amountElements: number) => {
            console.log('menu-elements')
            return createNavigationElements(amountElements, menuLinksClass)
        }
    , [getLengthMenuElements]) 

    const getHeaderElements = (amountElements:number) => {
        console.log('header-elements')
        return createNavigationElements(amountElements, headerLinksClass)
    }
    const setAllLinksInMenu = () => {
        return props.navigationItems.map((item:any) => <NavLink to={item.link} className='menu-container__button' key={item.name}>{item.name}</NavLink>)
    }
    
    const logout = (): void => {
        props.logoutThunk(localStorage.getItem('login'))
        props.setAuthStatusAC(false)
        history.push('/login')
    }
    return (
        <mediaQueryContext.Consumer>
            {
                (mediaQuery: testObj) => (
                    <header className='header'>
                        <nav className='header__navigation'>
                            <ul className='header__items'>
                                {
                                    !mediaQuery.widthForTransformHeader530 ? getHeaderElements(getLengthMenuElements()) : null
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
                                            !mediaQuery.widthForTransformHeader530 ? getMenuElements(getLengthMenuElements()) : setAllLinksInMenu()
                                        }
                                    </div>
                                }

                            </ul>
                        </nav>
                    </header>
                )
            }

        </mediaQueryContext.Consumer>
    )
})
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
