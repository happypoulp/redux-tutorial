import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

var reducers = {
    connect (state = {}, action) {
      console.log('reducers.connect(), action received: state', state, 'action', action)
      switch (action.type) {
        case 'CONNECT':
          return {
            ...state,
            logged: true
          }
        default: return state
      }
    },
    profile (state = {}, action) {
      console.log('reducers.profile(), action received: state', state, 'action', action)
      switch (action.type) {
        case 'PROFILE':
          return {
            ...state,
            description: 'test desc'
          }
        default: return state
      }
    }
}

var actionCreators = {
    connect() {
      console.log("\n", 'actionCreators.connect()', "\n")
      return { type: 'CONNECT' }
    },
    getProfileData() {
      console.log("\n", 'actionCreators.getProfileData()', "\n")
      return { type: 'PROFILE' }
    },
    aLastAction() {
      console.log("\n", 'actionCreators.aLastAction()', "\n")
      return { type: 'ANOTHER_ACTION' }
    }
}

const reducer = combineReducers(reducers)
// const finalCreateStore = applyMiddleware()(createStore);
// const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = createStore(reducer);
// const store = finalCreateStore(reducer);
var fetchedProfileData = false

store.subscribe(() => {
  console.log('SIMPLE REDUX SUBSCRIBER - connectStore:', store.getState().connect)
  if (store.getState().connect.logged) {
    if (!fetchedProfileData) {
      fetchedProfileData = true
      store.dispatch(actionCreators.getProfileData())
    }
  }
})

store.dispatch(actionCreators.connect())

setTimeout(() => { store.dispatch(actionCreators.aLastAction()) }, 500)
