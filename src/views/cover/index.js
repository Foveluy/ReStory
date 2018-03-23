import React from 'react'
import { Canvas } from '../../component/canvas'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.css'

const coverDetail = window.$trumpDoc.coverDetail

const Gets = s => {
    return s ? s : null
}

class Cover extends React.Component {
    handleDocs = () => {
        this.props.dispatch({
            type: 'toDocs'
        })
    }

    handleGithub = () => {
        window.location.href = window.$trumpDoc.repoUrl
    }

    render() {
        return (
            <div className="cover-page">
                <div className="canvas-wrapper">
                    <Canvas />
                </div>
                <div className="content-block">
                    <h1 className="cover-title">
                        {Gets(coverDetail && coverDetail.title)}
                    </h1>
                    <h1 className="cover-sub-title">
                        {Gets(coverDetail && coverDetail.subTitle)}
                    </h1>
                    <div>
                        {coverDetail && coverDetail.list
                            ? coverDetail.list.map((i, index) => {
                                  return (
                                      <p className="cover-li" key={index}>
                                          <span role="img" aria-label="smile">
                                              {i}
                                          </span>
                                      </p>
                                  )
                              })
                            : null}
                    </div>
                </div>
                <div className="button-block">
                    <Button
                        className="button-block first"
                        type="ghost"
                        onClick={this.handleGithub}
                    >
                        Github
                    </Button>
                    <Button
                        type="ghost"
                        className="button-block"
                        onClick={this.handleDocs}
                    >
                        <Link to="home"> Docs</Link>
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect()(Cover)
