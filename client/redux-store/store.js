import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const appInitialState = {

}

const reducer = combineReducers(require('./reducers'))

export function initializeStore (initialState = appInitialState) {

    const store = createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = combineReducers(require('./reducers'))
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
