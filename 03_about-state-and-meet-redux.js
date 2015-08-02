// Tutorial 3 - about-state-and-meet-redux.js

// Sometimes, the actions that we'll handle in our application will not only be made to inform us
// that something happened but also to tell us that a data needs to be updated.

// This is actually quite a big challenge in any apps.
// Where do I keep all the data regarding my application along its lifetime?
// How do I handle modification of such data?
// How do I propagate modifications to all parts of my application?

// Here comes Redux.

// Redux (https://github.com/gaearon/redux) is a "predictable state container for JavaScript apps"

// Let's take again those questions above and reply to them with 
// Redux vocabulary (flux vocabulary too for some of them):

// Where do I keep all the data regarding my application along its lifetime?
//     You keep it the way you want (JS object, array, Immutable structure, ...).
//     Data of your application will be called state. Makes sense since we're talking about
//     all the application's data that will evolve over time, it's really the application's state.
//     But you hand it over to Redux (Redux is "state container", remember?).
// How do I handle modification of such data?
//     Using reducers.
//     A reducer is a subscriber to actions.
//     A reducer is just a function that receives the current state of your application, the action,
//     and returns a new state modified (or reduced as they call it)
// How do I propagate modifications to all parts of my application?
//     Using subscribers to state's modifications.

// Redux tie all this up together for you.
// To sum up, Redux will provide you:
//     1) a place to put your application state
//     2) a mechanism to subscribe to state updates
//     3) a mechanism to dispatch actions to modifiers or your application state AKA reducers

// The Redux instance is called a store and can be created like this:
/*
    import { createStore } from 'redux'
    var store = createStore()
*/

// but if you run the code above, you'll notice that it throw an error:
//     Error: Invariant Violation: Expected the reducer to be a function.

// That's because createStore expect at least a function that will allow him to reduce your state

// Let's try again

import { createStore } from 'redux'

var store = createStore(() => {})

// Seems good for now...

// Go to next tutorial: simple-reducer.js