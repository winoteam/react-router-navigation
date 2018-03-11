/* @flow */

import * as React from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import { Switch, Route, Redirect } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import App from './App'

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
  },
})

const history = createHistory()
const historyMiddleware = routerMiddleware(history)
const loggerMiddleware = () => next => action => {
  if (action && action.type === '@@router/LOCATION_CHANGE') {
    console.log(history.entries.map(({ pathname }) => pathname))
  }
  if (action) next(action)
}

const store = createStore(
  combineReducers({ router: routerReducer }),
  applyMiddleware(historyMiddleware, loggerMiddleware),
)

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/feed" />} />
          <Route
            path="/"
            render={() => (
              <View style={styles.tabs}>
                <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
                <App history={history} />
              </View>
            )}
          />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
