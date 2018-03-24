import React from 'react'
import { connect } from 'react-redux'
import './index.css'

var fontColor
if (window.$trumpDoc.skin) {
    fontColor = window.$trumpDoc.skin === 'dark' ? 'white' : '#000c17'
} else {
    fontColor = '#000c17'
}

class PageContainer extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.html !== nextProps.html
    }
    componentDidMount() {
        console.log('渲染')
    }

    render() {
        const { html } = this.props
        return (
            <div className="page-paper-wrapper">
                <div
                    className="content-wapper"
                    dangerouslySetInnerHTML={{ __html: html }}
                    style={{ color: fontColor }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.page
}

export default connect(mapStateToProps)(PageContainer)
