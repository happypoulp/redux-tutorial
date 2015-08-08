// Tutorial 12 - Provider-and-connect.js

// Now is the time to meet the first binding that redux-react (https://github.com/gaearon/react-redux)
// brings to us: the Provider component.

// Provider is a React Component designed to be used as a wrapper of your application's root component. Its
// purpose is to provide your redux instance to all your application's components. How it does that does not
// really matters to us but just to let you know, it's using React's context feature (it's undocumented so you
// don't have to know about it but if you're curious:
// https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html).

import React from 'react'
import Home from './home'
import { Provider } from 'react-redux'

export default class Application extends React.Component {
  render () {
    return (
      // As explained above, the Provider must wrap your application's Root component. This way,
      // this component and all of its children (even deeply nested ones) will have access to your 
      // Redux store. Of course, to allow Provider do do that, you must give to him the store
      // you built precedently (via a "store" props).
      // That's almost all there is to say about Provider... One last word though:
      // You'll notice in the code above that Provider needs to have as its child, a function that return
      // the root component instead of the component itself. This is a temporary API until React 0.14 comes
      // out, to fix a React 0.13 context issue.
      <Provider store={ this.props.store }>
        { () => <Home /> }
      </Provider>
    )
  }
}

// Go to ./home.jsx to discover how you could read from state and dispatch an action from a React component.
