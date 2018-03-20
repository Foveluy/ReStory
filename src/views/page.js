import React from 'react'
import { connect } from 'react-redux'

const page = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />
}

const mapStateToProps = state => {
    return state.page
}

export default connect(mapStateToProps)(page)
