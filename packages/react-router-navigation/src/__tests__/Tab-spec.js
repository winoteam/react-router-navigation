import React from 'react'
import { Text } from 'react-native'
import { Router } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer'
import './__mocks__'
import Tab from './../Tab'

it('<Tab /> renders correctly', () => {
  const history = createHistory({
    initialEntries: ['/1'],
  })
  const component = renderer.create(
    <Router history={history}>
      <Tab path="/:id" render={({ match: { params } }) => <Text>{params.id}</Text>} />
    </Router>,
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
