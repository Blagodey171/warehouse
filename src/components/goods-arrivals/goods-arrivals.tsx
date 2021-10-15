import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loginHoc } from '../../HOC/redirect'

const GoodsArrivals: React.FC = () => {

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
        
    }
}

export default compose(
    connect(mapStateToProps, {

    }),
)(GoodsArrivals) as React.FC 