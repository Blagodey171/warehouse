import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'


export const queryHOC = (Component: any) => {
    // interface Query {
    //     widthForTransformHeader330: boolean
    //     widthForTransformHeader530: boolean
    //     widthForTransformHeader700: boolean
    //     widthForTransformHeader900: boolean
    // }
    
    // const mediaQueryParam: Query = {
    //     widthForTransformHeader330: useMediaQuery("(max-width: 330px)"),
    //     widthForTransformHeader530: useMediaQuery("(max-width: 530px)"),
    //     widthForTransformHeader700: useMediaQuery("(max-width: 700px)"),
    //     widthForTransformHeader900: useMediaQuery("(max-width: 900px)"),
    
    // }
    // const withAuthRedirect = () => {
    //     return <Component/>
    // }
    
    return React.createElement(Component)
}