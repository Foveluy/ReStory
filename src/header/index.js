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
    // this.props.r.switchNavigation(e.value)
    window.scrollTo(0, 0)
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
    let current = navi.find(n => '/' + n.route === this.props.location.pathname)
    // todo nested path
    if (!current) {
      const split = this.props.location.pathname.substring(1).split('/')
      const father = split[0]
      // console.log('fater', father)
      for (let idx in navi) {
        const files = navi[idx]
        if (files.type === 'dir') {
          if (files.route === father) {
            current = files
            break
          }
        }
      }
    }

    return (
      <React.Fragment>
        <div className="logo">ReactStory</div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current ? current.route : 'readme']}
          mode="horizontal"
          style={{ borderBottomWidth: 0 }}
        >
          <Menu.Item key={'readme'}>
            <Link to={'/README'}>README</Link>
          </Menu.Item>
          {navi.map((nav, index) => {
            // if (nav.type === 'file') {

            // }
            return (
              <Menu.Item key={nav.route}>
                <Link to={'/' + nav.route}>{nav.name}</Link>
              </Menu.Item>
            )
          })}
        </Menu>
      </React.Fragment>
    )
  }
}
