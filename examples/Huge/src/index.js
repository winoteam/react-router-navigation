import React from 'react'
import { MemoryRouter } from 'react-router'
import App from './bundles'

const Huge = () => (
  <MemoryRouter initialEntries={['/app/feed']}>
    <App />
  </MemoryRouter>
)

export default Huge
