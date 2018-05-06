import React from 'react'
import { RSDropdown } from '../rscomponent/dropdown'
import { Link } from 'react-router-dom'
import { Listener } from '../react-rectx'
import { RoutingController } from '../controller/state'

@Listener({ r: RoutingController })
export default class Header extends React.Component {
  handleClick = e => {
    // when we click header
    // we change our title of sider bar
    this.props.r.switchNavigation(e.value)
  }

  componentDidMount() {
    // when this component got mouted,
    // we change our title of sider bar
    const { navi } = this.props
    const current = navi.find(n => '/' + n === this.props.location.pathname)
    this.props.r.switchNavigation(current)
  }

  render() {
    const { navi } = this.props
    const current = navi.find(n => '/' + n === this.props.location.pathname)

    return (
      <React.Fragment>
        <div className="logo">ReactStory</div>
        <RSDropdown onClick={this.handleClick} currentSelectKey={current} mode="horizontal">
          {navi.map((nav, index) => {
            return (
              <RSDropdown.Item key={nav} value={nav}>
                <Link to={nav}>{nav}</Link>
              </RSDropdown.Item>
            )
          })}
        </RSDropdown>
      </React.Fragment>
    )
  }
}
