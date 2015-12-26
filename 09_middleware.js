// Tutorial 09 - middleware.js

// We left dispatch-async-action-2.js with a new concept: "middleware". Somehow middleware should help us
// to solve async action handling. So what exactly is middleware?

// Generally speaking middleware is something that goes between parts A and B of an application to
// transform what A sends before passing it to B. So instead of having:
// A -----> B
// we end up having
// A ---> middleware 1 ---> middleware 2 ---> middleware 3 --> ... ---> B

// How could middleware help us in the Redux context? Well it seems that the function that we are
// returning from our async action creator cannot be handled natively by Redux but if we had a
// middleware between our action creator and our reducers, we could transform this function into something
// that suits Redux:

// action ---> dispatcher ---> middleware 1 ---> middleware 2 ---> reducers

// Our middleware will be called each time an action (or whatever else, like a function in our
// async action creator case) is dispatched and it should be able to help our action creator
// dispatch the real action when it wants to (or do nothing - this is a totally valid and
// sometimes desired behavior).

// In Redux, middleware are functions that must conform to a very specific signature and follow
// a strict structure:
/*
    var anyMiddleware = function ({ dispatch, getState }) {
        return function(next) {
            return function (action) {
                // your middleware-specific code goes here
            }
        }
    }
*/

// As you can see above, a middleware is made of 3 nested functions (that will get called sequentially):
// 1) The first level provide the dispatch function and a getState function (if your
//     middleware or your action creator needs to read data from state) to the 2 other levels
// 2) The second level provide the next function that will allow you to explicitly hand over
//     your transformed input to the next middleware or to Redux (so that Redux can finally call all reducers).
// 3) the third level provides the action received from the previous middleware or from your dispatch
//     and can either trigger the next middleware (to let the action continue to flow) or process
//     the action in any appropriate way.

// Those of you who are trained to functional programming may have recognized above an opportunity
// to apply a functional pattern: currying (if you aren't, don't worry, skipping the next 10 lines
// won't affect your redux understanding). Using currying, you could simplify the above function like that:
/*
    // "curry" may come any functional programming library (lodash, ramda, etc.)
    var thunkMiddleware = curry(
        ({dispatch, getState}, next, action) => (
            // your middleware-specific code goes here
        )
    );
*/

// The middleware we have to build for our async action creator is called a thunk middleware and
// its code is provided here: https://github.com/gaearon/redux-thunk.
// Here is what it looks like (with function body translated to es5 for readability):

var thunkMiddleware = function ({ dispatch, getState }) {
    // console.log('Enter thunkMiddleware');
    return function(next) {
        // console.log('Function "next" provided:', next);
        return function (action) {
            // console.log('Handling action:', action);
            return typeof action === 'function' ?
                action(dispatch, getState) :
                next(action)
        }
    }
}

// To tell Redux that we have one or more middlewares, we must use one of Redux's
// helper functions: applyMiddleware.

// "applyMiddleware" takes all your middlewares as parameters and returns a function to be called
// with Redux createStore. When this last function is invoked, it will produce "a higher-order
// store that applies middleware to a store's dispatch".
// (from https://github.com/rackt/redux/blob/v1.0.0-rc/src/utils/applyMiddleware.js)

// Here is how you would integrate a middleware to your Redux store:

import { createStore, combineReducers, applyMiddleware } from 'redux'

const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
// For multiple middlewares, write: applyMiddleware(middleware1, middleware2, ...)(createStore)

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
                return state
        }
    }
})

const store_0 = finalCreateStore(reducer)
// Output:
//     speaker was called with state {} and action { type: '@@redux/INIT' }
//     speaker was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_s.b.4.z.a.x.a.j.o.r' }
//     speaker was called with state {} and action { type: '@@redux/INIT' }

// Now that we have our middleware-ready store instance, let's try again to dispatch our async action:

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            console.log(new Date(), 'Dispatch action now:')
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
}

console.log("\n", new Date(), 'Running our async action creator:', "\n")

store_0.dispatch(asyncSayActionCreator_1('Hi'))
// Output:
//     Mon Aug 03 2015 00:01:20 GMT+0200 (CEST) Running our async action creator:
//     Mon Aug 03 2015 00:01:22 GMT+0200 (CEST) 'Dispatch action now:'
//     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }

// Our action is correctly dispatched 2 seconds after our call the async action creator!

// Just for your curiosity, here is how a middleware to log all actions that are dispatched, would
// look like:

function logMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('logMiddleware action received:', action)
            return next(action)
        }
    }
}

// Same below for a middleware to discard all actions that goes through (not very useful as is
// but with a bit of more logic it could selectively discard a few actions while passing others
// to next middleware or Redux):
function discardMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('discardMiddleware action received:', action)
        }
    }
}

// Try to modify finalCreateStore call above by using the logMiddleware and / or the discardMiddleware
// and see what happens...
// For example, using:
//     const finalCreateStore = applyMiddleware(discardMiddleware, thunkMiddleware)(createStore)
// should make your actions never reach your thunkMiddleware and even less your reducers.

// See http://rackt.org/redux/docs/introduction/Ecosystem.html, section Middlewares, to
// see other middleware examples.

// Let's sum up what we've learned so far:
// 1) We know how to write actions and action creators
// 2) We know how to dispatch our actions
// 3) We know how to handle custom actions like asynchronous actions thanks to middlewares

// The only missing piece to close the loop of Flux application is to be notified about
// state updates to be able to react to them (by re-rendering our components for example).

// So how do we subscribe to our Redux store updates?

// Go to next tutorial: 10_state-subscriber.js
