// Tutorial 12 - Provider-and-connect.js

import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './action-creators'

@connect(state => {
    return {
      reduxState: state,
      frozen: state._time.frozen,
      time: state._time.time
    }
})
export default class Home extends React.Component {
  onTimeButtonClick () {
    this.props.dispatch(actionCreators.getTime())
  }
  render () {

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
          <b>What time is it?</b> { time ? `It\'s currently ${time}` : 'No idea yet...' }
        </span>
        <br />
        <button { ...attrs } onClick={::this.onTimeButtonClick}>Get time!</button>
        <pre>
          redux state = { JSON.stringify(reduxState, null, 2) }
        </pre>
      </div>
    )
  }
}
