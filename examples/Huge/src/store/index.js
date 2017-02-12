/* eslint no-console: 0 */

import { createStore, combineReducers } from 'redux'
import history from './history'

// Create store
const reducer = combineReducers({ history })
const store = createStore(reducer)

// Logger
store.subscribe(() => {
  const { history: { index, entries } } = store.getState()
  const pathnames = entries.slice(0, index + 1).map(({ pathname }) => pathname)
  console.log(pathnames)
})

export default store
