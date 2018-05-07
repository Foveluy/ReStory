import React from 'react'
import { Menu } from 'antd'
import { RoutingController } from '../controller/state'
import { Listener } from '../react-rectx'

import './index.less'

const MenuLink = ({ children, className = '' }) => {
  return (
    <a className={`rs-link`} href={`#${children}`}>
      {children}
    </a>
  )
}

export default class S extends React.Component {
  shouldComponentUpdate(next) {
    return true
  }

  renderMenue = header => {
    return (
      <Menu mode="inline">
        {Object.keys(header).map(h => {
          if (h !== 'no-h1') {
            if (header[h].length === 0)
              return (
                <Menu.Item key={h}>
                  <MenuLink>{h}</MenuLink>
                </Menu.Item>
              )

            return (
              <Menu.SubMenu title={h} key={h}>
                {header[h].map((child, index) => (
                  <Menu.Item key={child}>
                    <MenuLink>{child}</MenuLink>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            )
          }

          const map = header[h].map((i, index) => (
            <Menu.Item key={index}>
              <MenuLink>{i}</MenuLink>
            </Menu.Item>
          ))
          return map
        })}
      </Menu>
    )
  }

  render() {
    const path = this.props.location.pathname.substring(1)

    const c = window.Config.navi.find(i => i.route === path)

    console.log('--', c)
    //判断是否是dir
    //是dir的话sider渲染以md名字开头的dir
    //

    if (c.type === 'dir') {
      return null
    }

    if (path === 'README') {
      console.log(window.README)
      return this.renderMenue(window.README.header)
    }
    return this.renderMenue(c.header)
  }
}
