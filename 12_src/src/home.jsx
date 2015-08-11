// Tutorial 12 - Provider-and-connect.js

// Our tutorial is almost over and the only missing piece to leave you with a good overview of Redux is:
// How do we read from our store's state and how do we dispatch actions?

// Both of these questions can be answered using a single react-redux's binding: @connect class decorator.

// As we explained previously, when using the Provider component, we allow all components of our app to
// access Redux. But this access can only be made through the undocumented feature "React's context". To
// avoid asking you to use such "dark" React API, Redux is exposing a decorator (an ES7 feature that
// makes it possible to annotate and modify classes and properties at design time -
// https://github.com/wycats/javascript-decorators) that you can use on a component class.

// The "connect" decorator literally connects your component with your Redux's store. By doing so,
// it provides your store's dispatch function through a component's prop and also adds any
// properties you want to expose part of your store's state.

// Using @connect, you'll turn a dumb component (https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0),
// into a smart component with very little code overhead.

import React from 'react'
import { connect } from 'react-redux'
// We use the same ES6 import trick to get all action creators and produce a hash like we did with
// our reducers. If you haven't yet, go get a look at our action creator (./actions-creator.js).
import * as actionCreators from './action-creators'

// The "connect" decorator takes as its only parameter, a function that will select which slice of your
// state you want to expose to your component. This function is logically called a "selector" and
// receives 2 parameters: the state of your store and the current props of your component.
// The props of the component are provided to handle common case like extracting a slice of your
// state depending on a prop value (Ex: state.items[props.someID]).
@connect((state /*, props*/) => {
    // This is our select function that will extract from the state the data slice we want to expose
    // through props to our component.
    return {
      reduxState: state,
      frozen: state._time.frozen,
      time: state._time.time
    }
})
export default class Home extends React.Component {
  onTimeButtonClick () {
    // This button handler will dispatch an action in response to a
    // click event from a user. We use here the dispatch function provided by @connect in a prop.
    this.props.dispatch(actionCreators.getTime())
  }
  render () {

    // Thanks to our @connect decorator, we're able to get the data previously selected through the props.
    var { frozen, time, reduxState } = this.props
    var attrs = {}

    if (frozen) {
        attrs = {
          disabled: true
        }
    }

    return (
      <div>
        <h1>Provider and @connect example</h1>
        <span>
          <b>What time is it?</b> { time ? `It is currently ${time}` : 'No idea yet...' }
        </span>
        <br />
        {/* We register our button handler here and use the experimental ES7 function's binding operator "::"
            to have our handler to be bound to the component's instance. */}
        <button { ...attrs } onClick={::this.onTimeButtonClick}>Get time!</button>
        <pre>
          redux state = { JSON.stringify(reduxState, null, 2) }
        </pre>
      </div>
    )
  }
}

// Go to ./final-words.jsx for our last advice about what to do now...
