const { createStore, combineReducers, applyMiddleware } = require("redux")
const { logger } = require('redux-logger')


//ACTIONS
const BUY_CAKE = "BUY_CAKE"
const BUY_ICECREAM = "BUY_ICECREAM"

//ACTION_CREATORS
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: "Buying a cake"
    }
}

const buyIceCream = () => {
    return {
        type: BUY_ICECREAM,
        info: "Buying an icecream"
    }
}

//INITIAL STATE
const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

//REDUCERS
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:
            return state
    }
}

const buyCakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

const buyIceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:
            return state
    }
}

//COMBINE MULTIPLE REDUCERS
const rootReducer = combineReducers({
    cake: buyCakeReducer,
    iceCream: buyIceCreamReducer
})

//STORE
const store = createStore(rootReducer, applyMiddleware(logger))
console.log("Initial state: ", store.getState());

//SUBSCRIBE
const unsubscribe = store.subscribe(() => { })

//PERFORM ACTIONS
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

//UNSUBSCRIBE
unsubscribe()