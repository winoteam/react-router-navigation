import React from 'react'
import { Text } from 'react-native'
import { Router, Route } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer'
import * as StackUtils from './../StackUtils'

const { build, shouldUpdate, get, getRoute, createKey } = StackUtils

describe('build util', () => {
  it('works correctly', () => {
    const children = [
      <Route
        path="hey"
        render={function() {
          return null
        }}
      />,
      <Route
        path="hello"
        component={function() {
          return null
        }}
        title="Hello"
      />,
    ]
    const results = [
      {
        path: 'hey',
        key: 'hey',
      },
      {
        path: 'hello',
        key: 'hello',
        title: 'Hello',
      },
    ]
    expect(build(children)).toMatchObject(results)
    expect(typeof build(children)[0].render).toBe('function')
    expect(typeof build(children)[1].component).toBe('function')
  })

  it('creates correctly render method', () => {
    const children = [
      <Route path="/" render={({ location }) => <Text>{location.pathname}</Text>} />,
    ]
    const stack = build(children)
    const history = createHistory()
    const component = renderer.create(
      <Router history={history}>{stack[0].render()}</Router>,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('shouldUpdate util', () => {
  it('returns true when paths are different', () => {
    const currentCard = { path: '/foo' }
    const nextCard = { path: '/bar' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/foo'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/foo', '/bar'],
    })
    const input = shouldUpdate(
      currentCard,
      nextCard,
      currentRouterHistory.location,
      nextRouterHistory.location,
    )
    expect(input).toBeTruthy()
  })
  it('returns false when paths are equal', () => {
    const currentCard = { path: '/foo' }
    const nextCard = { path: '/foo' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/foo'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 0,
      initialEntries: ['/foo'],
    })
    const input = shouldUpdate(
      currentCard,
      nextCard,
      currentRouterHistory.location,
      nextRouterHistory.location,
    )
    expect(input).toBeFalsy()
  })
  it('returns true when paths (with params) are equal and pathnames are different (1)', () => {
    const currentCard = { path: '/article/:id' }
    const nextCard = { path: '/article/:id' }
    const currentRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/article/1', '/article/2'],
    })
    const nextRouterHistory = createHistory({
      initialEntries: ['/article/1', '/article/2'],
    })
    const input = shouldUpdate(
      currentCard,
      nextCard,
      currentRouterHistory.location,
      nextRouterHistory.location,
    )
    expect(input).toBeTruthy()
  })
  it('returns true when paths (with params) are equal and pathnames are different (2)', () => {
    const currentCard = { path: '/article/:id' }
    const nextCard = { path: '/article/:id' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/article/1'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/article/1', '/article/2'],
    })
    const input = shouldUpdate(
      currentCard,
      nextCard,
      currentRouterHistory.location,
      nextRouterHistory.location,
    )
    expect(input).toBeTruthy()
  })
  it('returns false when paths (without params) are equal and pathname are different', () => {
    const currentCard = { path: '/app' }
    const nextCard = { path: '/app' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/app'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/app', '/app/article'],
    })
    const input = shouldUpdate(
      currentCard,
      nextCard,
      currentRouterHistory.location,
      nextRouterHistory.location,
    )
    expect(input).toBeFalsy()
  })
})

describe('get util', () => {
  it('works correctly', () => {
    const route = { key: '/index@@h9208990', routeName: '/index' }
    const currentCard = {
      key: '/index',
      routeName: '/index',
      title: 'Index',
    }
    const cards = [
      {
        key: '/',
        title: 'Root',
      },
      currentCard,
    ]
    expect(get(cards, route)).toEqual(currentCard)
  })
})

describe('getRoute util', () => {
  it('works correctly', () => {
    const stack = [{ key: '/foo', path: '/foo' }, { key: '/bar', path: '/bar' }]
    const history = createHistory({ initialEntries: ['/bar'] })
    expect(getRoute(stack, history.location).routeName).toEqual('/bar')
  })
})

describe('createKey util', () => {
  it('createKey() works correctly', () => {
    const key = createKey({ key: '/foo' })
    expect(key.slice(0, 4)).toEqual('/foo')
  })
})
