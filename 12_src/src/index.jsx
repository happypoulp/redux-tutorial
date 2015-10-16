// Tutorial 12 - Provider-and-connect.js

// This file is the entry point of our JS bundle. It's here that we'll create our Redux store,
// instantiate our React Application root component and attach it to the DOM.

import React from 'react'
import { render } from 'react-dom'
// All store creation specific code is located in ./create-store.js
import createStore from './create-store'
// Application is the root component of our application and the one that holds Redux's Provider...
import Application from './application'

// Just as we did so many times in previous examples, we need to create our redux instance. This time
// all code for that task was moved to a specific module that returns a single function to trigger the
// instantiation.
const store = createStore()

// Now, time to render our application to the DOM using ReactDOM.render (or just render thanks to
// the ES6 notation: import { render } from 'react-dom')...
render(
  // ... and to provide our Redux store to our Root component as a prop so that Redux
  // Provider can do its job.
  <Application store={store} />,
  document.getElementById('app-wrapper')
)

// Go to ./create-store.js to review what you know now perfectly: "How to create a Redux store?"
