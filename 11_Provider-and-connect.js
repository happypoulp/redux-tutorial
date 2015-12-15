// Tutorial 11 - Provider-and-connect.js

// This is the final tutorial and the one that will show you how to bind together Redux and React.

// To run this example, you will need a browser.

// All explanations for this example are inlined in the sources inside ./11_src/src/.

// Once you've read the lines below, start with 11_src/src/server.js.

// To build our React application and serve it to a browser, we'll use:
// - A very simple node HTTP server (https://nodejs.org/api/http.html)
// - The awesome Webpack (http://webpack.github.io/) to bundle our application,
// - The magic Webpack Dev Server (http://webpack.github.io/docs/webpack-dev-server.html)
//     to serve JS files from a dedicated node server that allows for files watch
// - The incredible React Hot Loader http://gaearon.github.io/react-hot-loader/ (another awesome
//     project of Dan Abramov - just in case, he is Redux's author) to have a crazy
//     DX (Developer experience) by having our components live-reload in the browser
//     while we're tweaking them in our code editor.

// An important point for those of you who are already using React: this application is built
// upon React 0.14.

// I won't detail Webpack Dev Server and React Hot Loader setup here since it's done pretty
// well in React Hot Loader's docs.
import webpackDevServer from './11_src/src/webpack-dev-server'
// We request the main server of our app to start it from this file.
import server from './11_src/src/server'

// Change the port below if port 5050 is already in use for you.
// if port equals X, we'll use X for server's port and X+1 for webpack-dev-server's port
const port = 5050

// Start our webpack dev server...
webpackDevServer.listen(port)
// ... and our main app server.
server.listen(port)

console.log(`Server is listening on http://127.0.0.1:${port}`)

// Go to 11_src/src/server.js...

// Go to next tutorial: 12_final-words.js
