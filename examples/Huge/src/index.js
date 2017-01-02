import React from 'react'
import { MemoryRouter } from 'react-router'
import Root from './Root'

const Huge = () => (
  <MemoryRouter initialEntries={['/app']}>
    <Root />
  </MemoryRouter>
)

export default Huge
