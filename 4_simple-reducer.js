// Tutorial 4 - simple-reducer.js

// Now that we know how to create a redux instance that will hold the state of our application
// we will focus on those reducers function that will allow to transform this state.

// As said before, when creating a redux instance you must give it a reducer function...

import { createStore } from 'redux'

var store_0 = createStore(() => {})

// ... so that redux can call this function on your application state each time an action occurs.

// Let's put some log in our reducer

var reducer = function (...args) {
    console.log('Reducer was called with args', args)
}

var store_1 = createStore(reducer)

// Output: Reducer was called with args [ undefined, { type: '@@redux/INIT' } ]

// Did you see that? our reducer is actually called even if we didn't dispatch any action...
// That's because to initialize the state of the application,
// redux actually dispatch an init action ({ type: '@@redux/INIT' })

// When called, a reducer is given those parameters: (state, action)
// It's then very logical that at an application initialization the state not being yet
// initialized, is "undefined"

// But then what is the state of our application after redux sent its "init" action?

// Go to next tutorial: get-state.js