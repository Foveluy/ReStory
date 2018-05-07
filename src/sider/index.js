import React from 'react'
import { Menu } from 'antd'
import { RoutingController } from '../controller/state'
import { Listener } from '../react-rectx'

import './index.less'

const MenuLink = ({ children, className = '' }) => {
  return (
    <a className={`rs-link ${className}`} href={`#${children}`}>
      {children}
    </a>
  )
}

@Listener({ r: RoutingController })
export default class S extends React.Component {
  render() {
    const { r, level } = this.props
    const { n, currentSiderHead } = r.state
    const open = n.map(h => h[0])
    const location = this.props.location.pathname.substring(1);
    // console.log(this.props.location.pathname.substring(1),window.component)

    if (open.length === 0) {
      return null
    }

    return (
      <Menu title={currentSiderHead} mode="inline" openKeys={open} inlineCollapsed={true}>
        {n.map((h, index) => {
          const h1 = h[0]
          const h2 = h[1] //array

          if (h2 === 'none' || level === 1) {
            // `h2 === none` means under the h1, there is no any h2
            return (
              <Menu.Item key={index}>
                <MenuLink>{h1}</MenuLink>
              </Menu.Item>
            )
          }
          if (h1 === 'no-h1') {
            return h2.map(key => {
              if (key)
                return (
                  <Menu.Item key={key}>
                    <MenuLink className="rs-item">{key}</MenuLink>
                  </Menu.Item>
                )
              return null
            })
          }
          return (
            <Menu.SubMenu key={h1} title={<MenuLink>{h1}</MenuLink>}>
              {h2.map(key => {
                if (key)
                  return (
                    <Menu.Item key={key}>
                      <MenuLink className="rs-item">{key}</MenuLink>
                    </Menu.Item>
                  )
                return null
              })}
            </Menu.SubMenu>
          )
        })}
      </Menu>
    )
  }
}
