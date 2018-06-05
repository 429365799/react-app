import App, {Container} from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'

import { initializeStore } from '../redux-store/store';

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
    // 服务端渲染总是创建新的store
    if (isServer) {
        return initializeStore(initialState)
    }
  
    // 客户端里面把store放在window上
    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
    }
    return window[__NEXT_REDUX_STORE__]
}

class MyApp extends App {

    static async getInitialProps(appContext) {
        const reduxStore = getOrCreateStore()
        const { ctx, Component } = appContext
        ctx.reduxStore = reduxStore

        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(appContext)
        }

        return {
            pageProps,
            initialReduxState: reduxStore.getState()
        }
    }

    constructor(props) {
        super(props)

        this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render () {
        const {Component, pageProps} = this.props

        return (
            <Container>
                <Provider store={this.reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default MyApp