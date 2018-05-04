import React from 'react'
import './codeblock.less'

export const CodeBlock = ({ children, className }) => {
  let i = ''
  className &&
    className.forEach((n, index) => {
      i += n
    })

  return (
    <div className="rs-code-block">
      <div
        style={{
          position: 'absolute',
          right: 5,
          top: 5,
          fontSize: '0.15em',
          color: 'hsla(0,0%,100%,.4)',
          userSelect: 'none'
        }}
      >
        {i.replace('language-', '')}
      </div>
      <code className={i}>{children}</code>
    </div>
  )
}
