import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './index.css'

class App extends React.Component {
    render() {
        return (
            <div >
                <input type="checkbox" id="share" />
                <div className="target">
                    <label className="share" htmlFor="share">
                        分享
                    </label>
                    <span className="icon-share-weibo">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC9UlEQVRYR92WgVEUUQyG/1SgVCBUoFQgVqBWIFSgVuBZgViBUAFQgVCBRwVCBUIFcb6dZCf77h17zJzDjJnZudvdty9//vxJnumJzZ7Yv/4/AO7+XNIHSfxiN5KuzWzZY3vrDLj7J0nfOs4AsjCz0/ruXwDYlXRcGMDf6+L0xMyO8n7rAHo0uzugDiV9ifcjiI0BxCYfJb2K61LS115uGx1A/YWZ3bk7IH4EiDdmdjkLIBzz0UEvr2a21z7v6OBOEg6X7n4SIl2a2f6DANz9XSBORfcY3m9ZCNALSVAPY88kAQKw7PU7NtpbC8DdERKUz9kO9OYi6G/voxQBcWRmJ+5OWl4MrKwRTdI05/xC0s9IDymqTJ2HQ3LP/7ehmYW7ox8qYxXAIyKfA8f7z2Z2XBzmfZ+BRqWbOJhbQ5UQMepHT/xWDeyMKQjh/GpoTAf3kqAR5NCXliUJ/eS0tZ5AAUBbvjSzwwog81I3uYr2WZ12o46KQbgVCJVAuaGVrg0AOtQTMX2bDUcLlnBwa2awsWKlzus71r7vNa0EUKPH+UFdHNHRRqE8rTtcIqBUfQUx9IFaory0iCobA88GpeaXGwhzMlwCAA2o7pnbTfZOAAiIWsbuzWys5Q64YQ3pkcTYzXwT2SQlpdlUFoaqqA9goM7vKzMbe767szgnGHOcyIYOJumspGQlMndH6S8bkcwy0ALIXCIg/iPYXn7btMHin45GV5hKESIQevVNnW4l/8PoDAC9Nj3ZuGEucZxS9y2oBFDTMAyMcEYkOPbIO1UwyWH29yJa1tDQqqGb3bYCBhGWDzOycXYHCDakKuqxahRjUzHoB23UobRS1hMR1pumiRDp90Tt7gDJiYfiz8s7xIlYW4rppIfrmtaEgcIETmADtcMGouPiaD2UWhy5UDigGDLtaek2OumQyofsoQNJTi+c9AZNu+916AVmZmdHfjx7JoyIoZgLy2ip8zwJMXDGU9Fc1Gs18JgPt7V2Iwa25ay3z5MD+AvEbGYRoqDXHQAAAABJRU5ErkJggg==" />
                    </span>
                    <span className="icon-share-wechat">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB+0lEQVRYR8WX4VECMRCF36tArUCpQKxAqECpQK1ArEA7UCoQOsAKhArEDrADrWCdd5PcAHe5XCCnO8Mvstkvm82+PSLBzOwYwBWAawBnAPrOfQVAvwXJWcKWYNvFZqagrwAE0WRrAA8k5232bgVgZlMAN2023FgzJjmJ+UQBzOwJwGNso8D/ysRLk28jgJkNALzvGVxu3wAuSOpaai0GsABweQCAXGckb5MBzEwV/nFgcO9+QlLZqFgwA2Y2BvCcCeCOpAo5CSBH+n3ACUkd6N8AliRV0EkAlin92mZNstcaIHMBNhZibRGamZrHfcYMaKvaphQCyFmA/hxvJKUnW1YBcOlX94uJTmqC1A1HJKWapW0BdBjcB6y05l0A0Z2nHi1xvWaGofcpAcxM/Vp6/xdWdsZNAN3R6V9Ed5NTkYUCoKN3HztLTzLtAQ4ZOmKBQv8XfcEDdPHuY2BFX6gD+OqwFn4AHDmyQqB2ATRSKxtdvYaRG+k14G5lQNNP3w8NZtbFiygl2Q076gerkBbkHMeUcaV+sNuGy2dYVy2ZR7IhSV1txUIZyN0VpQF6dpW5MKSGuabh3RMXzSeohnt0xaWT7bYCpo+UsBx7spbfgp8qLAeg+43pSO1k3PRdoM1VC3oR/oRqUjrBfPM+3We71spH6z2MILV+GirCX0O+wiEpSANxAAAAAElFTkSuQmCC" />
                    </span>
                    <span className="icon-share-qq">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB+0lEQVRYR8WX4VECMRCF36tArUCpQKxAqECpQK1ArEA7UCoQOsAKhArEDrADrWCdd5PcAHe5XCCnO8Mvstkvm82+PSLBzOwYwBWAawBnAPrOfQVAvwXJWcKWYNvFZqagrwAE0WRrAA8k5232bgVgZlMAN2023FgzJjmJ+UQBzOwJwGNso8D/ysRLk28jgJkNALzvGVxu3wAuSOpaai0GsABweQCAXGckb5MBzEwV/nFgcO9+QlLZqFgwA2Y2BvCcCeCOpAo5CSBH+n3ACUkd6N8AliRV0EkAlin92mZNstcaIHMBNhZibRGamZrHfcYMaKvaphQCyFmA/hxvJKUnW1YBcOlX94uJTmqC1A1HJKWapW0BdBjcB6y05l0A0Z2nHi1xvWaGofcpAcxM/Vp6/xdWdsZNAN3R6V9Ed5NTkYUCoKN3HztLTzLtAQ4ZOmKBQv8XfcEDdPHuY2BFX6gD+OqwFn4AHDmyQqB2ATRSKxtdvYaRG+k14G5lQNNP3w8NZtbFiygl2Q076gerkBbkHMeUcaV+sNuGy2dYVy2ZR7IhSV1txUIZyN0VpQF6dpW5MKSGuabh3RMXzSeohnt0xaWT7bYCpo+UsBx7spbfgp8qLAeg+43pSO1k3PRdoM1VC3oR/oRqUjrBfPM+3We71spH6z2MILV+GirCX0O+wiEpSANxAAAAAElFTkSuQmCC" />
                    </span>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
