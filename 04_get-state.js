// Tutorial 04 - get-state.js

// How do we retrieve the state from our Redux instance?

import { createStore } from 'redux'

var reducer_0 = function (state, action) {
    console.log('reducer_0 was called with state', state, 'and action', action)
}

var store_0 = createStore(reducer_0)
// Output: reducer_0 was called with state undefined and action { type: '@@redux/INIT' }

// To get the state that Redux is holding for us, you call getState

console.log('store_0 state after initialization:', store_0.getState())
// Output: store_0 state after initialization: undefined

// So the state of our application is still undefined after the initialization? Well of course it is,
// our reducer is not doing anything... Remember how we described the expected behavior of a reducer in
// "about-state-and-meet-redux"?
//     "A reducer is just a function that receives the current state of your application, the action,
//     and returns a new state modified (or reduced as they call it)"
// Our reducer is not returning anything right now so the state of our application is what
// reducer() returns, hence "undefined".

// Let's try to send an initial state of our application if the state given to reducer is undefined:

var reducer_1 = function (state, action) {
    console.log('reducer_1 was called with state', state, 'and action', action)
    if (typeof state === 'undefined') {
        return {}
    }

    return state;
}

var store_1 = createStore(reducer_1)
// Output: reducer_1 was called with state undefined and action { type: '@@redux/INIT' }

console.log('store_1 state after initialization:', store_1.getState())
// Output: store_1 state after initialization: {}

// As expected, the state returned by Redux after initialization is now {}

// There is however a much cleaner way to implement this pattern thanks to ES6:

var reducer_2 = function (state = {}, action) {
    console.log('reducer_2 was called with state', state, 'and action', action)

    return state;
}

var store_2 = createStore(reducer_2)
// Output: reducer_2 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_2 state after initialization:', store_2.getState())
// Output: store_2 state after initialization: {}

// You've probably noticed that since we've used the default parameter on state parameter of reducer_2,
// we no longer get undefined as state's value in our reducer's body.

// Let's now recall that a reducer is only called in response to an action dispatched and
// let's fake a state modification in response to an action type 'SAY_SOMETHING'

var reducer_3 = function (state = {}, action) {
    console.log('reducer_3 was called with state', state, 'and action', action)

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

var store_3 = createStore(reducer_3)
// Output: reducer_3 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_3 state after initialization:', store_3.getState())
// Output: redux state after initialization: {}

// Nothing new in our state so far since we did not dispatch any action yet. But there are few
// important things to pay attention to in the last example:
//     0) I assumed that our action contains a type and a value property. The type property is mostly
//        a convention in flux actions and the value property could have been anything else.
//     1) You'll often see the pattern involving a switch to respond appropriately
//        to an action received in your reducers
//     2) When using a switch, NEVER forget to have a "default: return state" because
//        if you don't, you'll end up having your reducer return undefined (and lose your state).
//     3) Notice how we returned a new state made by merging current state with { message: action.value },
//        all that thanks to this awesome ES7 notation (Object Spread): { ...state, message: action.value }
//     4) Note also that this ES7 Object Spread notation suits our example because it's doing a shallow
//        copy of { message: action.value } over our state (meaning that first level properties of state
//        are completely overwritten - as opposed to gracefully merged - by first level property of
//        { message: action.value }). But if we had a more complex / nested data structure, you might choose
//        to handle your state's updates very differently:
//        - using Immutable.js (https://facebook.github.io/immutable-js/)
//        - using Object.assign (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
//        - using manual merge
//        - or whatever other strategy that suits your needs and the structure of your state since
//          Redux is absolutely NOT opinionated on this (remember, Redux is a state container).

// Now that we're starting to handle actions in our reducer let's talk about having multiple reducers and
// combining them.

// Go to next tutorial: 05_combine-reducers.js
