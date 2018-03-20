import React from 'react'
import { Menu } from 'antd'
import MdConvertor from '../utils/utils'
import { SiderItem } from '../component/sider-item'
import tst from '../test.md'
import { connect } from 'react-redux'

const SubMenu = Menu.SubMenu

class MenuContainer extends React.Component {
    componentWillMount() {
        this.props.dispatch({ type: 'fetchMarkdown' })
    }

    renderHeader = () => {
        const { html, headers } = this.props
        return headers.map((item, index) => {
            return (
                <Menu.Item key={`${index}`}>
                    <SiderItem text={item.hText} />
                </Menu.Item>
            )
        })
    }

    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                <SubMenu key="sub1" title={<span>test</span>}>
                    {this.renderHeader()}
                </SubMenu>
            </Menu>
        )
    }
}

const mapStateToProps = state => {
    return state.page
}

export default connect(mapStateToProps)(MenuContainer)
