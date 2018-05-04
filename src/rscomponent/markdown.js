import React from 'react'
import { CodeBlock } from './codeblock'

export default {
  h1: ({ children }) => {
    return (
      <h1 id={`${children}`} style={{ color: 'rgb(40, 44, 52)', lineHeight: '65px', fontWeight: '700', fontSize: 45 }}>
        {children}
      </h1>
    )
  },
  h2: ({ children }) => {
    return <h2 style={{ borderBottom: '1px solid #eaecef', marginTop: 45 }}>{children}</h2>
  },
  p: ({ children }) => {
    return (
      <p style={{ marginTop: 30, fontSize: 15, lineHeight: 1.7, maxWidth: '42em', fontWeight: '700' }}>{children}</p>
    )
  },
  code: CodeBlock,
  inlineCode: ({ children }) => {
    return <code>{children}</code>
  }
}
