import React from 'react'
import { RSDropdown } from '../rscomponent/dropdown'
import { Link } from 'react-router-dom'

export default ({ navi }) => {
    
  return (
    <React.Fragment>
      <div className="logo">ReactStory</div>
      <RSDropdown onClick={this.handleClick} currentSelectKey="0" mode="horizontal">
        {navi.map((nav, index) => {
          return (
            <RSDropdown.Item key={index}>
              <Link to={nav}>{nav}</Link>
            </RSDropdown.Item>
          )
        })}
      </RSDropdown>
    </React.Fragment>
  )
}
