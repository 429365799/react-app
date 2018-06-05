import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './style.scss'

class Post extends Component {
    static async getInitialProps({ query, req, res }) {

        return { a: 13 }
    }

    static propTypes = {
    }

    state = {
        log: ''
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('123');
        // console.log(this.props);
        this.ctx = this.canvas.getContext('2d')
        let ctx2 = this.canvas2.getContext('2d')
        
        this.loadVideo()
        this.drawVideo()

        setInterval(() => {
            let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
            
            ctx2.putImageData(imageData, 0, 0)
            this.setState({ 
                log: imageData.data.length
            })
        }, 500)
    }

    drawVideo() {
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

        requestAnimationFrame(this.drawVideo.bind(this))
    }

    loadVideo() {
        this.video = document.createElement('video')

        this.video.setAttribute('src', `/source-proxy?url=${encodeURIComponent('http://video.webmfiles.org/big-buck-bunny_trailer.webm')}`)
        // this.video.setAttribute('src', '/video.mp4')
        this.video.loop = true
        this.video.setAttribute('playsinline', true)
        this.video.setAttribute('webkit-playsinline', true)
        this.video.setAttribute('x5-playsinline', true)
        // this.video.addEventListener('play', this.videoPlay.bind(this))
        this.video.load()
    }

    // videoPlay() {
    //     alert(this.video.videoWidth)
    //     this.canvas.width = this.video.videoWidth
    //     this.canvas.height = this.video.videoHeight
    // }

    play() {
        this.video.play()
    }

    pause() {
        this.video.pause()
    }

    render() {
        return (
            <div className="post-container">
                <div className="btn-group">
                    <button onClick={ this.play.bind(this) }>播放</button>
                    <button onClick={ this.pause.bind(this) }>暂停</button>
                </div>
                
                <canvas ref={ dom => this.canvas = dom } className="canvas"></canvas>

                <canvas ref={ dom => this.canvas2 = dom } ></canvas>

                <div>{ this.state.log }</div>

                <div className="bg-image"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.homeData.page
    }
}

const mapActionToProps = {
}

export default connect(mapStateToProps, mapActionToProps)(Post)