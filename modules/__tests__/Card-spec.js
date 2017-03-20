import React from 'react'
import { Text } from 'react-native'
import { Router } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer'
import './__mocks__'
import Card from './../Card'

it('<Card /> renders correctly', () => {
  const history = createHistory({
    initialEntries: ['/1'],
  })
  const component = renderer.create(
    <Router history={history}>
      <Card
        path="/:id"
        render={({ match: { params } }) => (
          <Text>{params.id}</Text>
        )}
      />
    </Router>,
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Card /> renders correctly with staticMatch prop when route doesn\'t match', () => {
  const history = createHistory({
    initialEntries: ['/foo/1'],
  })
  const component = renderer.create(
    <Router history={history}>
      <Card
        path="/foo/:id"
        render={({ staticMatch: { params } }) => (
          <Text>{params.id}</Text>
        )}
      />
    </Router>,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.push('/bar')
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
