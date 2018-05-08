import React from 'react'
import { Route } from 'react-router-dom'
import markdown from '../rscomponent/markdown'

class MDXLoader extends React.Component {
  render() {
    const { MDXComponent } = this.props
    return <MDXComponent components={markdown()} />
  }
}

export default ({ component, readme, location }) => {
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
      <Route exact path={'/README'} component={() => <MDXLoader MDXComponent={readme.component} />} />
      {Object.keys(component).map((key, idx) => {
        return (
          <Route
            key={key}
            path={'/' + key.replace('_', '/')}
            component={() => <MDXLoader MDXComponent={component[key]} />}
          />
        )
      })}
    </div>
  )
}
