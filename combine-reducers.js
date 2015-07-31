// Tutorial 5

// We're now starting to get a grasp of what a reducer is...

var reducer_0 = function (state = {}, action) {
    console.log('reducer_0 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        default:
            return state;
    }
}

// ... but before going further, we should start wondering what our reducer will look like when 
// we'll have tens of actions:

var reducer_1 = function (state = {}, action) {
    console.log('reducer_1 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        case 'DO_SOMETHING':
            // ...
        case 'LEARN_SOMETHING':
            // ...
        case 'HEAR_SOMETHING':
            // ...
        case 'GO_SOMEWHERE':
            // ...
        // etc.
        default:
            return state;
    }
}

// It become quite evident that a single reducer function cannot hold all our
// application's actions handling (well it could hold it, but it wouldn't be very maintainable...).

// Luckily for us, redux doesn't care if we have one reducer or a dozen and it will even help us to
// combine them if we have many!

// Let's declare 2 reducers

var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}

// With this new multiple reducer approach and when using combineReducers,
// each reducer will only handle a slice of our application state.

// We need now a single reducer function to pass it to createStore.

// How do we combine our reducers? and how do we tell redux that each reducer will only handle
// a slice of our state?
// It's fairly simple. We use redux combineReducers function helper. combineReducers take a hash and
// return a function that when called, will call all our reducers, retrieve the state new slice and
// reunite them in a state object (a simple hash {}) that redux is holding.
// Long story short, here is how you create a redux instance with multiple reducers:

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
// Output:
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// userReducer was called with state {} and action { type: 'a.2.e.i.j.9.e.j.y.v.i' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: 'i.l.j.c.a.4.z.3.3.d.i' }
var store_0 = createStore(reducer)
// Output:
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }

// As you can see in the output, each reducer is correctly called with the init action @@redux/INIT.
// But what is this other action that is recieved? This is samity check implemented in combineReducers
// to check that a reducer will always return a state != 'undefined'.
// Please note also that the first invocation of init actions in combineReducers share the same purpose
// as random actions (do a sanity check).

console.log('store_0 state after initialization:', store_0.getState())
// Output:
// store_0 state after initialization: { user: {}, items: [] }

// It's interesting to note that accordingly to how redux was supposed to handle our slices,
// the final state is indeed a simple hash made of the userReducer's slice and the itemsReducer's slice:
// {
//     user: {}, // {} is the slice returned by our userReducer
//     items: [] // [] is the slice returned by our itemsReducer
// }

// We have by now a good idea of how reducers will work. It would be nice to have some
// actions being dispatched and see the impact on our redux state.

// Go to next tutorial: dispatch-action.js