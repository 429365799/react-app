
export const initState = {
    page: ''
}

export function homeData (state = initState, action) {
    switch (action.type) {
        case 'home':
            return { ...state, page: 'home' }
    
        default:
            return state
    }
}


export function aboutData (state = {}, action) {
    switch (action.type) {
        case 'about':
        return { ...state, page: 'about' }
    
        default:
            return state
    }
}


export function indexData (state = {}, action) {
    switch (action.type) {
        case 'index':
        return { ...state, page: 'index' }
    
        default:
            return state
    }
}


