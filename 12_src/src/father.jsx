import React from 'react'
import Child from './child'
import { connect } from 'react-redux'

// @connect(state => {
//   console.log('Father::@connect')
//   return {}
//   // return state
// })
export default class Father extends React.Component {
  render () {
    console.log('Father::Render', JSON.stringify(this.props, null, 2))
    return (
      <div>
        Father
        <Child />
      </div>
    )
  }
}

// Go to ./final-words.jsx for our last advice about what to do now...
