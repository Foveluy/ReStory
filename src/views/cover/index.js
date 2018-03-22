import React from 'react'
import { Canvas } from '../../component/canvas'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.css'

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
                    <h1 className="cover-title">TrumpDoc</h1>
                    <h1 className="cover-sub-title">
                        Make your documentation great again
                    </h1>
                    <div>
                        <p className="cover-li">
                            <span role="img" aria-label="smile">😄</span> Build your documentation
                            site without tear
                        </p>
                        <p className="cover-li">
                            <span role="img" aria-label="good">👍</span> Simple and powerful, pure
                            React application
                        </p>
                        <p className="cover-li">
                            <span role="img" aria-label="devil">😈</span> Manage your documentation
                            like a president
                        </p>
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
