import { Listen } from 'rectx'
import React from 'react'

export const Listener = controller => {
  const copy = { ...controller }
  let controllers = []
  Object.keys(controller).forEach((key, idx) => {
    controllers.push(copy[key])
    copy[key] = idx + ''
  })

  return Component => {
    return class wrapper extends React.Component {
      render() {
        return (
          <Listen to={controllers} didMount={Component.prototype.didMount}>
            {(...args) => {
              let mapping = {}
              Object.keys(controller).forEach((key, idx) => {
                const k = copy[key]
                mapping[key] = args[k]
              })
              return <Component {...mapping} {...this.props} />
            }}
          </Listen>
        )
      }
    }
  }
}
