import React from 'react'
import { MemoryRouter } from 'react-router'
import Root from './Root'

const Huge = () => (
  <MemoryRouter initialEntries={['/launch']}>
    <Root />
  </MemoryRouter>
)

export default Huge
