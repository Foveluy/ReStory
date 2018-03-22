import React from 'react'
import { Menu } from 'antd'
import { SiderItem } from '../component/sider-item'
import { connect } from 'react-redux'
import './index.css'
const SubMenu = Menu.SubMenu

class MenuContainer extends React.Component {
    state = {
        openKeys: []
    }

    componentWillMount() {
        this.props.dispatch({ type: 'fetchDocList' })
    }

    renderHeader = (item, index) => {
        if (item.headers) {
            return item.headers.map((h, i) => {
                return (
                    <Menu.Item key={`${i}`}>
                        <SiderItem text={h.hText} />
                    </Menu.Item>
                )
            })
        }
    }
    handleSubMenuClick = openkeys => {
        const lastkey = openkeys.find(
            key => this.state.openKeys.indexOf(key) === -1
        )

        this.setState({
            openKeys: lastkey ? [lastkey] : []
        })
        if (lastkey) {
            this.props.dispatch({
                type: 'renderDocs',
                payload: lastkey
            })
        }
    }

    render() {
        return (
            <Menu
                theme="dark"
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.handleSubMenuClick}
            >
                {this.props.docList.map((listItem, index) => {
                    console.log(listItem)
                    return (
                        <SubMenu
                            key={listItem.title}
                            title={<span>{listItem.title}</span>}
                        >
                            {this.renderHeader(listItem, index)}
                        </SubMenu>
                    )
                })}
            </Menu>
        )
    }
}

const mapStateToProps = state => {
    return state.page
}

export default connect(mapStateToProps)(MenuContainer)
