import React from 'react'
import Father from './father'

export default class GrandFather extends React.Component {
  render () {
    console.log('GrandFather::Render', JSON.stringify(this.props, null, 2))
    return (
      <div>
        Grand Father
        <Father />
      </div>
    )
  }
}

// Go to ./final-words.jsx for our last advice about what to do now...
