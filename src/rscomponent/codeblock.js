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
      <div className="lang">{i.replace('language-', '')}</div>
      <code className={i}>{children}</code>
    </div>
  )
}
