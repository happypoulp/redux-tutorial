// Tutorial 06 - dispatch-action.js

// So far we've focused on building our reducer(s) and we haven't dispatched any of our own actions.
// We'll keep the same reducers from our previous tutorial and handle a few actions:

var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
var store_0 = createStore(reducer)


console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store_0.getState())
// Output:
// store_0 state after initialization: { user: {}, items: [] }

// Let's dispatch our first action... Remember in 'simple-action-creator.js' we said:
//     "To dispatch an action we need... a dispatch function." Captain obvious

// The dispatch function we're looking for is provided by Redux and will propagate our action
// to all of our reducers! The dispatch function is accessible through the Redux
// instance property "dispatch"

// To dispatch an action, simply call:

store_0.dispatch({
    type: 'AN_ACTION'
})
// Output:
// userReducer was called with state {} and action { type: 'AN_ACTION' }
// itemsReducer was called with state [] and action { type: 'AN_ACTION' }

// Each reducer is effectively called but since none of our reducers care about this action type,
// the state is left unchanged:

console.log('store_0 state after action AN_ACTION:', store_0.getState())
// Output: store_0 state after action AN_ACTION: { user: {}, items: [] }

// But, wait a minute! Aren't we supposed to use an action creator to send an action? We could indeed
// use an actionCreator but since all it does is return an action it would not bring anything more to
// this example. But for the sake of future difficulties let's do it the right way according to
// flux theory. And let's make this action creator send an action we actually care about:

var setNameActionCreator = function (name) {
    return {
        type: 'SET_NAME',
        name: name
    }
}

store_0.dispatch(setNameActionCreator('bob'))
// Output:
// userReducer was called with state {} and action { type: 'SET_NAME', name: 'bob' }
// itemsReducer was called with state [] and action { type: 'SET_NAME', name: 'bob' }

console.log('store_0 state after action SET_NAME:', store_0.getState())
// Output:
// store_0 state after action SET_NAME: { user: { name: 'bob' }, items: [] }

// We just handled our first action and it changed the state of our application!

// But this seems too simple and not close enough to a real use-case. For example,
// what if we'd like do some async work in our action creator before dispatching
// the action? We'll talk about that in the next tutorial "dispatch-async-action.js"

// So far here is the flow of our application
// ActionCreator -> Action -> dispatcher -> reducer

// Go to next tutorial: 07_dispatch-async-action-1.js
