// Tutorial 4 - simple-reducer.js

// Now that we know how to create a Redux instance that will hold the state of our application
// we will focus on those reducers function that will allow to transform this state.

// A word about reducer VS store:
// As you may have noticed, in the flux diagram shown in the introduction, we had "Store", not
// "Reducer" like Redux is expecting. So how exactly do Store and Reducer differ?
// It's more simple than you could imagine: A Store keeps your data in him while a Reducer doesn't.
// So in traditional flux, stores hold state in them while in Redux, each time a reducer is
// called, it is passed the state that needs to be updated. This way, Redux's stores became
// "stateless stores" and were renamed reducers.

// As said before, when creating a Redux instance you must give it a reducer function...

import { createStore } from 'redux'

var store_0 = createStore(() => {})

// ... so that Redux can call this function on your application state each time an action occurs.

// Let's put some log in our reducer

var reducer = function (...args) {
    console.log('Reducer was called with args', args)
}

var store_1 = createStore(reducer)

// Output: Reducer was called with args [ undefined, { type: '@@redux/INIT' } ]

// Did you see that? our reducer is actually called even if we didn't dispatch any action...
// That's because to initialize the state of the application,
// Redux actually dispatch an init action ({ type: '@@redux/INIT' })

// When called, a reducer is given those parameters: (state, action)
// It's then very logical that at an application initialization the state not being yet
// initialized, is "undefined"

// But then what is the state of our application after Redux sent its "init" action?

// Go to next tutorial: get-state.js
