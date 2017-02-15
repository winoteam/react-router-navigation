import React, { createElement, cloneElement } from 'react'
import { Text } from 'react-native'
import { Router, Route } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer'
import buildStack from './../buildStack'

describe('buildStack() util', () => {
  it('buildStack() works correctly', () => {
    const children = [
      <Route
        path="hey"
        render={() => null}
      />,
      <Route
        path="hello"
        component={() => null}
        title="Hello"
      />
    ]
    const results = [{
      key: 'hey',
      path: 'hey',
      render: () => nulll,
    }, {
      key: 'hello',
      path: 'hello',
      component: () => null,
      title: 'Hello',
    }]
    expect(JSON.stringify(buildStack(children))).toEqual(JSON.stringify(results))
  })

  it('buildStack() creates correctly render method', () => {
    const children = [
      <Route
        path="/"
        render={({ path }) => <Text>{path}</Text>}
      />
    ]
    const stack = buildStack(children)
    const history = createHistory()
    const component = renderer.create(
      <Router history={history}>
        {stack[0].render()}
      </Router>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
