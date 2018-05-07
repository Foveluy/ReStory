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

  shouldComponentUpdate(next) {
    return next.location.pathname !== this.props.location.pathname
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
    const current = navi.find(n => '/' + n.path === this.props.location.pathname)
    console.log(navi)
    return (
      <React.Fragment>
        <div className="logo">ReactStory</div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current ? current.path : 'readme']}
          mode="horizontal"
          style={{ borderBottomWidth: 0 }}
        >
          <Menu.Item key={'readme'}>
            <Link to={'/'}>README</Link>
          </Menu.Item>
          {navi.map((nav, index) => {
            if (nav.type === 'file') {
              return (
                <Menu.Item key={nav.name}>
                  <Link to={nav.route}>{nav.name}</Link>
                </Menu.Item>
              )
            }
          })}
        </Menu>
      </React.Fragment>
    )
  }
}
