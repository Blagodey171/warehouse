import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loginHoc } from '../../HOC/redirect'
import {useHistory} from 'react-router-dom'
interface Iprops {
    authStatus: string
}


const GoodsArrivals: React.FC<Iprops> = ({
    authStatus
}) => {
    const history = useHistory()
    useEffect(() => {
        if(!authStatus) {
            history.push('/login')
        }
    })
    return (
        <section>
            <div>
                <h1>wwqw</h1>
            </div>
        </section>
    )
}

const mapStateToProps = (state:any) => {
    return {
        authStatus: state.appReducer.authStatus
    }
}

export default compose(
    connect(mapStateToProps, {

    }),
)(GoodsArrivals) as React.FC 