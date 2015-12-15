// Tutorial 1 - simple-action-creator.js

// We started to talk a little about actions in the introduction but what exactly are those "action creators"
// and how are they linked to "actions"?

// It's actually so simple that a few lines of code can explain it all!

// The action creator is just a function...
var actionCreator = function() {
    // ...that creates an action (yeah, the name action creator is pretty obvious now) and returns it
    return {
        type: 'AN_ACTION'
    }
}

// So is that all? yes.

// However, one thing to note is the format of the action. This is kind of a convention in flux
// that the action is an object that contains a "type" property. This type allows for further
// handling of the action. Of course, the action can also contain other properties to
// pass any data you want.

// We'll also see later that the action creator can actually return something other than an action,
// like a function. This will be extremely useful for async action handling (more on that
// in dispatch-async-action.js).

// We can call this action creator and get an action as expected:
console.log(actionCreator())
// Output: { type: 'AN_ACTION' }

// Ok, this works but it does not go anywhere...
// What we need is to have this action be sent somewhere so that
// anyone interested could know that something happened and could act accordingly.
// We call this process "Dispatching an action".

// To dispatch an action we need... a dispatch function ("Captain obvious").
// And to let anyone interested know that an action happened, we need a mechanism to register
// "handlers". Such "handlers" to actions in traditional flux application are called stores and
// we'll see in the next section how they are called in redux.

// So far here is the flow of our application:
// ActionCreator -> Action

// Read more about actions and action creators here:
// http://rackt.org/redux/docs/recipes/ReducingBoilerplate.html

// Go to next tutorial: 02_about-state-and-meet-redux.js
