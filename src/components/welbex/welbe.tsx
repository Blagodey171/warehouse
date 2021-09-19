import React from 'react'
import { compose } from 'redux'
import {connect} from 'react-redux'


import './welbe.scss'

interface Ielement {
    date: string,
    name: string,
    pcs: string | number,
    distance: string | number
}

interface Iprops {
    data: Ielement[]
}
const Welbe: React.FC<Iprops> = ({data}) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Расстояние</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

const mapStateToProps = (state:any) => {
    return {
        data: state.welbe.data
    }
}

export default compose(
    connect(mapStateToProps, {
        
    }),
)(Welbe)