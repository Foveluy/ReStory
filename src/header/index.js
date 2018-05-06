import React from 'react'
import { RSDropdown } from '../rscomponent/dropdown'
import { Link } from 'react-router-dom'
import { Listener } from '../react-rectx'
import { RoutingController } from '../controller/state'

@Listener({ r: RoutingController })
export default class Header extends React.Component {
  handleClick = e => {
    console.log(e.value)
    this.props.r.switchNavigation(e.value)
  }

  render() {
    const { navi } = this.props
    return (
      <React.Fragment>
        <div className="logo">ReactStory</div>
        <RSDropdown onClick={this.handleClick} currentSelectKey="0" mode="horizontal">
          {navi.map((nav, index) => {
            return (
              <RSDropdown.Item key={index} value={nav}>
                <Link to={nav}>{nav}</Link>
              </RSDropdown.Item>
            )
          })}
        </RSDropdown>
      </React.Fragment>
    )
  }
}
