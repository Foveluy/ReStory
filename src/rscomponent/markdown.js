import React from 'react'
import { CodeBlock } from './codeblock'
import './markdown.less'

const ListStyle = { marginTop: 30, fontSize: 16, lineHeight: 1.7, maxWidth: '42em', fontWeight: '700' }

const Hash = ({ url }) => (
  <a href={`#${url}`} style={{ marginLeft: '-.87em', float: 'left', fontSize: '.85em', marginTop: '.1em' }}>
    #
  </a>
)

export default PageStatistic => {
  let currentH1 = ''
  let h1Idx = 0
  let h2Idx = 0

  return {
    h1: ({ children }) => {
      currentH1 = children
      if (!PageStatistic[children]) {
        PageStatistic[children] = { $rsIndex: h1Idx }
      }
      h2Idx = 0
      h1Idx++
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
      PageStatistic[currentH1][children] = h2Idx
      h2Idx++
      return (
        <h2
          id={`${children}`}
          style={{ borderBottom: '1px solid #eaecef', paddingTop: 58, marginTop: '-3.1rem', fontSize: '1.65rem' }}
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
    inlineCode: ({ children }) => {
      return (
        <code
          style={{ background: 'rgba(187,239,253,0.3)', color: '#476582', fontSize: '.85em', padding: '.25rem .5rem' }}
        >
          {children}
        </code>
      )
    }
  }
}
