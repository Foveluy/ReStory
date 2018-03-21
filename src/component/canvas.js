import React from 'react'

/**!
 ** @author: zhangxinxu(.com) 2017-12-09
 ** @description: http://www.zhangxinxu.com/wordpress/?p=6594
 ** @licence: MIT licence
 */

class Ball {
    constructor(width, height) {
        this.x = width
        this.y = height
        this.interval = 17
        this.distanceX = 0
        this.distanceY = 0
    }

    setDes = (x, y) => {
        this.desX = x
        this.desY = y

        this.distanceX = this.desX - this.x
        this.distanceY = this.desY - this.y
    }

    next = () => {
        this.x = this.distanceX / 17 + this.x
        this.y = this.distanceY / 17 + this.y
    }

    draw = context => {
        context.beginPath()
        context.fillStyle = `#${this.x}6${this.y}`
        context.arc(this.x, this.y, 5, 0, Math.PI * 2)
        context.closePath()
        context.fill()
    }
}

export class Canvas extends React.Component {
    componentDidMount() {
        this.zi = ['s','c','d','x','y']
        this.drawCanvas()
    }

    drawCanvas = () => {
        const context = this.canvas.getContext('2d')
        const width = 300
        const height = 300

        context.clearRect(0, 0, width, height)
        context.fillStyle = 'black'
        context.textBaseline = 'middle'
        context.textAlign = 'center'
        context.font = 'bold 250px arial'
        context.fillText(this.zi.shift(), width / 2, height / 2)
        const imgData = context.getImageData(0, 0, width, height).data

        console.log(this.zi)
        var gap = 13
        var pos = []
        var x = 0,
            y = 0,
            index = 0
        for (var i = 0; i < imgData.length; i += 4 * gap) {
            if (imgData[i + 3] == 255) {
                // 塞入此时的坐标
                pos.push({
                    x: x,
                    y: y
                })
            }
            index = Math.floor(i / 4)
            x = index % width
            y = Math.floor(index / width)
            if (x >= width - gap) {
                i += gap * 4 * width
            }
        }

        //清除
        context.clearRect(0, 0, width, height)

        let store = []


        pos.forEach(({ x, y }) => {
            const b = new Ball(width / 2, height / 2)
            b.setDes(x, y)
            store.push(b)
        })

        const draw = () => {
            store.forEach(ball => {
                ball.next()
                ball.draw(context)
            })
        }

        var index = 0
        const render = () => {
            index++
            if (index > 17) return
            context.clearRect(0, 0, width, height)

            draw()

            requestAnimationFrame(render)
        }

        render()
    }

    handleChange = () => {
        this.drawCanvas()
    }

    render() {
        return (
            <canvas
                onClick={this.handleChange}
                id="plexus"
                ref={node => (this.canvas = node)}
                width={300}
                height={300}
                style={{ zIndex: 10 }}
            />
        )
    }
}
