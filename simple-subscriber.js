// Tutorial 1

// First things first, let's write a theoretical subscriber

var mySubscriber = function() {
    console.log('Something happened')
    // do something
}

// Simple isn't it?
// It's still not registered anywhere but soon it will be.

// And when called, it will do what it was designed for (here just a console.log)

mySubscriber()

// So far here is the flow of our application
// ActionCreator -> Action ... Subscriber

// Go to next tutorial: about-state-and-meet-redux.js
