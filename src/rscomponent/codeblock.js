import React from 'react'
import './codeblock.less'
import prism from 'prismjs'
import languages from 'prism-languages'

export const CodeBlock = ({ children, className }) => {
  let i = ''
  className &&
    className.forEach((n, index) => {
      i += n
    })

  const lng = languages[i.replace('language-', '')]
  let styled = ''
  if (lng) {
    styled = prism.highlight(children, lng)
  } else {
    styled = prism.highlight(children)
  }

  return <code className={i} dangerouslySetInnerHTML={{ __html: styled }} />
}
