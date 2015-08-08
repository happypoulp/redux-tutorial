// Tutorial 11 - state-subscriber.js

// We're close to have a complete Flux loop but we still miss one critical part:

//  _________      _________       ___________  
// |         |    | Change  |     |   React   |
// |  Store  |----▶ events  |-----▶   Views   |
// |_________|    |_________|     |___________|

// Without it, we cannot update our views when the store change.

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

// Theorically speaking we could stop here. Our Flux loop is closed, we understood all concept that makes
// Flux and we saw that it is not that much of a mystery. But to be honest, there is still a lot to talk 
// about and few things in the last example were intentionally left aside to keep the most simplest form of this
// last Flux's concept:

// - Our subscriber callback did not received the state as parameter, why?
// - Since we did not received our new state, we were bound to exploit our closured store (store_0) so this
//     solution is not acceptable in a real multi-modules application...
// - How do we actually update our views?
// - How do we unsubscribe from store updates?
// - More generally speaking, how should we integrate Redux with React?

// We're now entering a more "Redux inside React" specific domain.

// It is very important to understand that Redux is by no mean bound to React. It is really a 
// "Predictable state container for JavaScript apps" and you can use it in many ways, a React 
// application just being one of them.

// In that perspective we would be a bit lost if it weren't for react-redux (https://github.com/gaearon/react-redux).
// Previously integrated inside Redux (before 1.0.0), this repository holds all the bindings we need to simplify
// our life when using Redux inside React.

// Back to our "subscribe" case... Why exactly do we have this subscribe function that seems so simple but in 
// the same time also seems to not provide enough features?

// It's simplicity is actually its power! Redux, with its current minimalist API (including "subscribe") is
//  highly extensible and this allow to build some crazy product like the Redux DevTools 
// (https://github.com/gaearon/redux-devtools).

// But in the end we still need a "better" API to subscribe to our store change. That's exactly what redux-react
// brings us: an API that will allow us to seamlessly fill the gap between the raw Redux subscribing mechanism
// and our developer expectations. In the end, you won't need to use "subscribe" directly. Instead you will
// use bindings such as "provide" or "connect" and those will hide from you the "subscribe" method.

// So yeah, the "subscribe" method will still be used but it will done through a higher order API that 
// handle for you the access to redux state.

// We'll now cover those bindings and show how simple it is to wire your components to Redux's state.

// Go to next tutorial: provide-and-connect.js
