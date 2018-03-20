import React from 'react'

export class SiderItem extends React.Component {
    onClick = () => {
        if (document.getElementById(this.props.text)) {
            // #todo 除去document使用变量代替
            const s = document.getElementById(this.props.text).offsetTop
            const a = []
            const os = s - window.scrollY
            for (let i = 0; i < 10; i++) {
                a.push(os / 10)
            }
            requestAnimationFrame(() => {
                this.scroll(a)
            })
        }
    }

    scroll = ary => {
        if (ary.length === 0) return
        window.scrollTo(0, window.scrollY + ary[0])
        ary.shift()
        requestAnimationFrame(() => {
            this.scroll(ary)
        })
    }

    render() {
        return (
            <span>
                <div onClick={this.onClick} style={{ fontSize: 12 }}>
                    {this.props.text}
                </div>
            </span>
        )
    }
}
