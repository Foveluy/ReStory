import React from 'react'
import { connect } from 'react-redux'

import './index.css'

const page = ({ html }) => {
    return (
        <div
            className="content-wapper"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

const mapStateToProps = state => {
    return state.page
}

export default connect(mapStateToProps)(page)
