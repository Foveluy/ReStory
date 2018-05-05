import React from 'react'
import { Route } from 'react-router-dom'
import markdown from '../rscomponent/markdown'
import { RoutingController } from '../controller/state'
import { Listener } from '../react-rectx'

@Listener({ r: RoutingController })
class MDXLoader extends React.Component {
  sider = {}

  componentDidMount() {
    const { r } = this.props
    r.load(this.sider)
  }

  render() {
    const { MDXComponent } = this.props
    return <MDXComponent components={markdown(this.sider)} />
  }
}

export default ({ component }) => {
  return (
    <div
      className="rs-body-markdown-body"
      style={{
        padding: 24,
        background: '#fff',
        width: '100%',
        maxWidth: 740
      }}
    >
      {Object.keys(component).map((key, idx) => {
        return <Route key={key} path={'/' + key} component={() => <MDXLoader MDXComponent={component[key]} />} />
      })}
    </div>
  )
}
