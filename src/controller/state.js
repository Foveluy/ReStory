import { Controller } from 'rectx'

export class RoutingController extends Controller {
  state = {
    n: []
  }

  load(header) {

    // what we do here is to conver {} -> []
    // to make sure every title in order
    // we have to sort them by order-number
    const keys = Object.keys(header)
    let parse = new Array(keys.length)
    keys.forEach(key => {
      const i = header[key].$rsIndex

      const keysOfh2 = Object.keys(header[key])
      let ary = keysOfh2.length > 1 ? new Array(keysOfh2.length) : 'none'

      parse[i] = [key, ary]
      keysOfh2.forEach(k2 => {
        if (k2 !== '$rsIndex') {
          const idx2 = header[key][k2]
          parse[i][1][idx2] = k2
        }
      })
    })

    this.setState({
      n: parse
    })
  }
}
