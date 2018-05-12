import React from 'react'

const Block = ({ children, t, title }) => {
  const p = '.1rem 1.5rem'
  const type = {
    tip: { backgroundColor: '#f3f5f7', padding: p, borderLeft: '.5rem solid #42b983', color: '#2c3e50' },
    warning: {
      backgroundColor: 'rgba(255,229,100,.3)',
      padding: p,
      borderLeft: '.5rem solid #e7c000',
      color: '#b29400'
    },
    danger: { backgroundColor: '#ffe6e6', padding: p, borderLeft: '.5rem solid #c00', color: '#900' }
  }

  return (
    <div className="react-story-block" style={{ ...type[t], marginTop: 12, padding: '24px' }}>
      <h3 style={{ fontSize: 17 }}>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

export const Tip = ({ children, title = 'TIP' }) => {
  return (
    <Block t="tip" title={title}>
      {children}
    </Block>
  )
}

export const Warning = ({ children, title = 'WARNING' }) => {
  return (
    <Block t="warning" title={title}>
      {children}
    </Block>
  )
}

export const Danger = ({ children, title = 'DANGER' }) => {
  return (
    <Block t="danger" title={title}>
      {children}
    </Block>
  )
}
