// Tutorial 07 - dispatch-async-action-1.js

// We previously saw how we can dispatch actions and how those actions will modify
// the state of our application thanks to reducers.

// But so far we've only considered synchronous actions or, more exactly, action creators
// that produce an action synchronously: when called an action is returned immediately.

// Let's now imagine a simple asynchronous use-case:
// 1) user clicks on button "Say Hi in 2 seconds"
// 2) When button "A" is clicked, we'd like to show message "Hi" after 2 seconds have elapsed
// 3) 2 seconds later, our view is updated with the message "Hi"

// Of course this message is part of our application state so we have to save it
// in Redux store. But what we want is to have our store save the message
// only 2 seconds after the action creator is called (because if we were to update our state
// immediately, any subscriber to state's modifications - like our view -  would be notified right away
// and would then react to this update 2 seconds too soon).

// If we were to call an action creator like we did until now...

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    speaker: function (state = {}, action) {
        console.log('speaker was called with state', state, 'and action', action)

        switch (action.type) {
            case 'SAY':
                return {
                    ...state,
                    message: action.message
                }
            default:
                return state;
        }
    }
})
var store_0 = createStore(reducer)

var sayActionCreator = function (message) {
    return {
        type: 'SAY',
        message
    }
}

console.log("\n", 'Running our normal action creator:', "\n")

console.log(new Date());
store_0.dispatch(sayActionCreator('Hi'))

console.log(new Date());
console.log('store_0 state after action SAY:', store_0.getState())
// Output (skipping initialization output):
//     Sun Aug 02 2015 01:03:05 GMT+0200 (CEST)
//     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }
//     Sun Aug 02 2015 01:03:05 GMT+0200 (CEST)
//     store_0 state after action SAY: { speaker: { message: 'Hi' } }


// ... then we see that our store is updated immediately.

// What we'd like instead is an action creator that looks a bit like this:

var asyncSayActionCreator_0 = function (message) {
    setTimeout(function () {
        return {
            type: 'SAY',
            message
        }
    }, 2000)
}

// But then our action creator would not return an action, it would return "undefined". So this is not
// quite the solution we're looking for.

// Here's the trick: instead of returning an action, we'll return a function. And this function will be the
// one to dispatch the action when it seems appropriate to do so. But if we want our function to be able to
// dispatch the action it should be given the dispatch function. Then, this should look like this:

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
}

// Again you'll notice that our action creator is not returning an action, it is returning a function.
// So there is a high chance that our reducers won't know what to do with it. But you never know, so let's
// try it out and find out what happens...

// Go to next tutorial: 08_dispatch-async-action-2.js
