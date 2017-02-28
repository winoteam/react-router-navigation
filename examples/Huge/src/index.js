import React from 'react'
import { Provider } from 'react-redux'
import Router from '@helpers/Router'
import App from '@app'
import store from '@store'

const Huge = () => (
  <Provider store={store}>
    <Router initialEntries={['/app/feed']}>
      <App />
    </Router>
  </Provider>
)

export default Huge
