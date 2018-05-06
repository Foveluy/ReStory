import React from 'react'
import { RSMenu } from '../rscomponent/menu'
import { RoutingController } from '../controller/state'
import { Listener } from '../react-rectx'

import './index.less'

const MenuLink = ({ children }) => {
  return (
    <a className="rs-link" href={`#${children}`}>
      {children}
    </a>
  )
}

@Listener({ r: RoutingController })
export default class S extends React.Component {
  render() {
    const { r, level } = this.props
    const { n, currentSiderHead } = r.state
    return (
      <RSMenu title={currentSiderHead}>
        {n.map((h, index) => {
          const h1 = h[0]
          const h2 = h[1] //array
          if (h2 === 'none') {
            return (
              <RSMenu.Item key={index}>
                <MenuLink>{h1}</MenuLink>
              </RSMenu.Item>
            )
          }
          return (
            <RSMenu.SubMenu onClick={this.onMenuClick} key={h1} title={<MenuLink>{h1}</MenuLink>}>
              {h2.map(key => {
                if (key)
                  return (
                    <RSMenu.Item key={key}>
                      <MenuLink>{key}</MenuLink>
                    </RSMenu.Item>
                  )
                return null
              })}
            </RSMenu.SubMenu>
          )
        })}
      </RSMenu>
    )
  }
}
