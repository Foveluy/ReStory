import React from 'react'
import { Spin, Icon } from 'antd'
import { connect } from 'react-redux'

const win = window
const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />

const GlobalSpin = ({ isLoading }) =>
    isLoading ? (
        <div
            style={{
                position: 'fixed',
                left: window.innerWidth / 2,
                top: window.innerHeight / 2
            }}
        >
            <Spin indicator={antIcon} />
        </div>
    ) : null

const mapState = state => {
    return state.page
}

export default connect(mapState)(GlobalSpin)
