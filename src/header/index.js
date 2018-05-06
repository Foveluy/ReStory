import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { Listener } from '../react-rectx'
import { RoutingController } from '../controller/state'

@Listener({ r: RoutingController })
export default class Header extends React.Component {
  handleClick = e => {
    // when we click header
    // we change our title of sider bar
    this.props.r.switchNavigation(e.value)
  }

  componentDidMount() {
    // when this component got mouted,
    // we change our title of sider bar
    const { navi } = this.props
    const current = navi.find(n => '/' + n === this.props.location.pathname)
    this.props.r.switchNavigation(current)
  }

  render() {
    const { navi } = this.props
    const current = navi.find(n => '/' + n === this.props.location.pathname)

    return (
      <React.Fragment>
        <div className="logo">ReactStory</div>
        <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{ borderBottomWidth: 0 }}>
          <Menu.Item>
            <Link to={'/'}>README</Link>
          </Menu.Item>
          {navi.map((nav, index) => {
            return (
              <Menu.Item key={nav} value={nav}>
                <Link to={nav}>{nav}</Link>
              </Menu.Item>
            )
          })}
        </Menu>
      </React.Fragment>
    )
  }
}
