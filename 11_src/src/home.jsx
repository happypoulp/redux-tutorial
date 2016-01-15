// Tutorial 12 - Provider-and-connect.js

// Our tutorial is almost over and the only missing piece to leave you with a good overview of Redux is:
// How do we read from our store's state and how do we dispatch actions?

// Both of these questions can be answered using a single react-redux's binding: connect.

// As we previously explained, when using the Provider component we allow all components of our app to
// access Redux. But this access can only be made through the undocumented feature "React's context". To
// avoid asking you to use such a "dark" React API, React-Redux is exposing a function that you can use
// on a component class.

// The function we're talking about is "connect" and it allows to literally connect your component with your Redux's store.
// By doing so, it provides your store's dispatch function through a component's prop and also adds any
// properties you want to expose as part of your store's state.

// Using "connect", you'll turn a dumb component into a smart component with very little code overhead
// (https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

// "connect" is a function that takes as parameters few mapping functions and that returns a function expecting
// the actual component class you want to connect. Such a function (connect) is called a Higher Order Component (HOC).
// Higher Order functions comes from a functional pattern designed to add features / behaviors to
// their inputs (component, store, ...) without using inheritance. This approach favors composition over inheritance
// which is the prefered way to build React applications (actually this is not limited at all to React applications).
// Read more about HOCs and composition here:
// - https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.lpp7we7mx
// - http://natpryce.com/articles/000814.html

// The "connect" HOC is designed to address all use-cases, from the most simple to the most
// complex ones. In the present example, we're not going to use the most complex form of 'connect' but
// you can find all information about it in the complete 'connect' API documentation here:
// https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

// Here is the complete 'connect' signature:
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// and here is how you're supposed to use it:
/*
  const wrappedComponentClass = connect(...)(ComponentClass)
*/

// We will only focus here on the first 'connect' parameter: mapStateToProps...

// "connect" takes, as its first parameter, a function that will select which slice of your
// state you want to expose to your component. This function is logically called a "selector" and
// receives 2 parameters: the state of your store and the current props of your component.
// You'll see below that we named this function "mapStateToProps". This name is just a semantic name
// for our function that clearly expresses what the function does: it maps (read "extracts some of")
//  the state to a few component props.
// The props of the component are also provided as arguments to handle common cases like extracting a slice of your
// state depending on a prop value (Ex: state.items[props.someID]).
// "mapStateToProps" is expected to return the props that you wish to expose to your component (usually via
// an object literal). It's up to you to eventually transform the state you're receiving before returning it.
// You can have a look right at that simplest 'connect' usage below (just after the component class definition).

import React from 'react'
import { connect } from 'react-redux'
// We use the same ES6 import trick to get all action creators and produce a hash like we did with
// our reducers. If you haven't yet, go get a look at our action creator (./action-creators.js).
import * as actionCreators from './action-creators'

class Home extends React.Component {
  onTimeButtonClick (delay) {
    // This button handler will dispatch an action in response to a click event from a user.
    // We use here the dispatch function "automatically" provided by connect in a prop.
    // There are alternative ways to call actionCreators that are already bound to dispatch and those
    // imply providing the second parameter to 'connect':
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
    // The "delay" value given to actionCreators.getTime is a delay to simulate an async work being done before we
    // are able to get the current time. Try to change this value to verify that the delay correctly impacts our UI.
    this.props.dispatch(actionCreators.getTime(delay))
  }
  render () {

    // Thanks to "connect", we're able to get specific selected data, through the props.
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
        <h1>Provider and connect example</h1>
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

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    frozen: state._time.frozen,
    time: state._time.time,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}

const ConnectedHome = connect(mapStateToProps)(Home)

export default ConnectedHome

// You might have noticed that thanks to redux, while we have a dynamic component that requires some state (to keep
// the current time), this state is by no mean present inside the component. Our component only receives props with
// needed data.
// What we have here is called a stateless component. You should always try to have more stateless components (presented
// above as dumb components) in your applications than stateful ones because they are much more reusable.
// As suggested in "onTimeButtonClick" handler, we could even go further by passing our click callback as a prop
// via "connect" second parameter "mapDispatchToProps". Doing so, we would extract our button behavior outside of
// our component, making it even more reusable by allowing for a different click behavior.
// Reusability might seem like a fancy overused concept but what having a reusable component also means, is that it's
// one component that can be very easily tested (because you can then inject in your component whatever data and
// test handlers you want and easily ensure its correct behavior).

// Before going to ./12_final-words.js, read this side-note about an alternative way to use "connect" HOC...

// Because connect(...) returns a function that accept a class and returns another class, you can use it as
// an ES7 decorator if you want to. Decorators are an experimental ES7 features that make it possible to annotate
// and modify classes and properties at design time (https://github.com/wycats/javascript-decorators).

// This feature being experimental, it is subject to change and breakage. This means that by using it today, you must be
// fully aware of and accept the uncertainty regarding its evolution. Decorators provide syntax sugar to write the
// code above slightly differently. Instead of writing:

/*
  class MyClass {}
  export default somedecorator(MyClass)
*/

// You can write:

/*
  @somedecorator
  export default class MyClass {}
*/

// Applying this syntax to redux connect, you can replace:

/*
  let mapStateToProps = (state) => { ... }
  class MyClass {}
  export default connect(mapStateToProps)(MyClass)
*/

// by:

/*
  let mapStateToProps = (state) => { ... }
  @connect(mapStateToProps)
  export default class MyClass {}
*/

// As you can see the application of the HOC function on the component class is now made implicit ( @connect(mapStateToProps) )
// instead of calling it ourselves ( @connect(mapStateToProps)(Myclass) ). Some find this approach more elegant, others
// dislike the fact that it's hiding what is really happening and many just don't get how decorators works. Knowing all that
// and remembering that decorators are still experimental, you can now decide by youselves which "connect" usage you
// prefer and you won't be suprised to find both syntax in the many articles, tutorials, starter kits, etc. out there.

// Go to ./12_final-words.js for our last advice about what to do now...
