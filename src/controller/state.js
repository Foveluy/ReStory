import { Controller } from 'rectx'

export class RoutingController extends Controller {
  state = {
    n: {}
  }

  load(h1) {
    this.setState({
      n: h1
    })
  }
}
