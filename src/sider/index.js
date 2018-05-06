import React from 'react'
import { RSMenu } from '../rscomponent/menu'
import { RoutingController } from '../controller/state'
import { Listener } from '../react-rectx'

@Listener({ r: RoutingController })
export default class S extends React.Component {
  render() {
    const { r, level } = this.props
    const { n } = r.state
    return (
      <RSMenu title="指南">
        {n.map((h, index) => {
          const h1 = h[0]
          const h2 = h[1] //array
          if (h2 === 'none') {
            return <RSMenu.Item key={index}>{h1}</RSMenu.Item>
          }
          return (
            <RSMenu.SubMenu key={h1} title={h1}>
              {h2.map(key => {
                if (key) return <RSMenu.Item key={key}>{key}</RSMenu.Item>
                return null
              })}
            </RSMenu.SubMenu>
          )
        })}
      </RSMenu>
    )
  }
}
