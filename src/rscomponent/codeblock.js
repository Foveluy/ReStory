import React from 'react'
import './codeblock.less'
import Prism from 'prismjs'
import languages from 'prism-languages'

window.self.Prism = Prism;

export const CodeBlock = ({ children, className }) => {
  let i = ''
  className &&
    className.forEach((n, index) => {
      i += n
    })

  const lng = languages[i.replace('language-', '')]
  let styled = ''

  if (lng) {
    styled = Prism.highlight(children, lng)
  } else {
    styled = Prism.highlight(children)
  }

  return <code className={i} dangerouslySetInnerHTML={{ __html: styled }} />
}

