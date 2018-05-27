import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

export default class Post extends Component {
    static propTypes = {
    }

    componentDidMount() {
        console.log(this.props);
    }
    

    render() {
        return (
            <div className="post-container">
                post page 123dd

                <img src="/static/image.jpg" />
            </div>
        )
    }
}
