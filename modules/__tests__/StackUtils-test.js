import React, { createElement, cloneElement } from 'react'
import { Text } from 'react-native'
import { Router, Route } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer'
import StackUtils from './../StackUtils'

const { build, shouldUpdate, get, getRoute, createKey } = StackUtils

describe('StackUtils.build() util', () => {
  it('build() works correctly', () => {
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
      path: 'hey',
      key: 'hey',
      render: () => nulll,
    }, {
      path: 'hello',
      key: 'hello',
      component: () => null,
      title: 'Hello',
    }]
    expect(JSON.stringify(build(children))).toEqual(JSON.stringify(results))
  })

  it('build() creates correctly render method', () => {
    const children = [
      <Route
        path="/"
        render={({ path }) => <Text>{path}</Text>}
      />
    ]
    const stack = build(children)
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

describe('StackUtils.shouldUpdate() util', () => {
  it('shouldUpdate() returns true when paths are different', () => {
    const currentCard = { path: '/foo' }
    const nextCard = { path: '/bar' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/foo'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/foo', '/bar'],
    })
    const input = shouldUpdate(currentCard, nextCard, currentRouterHistory, nextRouterHistory)
    expect(input).toBeTruthy()
  })
  it('shouldUpdate() returns false when paths are equal', () => {
    const currentCard = { path: '/foo' }
    const nextCard = { path: '/foo' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/foo'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 0,
      initialEntries: ['/foo'],
    })
    const input = shouldUpdate(currentCard, nextCard, currentRouterHistory, nextRouterHistory)
    expect(input).toBeFalsy()
  })
  it('shouldUpdate() returns true when paths (with params) are equal and pathnames are different (1)', () => {
    const currentCard = { path: '/article/:id' }
    const nextCard = { path: '/article/:id' }
    const currentRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/article/1', '/article/2'],
    })
    const nextRouterHistory = createHistory({
      initialEntries: ['/article/1', '/article/2'],
    })
    const input = shouldUpdate(currentCard, nextCard, currentRouterHistory, nextRouterHistory)
    expect(input).toBeTruthy()
  })
  it('shouldUpdate() returns true when paths (with params) are equal and pathnames are different (2)', () => {
    const currentCard = { path: '/article/:id' }
    const nextCard = { path: '/article/:id' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/article1'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/article/1', '/article/2'],
    })
    const input = shouldUpdate(currentCard, nextCard, currentRouterHistory, nextRouterHistory)
    expect(input).toBeTruthy()
  })
  it('shouldUpdate() returns false when paths (without params) are equal and pathname are different', () => {
    const currentCard = { path: '/app' }
    const nextCard = { path: '/app' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/app'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/app', '/app/article'],
    })
    const input = shouldUpdate(currentCard, nextCard, currentRouterHistory, nextRouterHistory)
    expect(input).toBeFalsy()
  })
})

describe('StackUtils.get() util', () => {
  it('get() works correctly', () => {
    const route = { key: '/index@@h9208990', routeName: '/index' }
    const currentCard = {
      key: '/index',
      title: 'Index',
    }
    const cards = [{
      key: '/',
      title: 'Root',
    }, currentCard]
    expect(get(cards, route)).toEqual(currentCard)
  })
})

describe('StackUtils.getRoute() util', () => {
  it('getRoute() works correctly', () => {
    const stack = [{ key: '/foo', path: '/foo' }, { key: '/bar', path: '/bar' }]
    const history = createHistory({ initialEntries: ['/bar'] })
    const currentRoute = { key: '/bar', routeName: '/bar' }
    expect(getRoute(stack, history.location)).toEqual(currentRoute)
  })
})

describe('StackUtils.createKey() util', () => {
  it('createKey() works correctly', () => {
    const key = createKey({ key: '/foo' })
    expect(key.slice(0, 4)).toEqual('/foo')
  })
})
