import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider, Layout } from '@shopify/polaris'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <AppProvider>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </AppProvider>,
  document.getElementById('root'),
)
registerServiceWorker()
