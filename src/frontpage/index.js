import React from 'react'
import './index.less'
import { Link } from 'react-router-dom'

const Bref = ({ title, content }) => {
  return (
    <div className="bref-block">
      <h3 style={{ color: '#6d6d6d' }}>{title}</h3>
      <p style={{ lineHeight: 1.7, color: 'black', fontSize: 17, maxWidth: 400 }}>{content}</p>
    </div>
  )
}

export default () => {
  return (
    <div className="big-title">
      <div className="get-start-block">
        <h1 className="story-logo">Restory</h1>
        <p className="story-bref">A static site generator with MDX for React documentation</p>
        <Link to="/Guide/Introduction">
          <span className="story-get-start">Get Started </span>
        </Link>
      </div>
      <div className="front-page-block">
        <Bref
          title={'Declarative'}
          content="
          Almost zero configuration. You only need to create the file directory according to the conventions. 
          The Restory will automatically help you complete the rendering of the web page."
        />
        <Bref
          title={'Component-Based'}
          content="You can write any React Components you want in the markdown document, ReStory will render them directly."
        />
        <Bref
          title={'Ant-Design powered'}
          content="ReStory builds with Ant-Design. If you're familiar with Ant-Design, you using any Ant-Design Component you want."
        />
      </div>
    </div>
  )
}
