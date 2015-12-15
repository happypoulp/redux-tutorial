// Tutorial 02 - about-state-and-meet-redux.js

// Sometimes the actions that we'll handle in our application will not only inform us
// that something happened but also tell us that data needs to be updated.

// This is actually quite a big challenge in any app.
// Where do I keep all the data regarding my application along its lifetime?
// How do I handle modification of such data?
// How do I propagate modifications to all parts of my application?

// Here comes Redux.

// Redux (https://github.com/rackt/redux) is a "predictable state container for JavaScript apps"

// Let's review the above questions and reply to them with
// Redux vocabulary (flux vocabulary too for some of them):

// Where do I keep all the data regarding my application along its lifetime?
//     You keep it the way you want (JS object, array, Immutable structure, ...).
//     Data of your application will be called state. This makes sense since we're talking about
//     all the application's data that will evolve over time, it's really the application's state.
//     But you hand it over to Redux (Redux is a "state container", remember?).
// How do I handle data modifications?
//     Using reducers (called "stores" in traditional flux).
//     A reducer is a subscriber to actions.
//     A reducer is just a function that receives the current state of your application, the action,
//     and returns a new state modified (or reduced as they call it)
// How do I propagate modifications to all parts of my application?
//     Using subscribers to state's modifications.

// Redux ties all this together for you.
// To sum up, Redux will provide you:
//     1) a place to put your application state
//     2) a mechanism to dispatch actions to modifiers of your application state, AKA reducers
//     3) a mechanism to subscribe to state updates

// The Redux instance is called a store and can be created like this:
/*
    import { createStore } from 'redux'
    var store = createStore()
*/

// But if you run the code above, you'll notice that it throws an error:
//     Error: Invariant Violation: Expected the reducer to be a function.

// That's because createStore expects a function that will allow it to reduce your state.

// Let's try again

import { createStore } from 'redux'

var store = createStore(() => {})

// Seems good for now...

// Go to next tutorial: 03_simple-reducer.js
