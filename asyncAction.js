const { default: axios } = require("axios")
const { createStore, applyMiddleware } = require("redux")
const { default: logger } = require("redux-logger")
const { default: thunk } = require("redux-thunk")

//STATE
const initialState = {
    loading: false,
    data: [],
    error: ''
}

//ACTIONS

//ACTION-TYPES
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

//ACTION-CREATORS
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

//REDUCERS

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        default:
            return state
    }
}

const fetchUsers = () => async (dispatch) => {
    dispatch(fetchUsersRequest())
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        const users = response.data.map(user => user.name)
        dispatch(fetchUsersSuccess(users))
    } catch (error) {
        dispatch(fetchUsersFailure(error.message))
    }
}


//STORE
const store = createStore(reducer, applyMiddleware(thunk, logger))

//SUBSCRIBE
const unsubscribe = store.subscribe(() => { })

//DISPATCH SOME ACTIONS
store.dispatch(fetchUsers())

//UNSCUBSCRIBE
unsubscribe()