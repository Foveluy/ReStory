import React from 'react'

export class SiderHeadItem extends React.Component {
    componentDidMount() {
        this.props.Mounted()
    }

    render() {
        return this.props.children
    }
}
