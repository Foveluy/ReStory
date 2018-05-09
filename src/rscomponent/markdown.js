import React from 'react'
import { CodeBlock } from './codeblock'
import './markdown.less'
import { getRidOf } from './util'

const ListStyle = { marginTop: 30, fontSize: 16, lineHeight: 1.7, maxWidth: '42em', fontWeight: '700' }

const Hash = ({ url }) => (
  <a href={`#${url}`} style={{ marginLeft: '-.87em', float: 'left', fontSize: '.85em', marginTop: '.1em' }}>
    #
  </a>
)

export default PageStatistic => {
  return {
    h1: ({ children }) => {
      return (
        <h1
          id={`${children}`}
          style={{ color: 'rgb(40, 44, 52)', lineHeight: '65px', fontWeight: '700', fontSize: 45, paddingTop: 58 }}
        >
          <Hash url={children} />
          {children}
        </h1>
      )
    },
    h2: ({ children }) => {
      return (
        <h2
          id={`${children}`}
          style={{ borderBottom: '1px solid #eaecef', paddingTop: 58, marginTop: '-1rem', fontSize: '1.65rem' }}
        >
          <Hash url={children} />
          {children}
        </h2>
      )
    },
    h3: ({ children }) => {
      return (
        <h3 id={`${children}`} style={{ paddingTop: '4.6rem', marginTop: '-3.1rem' }}>
          <Hash url={children} />
          {children}
        </h3>
      )
    },
    p: ({ children }) => {
      return <p style={ListStyle}>{children}</p>
    },
    code: CodeBlock,
    ul: ({ children }) => {
      return <ul style={ListStyle}>{children}</ul>
    },
    ol: ({ children }) => {
      return <ol style={ListStyle}>{children}</ol>
    },
    pre: ({ children }) => {
      const className = children.props.props.className
      let i = ''
      className &&
        className.forEach((n, index) => {
          i += n
        })

      const langnumber = getRidOf(i)
      const obj = langnumber ? { className: langnumber.string, 'data-line': langnumber.number } : { className: i }
      return (
        <div className="rs-code-block">
          <div className="langs">
            {langnumber ? langnumber.string.replace('language-', '') : i.replace('language-', '')}
          </div>
          <pre {...obj} style={{ background: 'rgba(0,0,0,0)' }}>
            {children}
          </pre>
        </div>
      )
    },
    inlineCode: ({ children }) => {
      return (
        <code
          style={{ background: 'rgba(187,239,253,0.3)', color: '#476582', fontSize: '.85em', padding: '.25rem .5rem' }}
        >
          {children}
        </code>
      )
    },
    yaml: ({ children }) => {
      console.log(children)
    }
  }
}
