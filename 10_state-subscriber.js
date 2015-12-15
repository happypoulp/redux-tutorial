// Tutorial 10 - state-subscriber.js

// We're close to having a complete Flux loop but we still miss one critical part:

//  _________      _________       ___________
// |         |    | Change  |     |   React   |
// |  Store  |----▶ events  |-----▶   Views   |
// |_________|    |_________|     |___________|

// Without it, we cannot update our views when the store changes.

// Fortunately, there is a very simple way to "watch" over our Redux's store updates:

/*
    store.subscribe(function() {
        // retrieve latest store state here
        // Ex:
        console.log(store.getState());
    })
*/

// Yeah... So simple that it almost makes us believe in Santa Claus again.

// Let's try this out:

import { createStore, combineReducers } from 'redux'

var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}

var reducer = combineReducers({ items: itemsReducer })
var store_0 = createStore(reducer)

store_0.subscribe(function() {
    console.log('store_0 has been updated. Latest store state:', store_0.getState());
    // Update your views here
})

var addItemActionCreator = function (item) {
    return {
        type: 'ADD_ITEM',
        item: item
    }
}

store_0.dispatch(addItemActionCreator({ id: 1234, description: 'anything' }))

// Output:
//     ...
//     store_0 has been updated. Latest store state: { items: [ { id: 1234, description: 'anything' } ] }

// Our subscribe callback is correctly called and our store now contains the new item that we added.

// Theoretically speaking we could stop here. Our Flux loop is closed, we understood all concepts that make
// Flux and we saw that it is not that much of a mystery. But to be honest, there is still a lot to talk
// about and a few things in the last example were intentionally left aside to keep the simplest form of this
// last Flux concept:

// - Our subscriber callback did not receive the state as a parameter, why?
// - Since we did not receive our new state, we were bound to exploit our closured store (store_0) so this
//     solution is not acceptable in a real multi-modules application...
// - How do we actually update our views?
// - How do we unsubscribe from store updates?
// - More generally speaking, how should we integrate Redux with React?

// We're now entering a more "Redux inside React" specific domain.

// It is very important to understand that Redux is by no means bound to React. It is really a
// "Predictable state container for JavaScript apps" and you can use it in many ways, a React
// application just being one of them.

// In that perspective we would be a bit lost if it wasn't for react-redux (https://github.com/rackt/react-redux).
// Previously integrated inside Redux (before 1.0.0), this repository holds all the bindings we need to simplify
// our life when using Redux inside React.

// Back to our "subscribe" case... Why exactly do we have this subscribe function that seems so simple but at
// the same time also seems to not provide enough features?

// Its simplicity is actually its power! Redux, with its current minimalist API (including "subscribe") is
//  highly extensible and this allows developers to build some crazy products like the Redux DevTools
// (https://github.com/gaearon/redux-devtools).

// But in the end we still need a "better" API to subscribe to our store changes. That's exactly what react-redux
// brings us: an API that will allow us to seamlessly fill the gap between the raw Redux subscribing mechanism
// and our developer expectations. In the end, you won't need to use "subscribe" directly. Instead you will
// use bindings such as "provide" or "connect" and those will hide from you the "subscribe" method.

// So yeah, the "subscribe" method will still be used but it will be done through a higher order API that
// handles access to redux state for you.

// We'll now cover those bindings and show how simple it is to wire your components to Redux's state.

// Go to next tutorial: 11_Provider-and-connect.js
