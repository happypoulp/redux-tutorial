// Tutorial 12 - Provider-and-connect.js

// Now is the time to meet the first binding that redux-react (https://github.com/gaearon/react-redux)
// brings to us. 

import React from 'react'
import Home from './home'
import { Provider } from 'react-redux'

export default class Application extends React.Component {
  render () {
    return (
      <Provider store={ this.props.store }>
        { () => <Home /> }
      </Provider>
    )
  }
}