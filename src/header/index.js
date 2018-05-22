import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  handleClick = e => {
    // when we click header
    // we change our title of sider bar
    // this.props.r.switchNavigation(e.value)
    window.scrollTo(0, 0)
  }

  shouldComponentUpdate(next) {
    return next.location.pathname !== this.props.location.pathname || next.collapsed !== this.props.collapsed
  }

  static defaultProps = {
    mode: 'horizontal'
  }

  render() {
    const { navi, mode, siteConfig } = this.props
    let current = navi.find(n => '/' + n.route === this.props.location.pathname)
    // todo nested path
    // what we do here is
    // if `current === undefined` it means it probably is a folder
    // so we do a feather check
    if (!current) {
      const split = this.props.location.pathname.substring(1).split('/')
      const father = split[0]
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

    const selectkey = this.props.location.pathname === '/' ? null : current ? current.route : 'readme'

    return (
      <React.Fragment>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[selectkey]}
            mode={mode}
            style={{ borderBottom: mode === 'horizontal' ? 0 : '1px solid rgb(233, 233, 233)' }}
          >
            {this.props.READMEMDX ? (
              <Menu.Item key={'readme'}>
                <Link to={'/README'}>{this.props.READMEMDX.name}</Link>
              </Menu.Item>
            ) : null}
            {navi.map((nav, index) => {
              return (
                <Menu.Item key={nav.route}>
                  <Link to={'/' + nav.route}>{nav.name}</Link>
                </Menu.Item>
              )
            })}
            {siteConfig.github === true ? (
              <Menu.Item key={'github'}>
                <a href={siteConfig.repo}>Github</a>
              </Menu.Item>
            ) : null}
          </Menu>
        </div>
      </React.Fragment>
    )
  }
}
