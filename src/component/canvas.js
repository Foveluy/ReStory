import React from 'react'

/**!
 ** @author: zhangxinxu(.com) 2017-12-09
 ** @description: http://www.zhangxinxu.com/wordpress/?p=6594
 ** @licence: MIT licence
 */

var Tween = {
    Expo: {
        easeIn: function(t, b, c, d) {
            return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
        },
        easeOut: function(t, b, c, d) {
            return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
        }
    }
}

class Ball {
    constructor(width, height) {
        this.x = width
        this.y = height

        this.startX = width
        this.startY = height

        this.interval = 60
        this.distanceX = 0
        this.distanceY = 0
        this.r = Math.round(Math.random() * 10)
        this.opacity = 1

        //到达最大次数的时候，会一直原地抖动
        this.has_interval = 0

        this.shakeX = []
        this.shakeY = []

        this.shakingSpeed = 6

        this.isNextShake = true
    }

    sInterval = () => {
        this.interval = Math.round(Math.random() * 10) * 3
    }

    setDes = (x, y) => {
        this.sInterval()

        this.shakeX = []
        this.shakeY = []
        this.isNextShake = true

        this.startX = this.x
        this.startY = this.y

        this.has_interval = 0

        this.desX = x
        this.desY = y

        this.distanceX = this.desX - this.x
        this.distanceY = this.desY - this.y
    }

    shaking = () => {
        if (this.isNextShake) {
            const shakeFatorX =
                Math.random() * 5 * ( Math.round( (Math.random() * 10) )% 2 === 0 ? 1 : -1)

            const shakeFatorY =
                Math.random() * 5 * (Math.round( (Math.random() * 10) ) % 2 === 0 ? 1 : -1)
            for (let i = 0; i < 40; i++) {
                // console.log()

                this.shakeX.push(shakeFatorX / 10)
                this.shakeY.push(shakeFatorY / 10)
            }

            this.isNextShake = false
            this.y = this.desY
            this.x = this.desX
        } else {
            const _deltX = this.shakeX.shift()
            const _deltY = this.shakeY.shift()

            if (this.shakeX.length > 30 && this.shakeX.length <= 40) {
                this.y = this.y - _deltY
                this.x = this.x - _deltX
            }
            if (this.shakeX.length <= 30 && this.shakeX.length > 10) {
                this.y = this.y + _deltY
                this.x = this.x + _deltX
            }

            if (this.shakeX.length < 10) {
                this.y = this.y - _deltY
                this.x = this.x - _deltX
            }

            if (this.shakeX.length === 0) {
                this.isNextShake = true
            }
        }
    }

    next = () => {
        if (this.has_interval < this.interval) {
            // console.log()

            // console.log(this.startX,this.desX)

            this.y = Tween.Expo.easeOut(
                this.has_interval,
                this.startY,
                this.desY - this.startY,
                this.interval
            )

            this.x = Tween.Expo.easeOut(
                this.has_interval,
                this.startX,
                this.desX - this.startX,
                this.interval
            )
            // this.y = this.y + this.distanceY / 17
        } else {
            if (this.has_interval % this.shakingSpeed === 0) {
                this.shaking()
            }
        }

        this.has_interval = this.has_interval + 1
    }

    show = context => {
        this.opacity = 1
        this.draw(context)
    }

    clearSelf = context => {
        this.opacity = 0
        this.draw(context)
    }

    draw = context => {
        context.beginPath()
        context.fillStyle = `rgba(${this.r * 20},${this.r * 10},${this.r *
            10},${this.opacity})`
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        context.closePath()
        context.fill()
    }
}

/**
 * 获取image的data
 * @param {*} imgData
 */
const getPoints = (imgData, width) => {
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
    return pos
}

export class Canvas extends React.Component {
    componentDidMount() {
        this.store = []
        this.zi = ['Trump']

        this.ziIndex = -1
        this.firstCopy = []

        this.drawCanvas()

        setInterval(() => {
            this.handleChange()
        }, 4000)
    }

    getZi = () => {
        this.ziIndex++
        return this.zi[this.ziIndex % 5]
    }

    drawCanvas = () => {
        const context = this.canvas.getContext('2d')
        const width = 1200
        const height = 400
        const store = this.store

        context.clearRect(0, 0, width, height)
        context.fillStyle = 'black'
        context.textBaseline = 'middle'
        context.textAlign = 'center'
        context.font = 'bold 300px arial'
        context.fillText(this.getZi(), width / 2, height / 2)

        //get filled imgdata
        const imgData = context.getImageData(0, 0, width, height).data
        const pos = getPoints(imgData, width)

        //clear
        context.clearRect(0, 0, width, height)

        if (pos.length > store.length) {
            //add points
            console.log('新增')
            if (store.length > 0) {
                //how many points we need to add
                const len = pos.length - store.length
                for (let i = 0; i < len; i++) {
                    store.push(new Ball(width / 2, height / 2))
                }
                pos.forEach(({ x, y }, index) => {
                    const b = store[index]
                    b.show(context)
                    b.setDes(x, y)
                })
            } else {
                pos.forEach(({ x, y }, index) => {
                    const b = new Ball(width / 2, height / 2)
                    b.setDes(x, y)
                    store.push(b)
                    this.firstCopy.push({ x, y })
                })
            }
        } else {
            //how many points we need to remove
            const len = store.length - pos.length
            console.log('清理')
            store.forEach((ball, index) => {
                if (index >= pos.length) {
                    ball.clearSelf(context)
                } else {
                    const { x, y } = pos[index]
                    ball.show(context)
                    ball.setDes(x, y)
                }
            })
        }

        const draw = () => {
            store.forEach((ball,index) => {
                ball.next()
                ball.draw(context)
            })
        }

        var drawIndex = 0
        const render = () => {
            if (drawIndex > 18) return
            context.clearRect(0, 0, width, height)

            draw()

            // drawIndex++
            requestAnimationFrame(render)
        }

        render()
    }

    FlashCanvas = () => {
        const context = this.canvas.getContext('2d')
        const width = 1200
        const height = 1200
        const store = this.store

        //clear
        context.clearRect(0, 0, width, height)

        if (store.length > 0) {
            //how many points we need to add
            if (this.ziIndex % 2 === 0) {
                store.forEach(({ x, y }, index) => {
                    const rx = Math.random() * 400 * (index % 2 === 0 ? -1 : 1)
                    const ry = Math.random() * 200 * (index % 2 === 0 ? -1 : 1)
                    const b = store[index]
                    b.setDes(x + rx, y + ry)
                })
            } else {
                this.firstCopy.forEach(({ x, y }, index) => {
                    const b = store[index]
                    b.setDes(x, y)
                })
            }
        }
    }

    handleChange = () => {
       
        this.FlashCanvas()
        this.ziIndex++
    }

    render() {
        return (
            <canvas
                onClick={this.handleChange}
                id="plexus"
                ref={node => (this.canvas = node)}
                width={1000}
                height={400}
                style={{ zIndex: 10 }}
            />
        )
    }
}
