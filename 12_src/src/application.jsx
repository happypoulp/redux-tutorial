// Tutorial 12 - Provider-and-connect.js

// Now is the time to meet the first binding that redux-react (https://github.com/rackt/react-redux)
// brings to us: the Provider component.

// Provider is a React Component designed to be used as a wrapper of your application's root component. Its
// purpose is to provide your redux instance to all of your application's components. How it does that does not
// really matter to us but just to let you know, it's using React's context feature (it's undocumented so you
// don't have to know about it, but if you're curious:
// https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html).

import React from 'react'
import Home from './home'
import { Provider } from 'react-redux'

export default class Application extends React.Component {
  render () {
    return (
      // As explained above, the Provider must wrap your application's Root component. This way,
      // this component and all of its children (even deeply nested ones) will have access to your
      // Redux store. Of course, to allow Provider to do that, you must give it the store
      // you built previously (via a "store" props).
      <Provider store={ this.props.store }>
        <Home />
      </Provider>
    )
  }
}

// Go to ./home.jsx to discover how you could read from state and dispatch an action from a React component.
