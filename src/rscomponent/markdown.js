import React from 'react'
import { CodeBlock } from './codeblock'
const ListStyle = { marginTop: 30, fontSize: 16, lineHeight: 1.7, maxWidth: '42em', fontWeight: '700' }

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
          style={{ color: 'rgb(40, 44, 52)', lineHeight: '65px', fontWeight: '700', fontSize: 45 }}
        >
          {children}
        </h1>
      )
    },
    h2: ({ children }) => {
      PageStatistic[currentH1][children] = h2Idx
      h2Idx++
      return <h2 style={{ borderBottom: '1px solid #eaecef', marginTop: 45, fontSize: '1.65rem' }}>{children}</h2>
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
