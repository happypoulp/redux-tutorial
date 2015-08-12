import React from 'react'

export default class Child extends React.Component {
  render () {
    console.log('Child::Render', JSON.stringify(this.props, null, 2))
    return (
      <div>
        Child
      </div>
    )
  }
}

// Go to ./final-words.jsx for our last advice about what to do now...
