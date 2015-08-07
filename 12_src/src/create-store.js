// Tutorial 12 - Provider-and-connect.js

// There is not much to say here, you've seen that plenty of time and it should feel pretty
// familiar to you now...

// One thing to notice though: we're not using the thunk middleware we've seen before. Instead
// we use a promise middleware solution that will allow us to handle asynchronous action creators and
// to do some nice real time updates on our UI (could also be some optimistic updates).
// It was discussed here:  https://github.com/gaearon/redux/issues/99 and it is used in this very good
// react-redux-universal-example: https://github.com/erikras/react-redux-universal-hot-example
// that I strongly suggest you get a look at (later, not right now ;)).

import { createStore, applyMiddleware, combineReducers } from 'redux'
// You can go and see code for this middleware, it's not very complicated and make a good
// excercise to sharpen your understanding on middlewares.
import promiseMiddleware from './promise-middleware'
// We'll just have one reducer in this application but the ES6 import notation below is 
// pretty interesting to import and produce a reducers hash in one go. Have a look in
// ./reducers.js to see what our reducer actually do (no magic there).
import * as reducers from './reducers'

// The data parameter that we see here is used to initialize our redux store with data. This was
// not spoken of yet for simplicity but it is thanks to that, that your reducers can be initialized
// with real data if you already have some. For example in an isomorphic/universal app where you 
// fetched data server-side, serialized and passed them to the client, your Redux store can be 
// initialized with those data.
// We're not passing any data here but it's good that you know of this createStore's ability.
export default function(data) {
  var reducer = combineReducers(reducers)
  var finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
  var store = finalCreateStore(reducer, data)

  return store
}

// Go to ./application.jsx to learn of the first Redux binding for React: the Provider component.
