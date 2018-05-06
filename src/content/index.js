import React from 'react'
import { Route } from 'react-router-dom'
import markdown from '../rscomponent/markdown'
import { RoutingController } from '../controller/state'
import { Listener } from '../react-rectx'
import P from './p.md'

let i;

@Listener({ r: RoutingController })
class MDXLoader extends React.Component {
  sider = {}

  componentDidMount() {
    const { r } = this.props
    r.load(this.sider)
    i = r
  }

  render() {
    const { MDXComponent } = this.props
    return <MDXComponent components={markdown(this.sider)} />
  }
}

export default ({ component, readme }) => {
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
      <Route exact path={'/'} component={() => <MDXLoader MDXComponent={P} />} />
      {Object.keys(component).map((key, idx) => {
        return <Route key={key} path={'/' + key} component={() => <MDXLoader MDXComponent={component[key]} />} />
      })}
    </div>
  )
}

if (module.hot) {
  console.log('hot')
  module.hot.accept('./p.md', function() {
    // Do something with the updated library module...
    i.load()
    
    console.log(i.setState)
  })
}
