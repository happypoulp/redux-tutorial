// Tutorial 12 - Provider-and-connect.js

// Our tutorial is almost over and the only missing piece to leave you with a good overview of Redux is:
// How do we read from our store's state and how do we dispatch actions?

// Both of these questions can be answered using a single react-redux's binding: @connect class decorator.

// As we previously explained, when using the Provider component we allow all components of our app to
// access Redux. But this access can only be made through the undocumented feature "React's context". To
// avoid asking you to use such "dark" React API, Redux is exposing a decorator (an ES7 feature that
// makes it possible to annotate and modify classes and properties at design time -
// https://github.com/wycats/javascript-decorators) that you can use on a component class.

// The "connect" decorator (written @connect) literally connects your component with your Redux's store.
// By doing so, it provides your store's dispatch function through a component's prop and also adds any
// properties you want to expose as part of your store's state.

// Using @connect, you'll turn a dumb component (https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0),
// into a smart component with very little code overhead.

// Please note also that you are not forced to use this ES7 decorator notation if you don't like it:
/*
  @somedecorator
  export default class MyClass {}

  // is the same as:

  class MyClass {}
  export default somedecorator(MyClass)

  // Using Redux's connect decorator, those are equivalent:
  let mapStateToProps = (state) => { ... }

  @connect(mapStateToProps)
  export default class MyClass {}

  // is the same as:

  class MyClass {}
  export default connect(mapStateToProps)(MyClass)
*/

import React from 'react'
import { connect } from 'react-redux'
// We use the same ES6 import trick to get all action creators and produce a hash like we did with
// our reducers. If you haven't yet, go get a look at our action creator (./action-creators.js).
import * as actionCreators from './action-creators'

// The "connect" decorator is designed to address all use-cases, from the most simple to the most
// complex ones. In the present example, we're not going to use the most complex form of 'connect' but
// you can find all information about it in the complete 'connect' API documentation here:
// https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

// Here is the complete 'connect' signature:
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

// We will only focus here on the first 'connect' parameter: mapStateToProps...

// The "connect" decorator takes, as its first parameter, a function that will select which slice of your
// state you want to expose to your component. This function is logically called a "selector" and
// receives 2 parameters: the state of your store and the current props of your component.
// The "mapStateToProps" name that we gave above is just a semantic name for our function that clearly
// expresses what the function does: it maps (read "extracts some of") the state to a few component props.
// The props of the component are provided to handle common cases like extracting a slice of your
// state depending on a prop value (Ex: state.items[props.someID]).
// The "selector" function is expected to return the props that you wish to expose to your component (usually via
// an object literal). It's up to you to eventually transform the state you're receiving before returning it.
// You can have a look right at that simplest 'connect' usage below.

@connect((state/*, props*/) => {
    // This is our select function that will extract from the state the data slice we want to expose
    // through props to our component.
    return {
      reduxState: state,
      frozen: state._time.frozen,
      time: state._time.time
    }
})
export default class Home extends React.Component {
  onTimeButtonClick (delay) {
    // This button handler will dispatch an action in response to a click event from a user.
    // We use here the dispatch function "automatically" provided by @connect in a prop.
    // There are alternative ways to call actionCreators that are already bound to dispatch and those
    // imply providing the second parameter to 'connect':
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
    // The "delay" value given to actionCreators.getTime is a delay to simulate an async work being done before we
    // are able to get the current time. Try to change this value to verify that the delay correctly impacts our UI.
    this.props.dispatch(actionCreators.getTime(delay))
  }
  render () {

    // Thanks to our @connect decorator, we're able to get the data previously selected through the props.
    var { frozen, time, reduxState } = this.props
    var attrs = {}
    const DELAY = 500 // in ms

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
        <br /> <br />
        <i>
          When clicking the button below, the time will be provided after a {DELAY}ms delay.<br />
          Try to change this value (in <b>src/home.jsx - line 95</b>) to verify that the delay given correctly impacts our UI.
        </i>
        <br />
        {/* We register our button "onClick" handler here: */}
        <button { ...attrs } onClick={() => this.onTimeButtonClick(DELAY)}>Get time!</button>
        <pre>
          redux state = { JSON.stringify(reduxState, null, 2) }
        </pre>
      </div>
    )
  }
}

// Go to ./12_final-words.js for our last advice about what to do now...
