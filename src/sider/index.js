import React from 'react'
import { RSMenu } from '../rscomponent/menu'
import { RoutingController } from '../controller/state'
import { Listener } from '../react-rectx'

@Listener({ r: RoutingController })
export default class S extends React.Component {
  render() {
    const { r } = this.props
    const { n } = r.state
    return (
      <RSMenu title="指南">
        <RSMenu.SubMenu title="思辨">
          {Object.keys(n).map(key => {
            return <RSMenu.Item key={key}>{key}</RSMenu.Item>
          })}
        </RSMenu.SubMenu>
      </RSMenu>
    )
  }
}
