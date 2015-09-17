// Tutorial 6 - combine-reducers.js

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

// It becomes quite evident that a single reducer function cannot hold all our
// application's actions handling (well it could hold it, but it wouldn't be very maintainable...).

// Luckily for us, Redux doesn't care if we have one reducer or a dozen and it will even help us to
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

// With this new multiple reducer approach, we will end up having each reducer handle only
// a slice of our application state.

// But as we already know, createStore expects just one reducer function.

// So how do we combine our reducers? And how do we tell Redux that each reducer will only handle
// a slice of our state?
// It's fairly simple. We use Redux combineReducers helper function. combineReducers take a hash and
// return a function that when invoked, will call all our reducers, retrieve the new slice of state and
// reunite them in a state object (a simple hash {}) that Redux is holding.
// Long story short, here is how you create a Redux instance with multiple reducers:

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
// But what is this other action? This is a sanity check implemented in combineReducers
// to assure that a reducer will always return a state != 'undefined'.
// Please note also that the first invocation of init actions in combineReducers share the same purpose
// as random actions (to do a sanity check).

console.log('store_0 state after initialization:', store_0.getState())
// Output:
// store_0 state after initialization: { user: {}, items: [] }

// It's interesting to note that Redux handles our slices of state correctly,
// the final state is indeed a simple hash made of the userReducer's slice and the itemsReducer's slice:
// {
//     user: {}, // {} is the slice returned by our userReducer
//     items: [] // [] is the slice returned by our itemsReducer
// }

// By now we have a good idea of how reducers will work. It would be nice to have some
// actions being dispatched and see the impact on our Redux state.

// Go to next tutorial: dispatch-action.js
