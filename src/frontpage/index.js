import React from 'react'
import './index.less'
import { Link } from 'react-router-dom'

const Bref = ({ title, content }) => {
  return (
    <div className="bref-block">
      <h3 style={{ color: '#6d6d6d' }}>{title}</h3>
      <p style={{ lineHeight: 1.7, color: 'black', fontSize: 17 }}>{content}</p>
    </div>
  )
}

export default () => {
  return (
    <div className="big-title">
      <div className="get-start-block">
        <h1 className="story-logo">ReactStory</h1>
        <p className="story-bref">A static site generator with MDX for React documentation</p>
        <Link to="/README">
          <span className="story-get-start">Get Started </span>
        </Link>
      </div>
      <div className="front-page-block">
        <Bref
          title={'Declarative'}
          content=" React makes it painless to create interactive UIs. Design simple views for each state in your application,
            and React will efficiently update and render just the right components when your data changes. Declarative
            views make your code more predictable and easier to debug."
        />
        <Bref
          title={'Component-Based'}
          content="Build encapsulated components that manage their own state, then compose them to make complex UIs. Since
            component logic is written in JavaScript instead of templates, you can easily pass rich data through your
            app and keep state out of the DOM."
        />
        <Bref
          title={'MDX powered'}
          content="We don’t make assumptions about the rest of your technology stack, so you can develop new features in React
          without rewriting existing code. React can also render on the server using Node and power mobile apps using
          React Native."
        />
      </div>
    </div>
  )
}
