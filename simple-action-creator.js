// Tutorial 0

// The action creator is just a function...
var actionCreator = function() {
    // ...that returns an action
    return {
        type: 'AN_ACTION'
    }
}

console.log(actionCreator)

// Ok, this works but it does not go anywhere...
// Let's have this action be sent somewhere so that 
// anyone interested could know that something happened and could act accordingly
// We call this process "Dispatching an action"

// To dispatch an action we need... a dispatch function.
// And to let anyone interested know that an action happened, we need a mechanism to register
// subscribers

// So far here is the flow of our application
// ActionCreator -> Action

// Go to next tutorial: simple-subscriber.js