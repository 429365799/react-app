import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Home extends Component {

    static async getInitialProps(context) {

        return { a: 13 }
    }

    static propTypes = {
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div className="post-container">
                <img src={ require('./post/image.jpg') } />
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

export default connect(mapStateToProps, mapActionToProps)(Home)