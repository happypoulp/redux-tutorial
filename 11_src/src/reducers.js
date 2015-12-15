// Tutorial 12 - Provider-and-connect.js

// This file holds the one and only reducer of our application. Its behavior is nothing new to you
// except maybe its handling of three aspects of an action (GET_TIME) that become 3 dedicated actions...
// This approach allows us to do some nice real time updates in our UI like this:
// 1) When we receive GET_TIME_REQUEST action, we modify the state to say that some part of the
//    UI should be frozen (because there is a pending operation)
// 2) When we receive GET_TIME_SUCCESS (or GET_TIME_FAILURE) later on, we modify the state to
//    unfreeze our application and to add the new data we received.

var initialTimeState = {}

// The reducer is named with leading "_" to avoid having: state.time.time (time twice) when reading
// from state. So it's just a personal preference here and you may not need this depending on
// how your reducers are named and what properties they expose in Redux's store.
export function _time(state = initialTimeState, action) {
  console.log('_time reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_TIME_REQUEST':
      return {
        ...state,
        frozen: true
      }
    case 'GET_TIME_SUCCESS':
      return {
        ...state,
        time: action.result.time,
        frozen: false
      }
    case 'GET_TIME_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        frozen: false
      }
    default:
      return state
  }
}
