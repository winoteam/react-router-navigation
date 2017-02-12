import React from 'react'
import { Provider } from 'react-redux'
import Router from '@helpers/Router'
import Root from '@app/Root'
import store from '@store'

const Huge = () => (
  <Provider store={store}>
    <Router initialEntries={['/app/feed']}>
      <Root />
    </Router>
  </Provider>
)

export default Huge
