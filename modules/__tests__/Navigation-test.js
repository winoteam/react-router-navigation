import './__mocks__'
import React from 'react'
import { View } from 'react-native'
import { Router, Route } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import { componentFactory } from './utils'
import Navigation from './../Navigation'
import renderer from 'react-test-renderer'

it('<Navigation /> renders correctly', () => {
  const history = createHistory()
  const component = renderer.create(
    <Router history={history}>
      <Navigation hideNavBar>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
      </Navigation>
    </Router>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Navigation /> renders correctly with initialIndex and initialEntries prop ', () => {
  const history = createHistory({
    initialIndex: 1,
    initialEntries: ['/', '/hello', '/goodbye'],
  })
  const component = renderer.create(
    <Router history={history}>
      <Navigation hideNavBar>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
        <Route path="/goodbye" render={componentFactory('Goodbye')} />
      </Navigation>
    </Router>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Navigation /> re-renders correctly when "push" action is called', () => {
  const history = createHistory()
  const component = renderer.create(
    <Router history={history}>
      <Navigation hideNavBar>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
      </Navigation>
    </Router>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.push('/hello')
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Navigation /> re-renders correctly when "goBack" action is called', () => {
  const history = createHistory({
    initialIndex: 1,
    initialEntries: ['/', '/hello'],
  })
  const component = renderer.create(
    <Router history={history}>
      <Navigation hideNavBar>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
      </Navigation>
    </Router>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.goBack()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Navigation /> re-renders correctly when "go" action is called', () => {
  const history = createHistory({
    initialIndex: 2,
    initialEntries: ['/', '/hello', '/goodbye'],
  })
  const component = renderer.create(
    <Router history={history}>
      <Navigation hideNavBar>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
        <Route path="/goodbye" render={componentFactory('Goodbye')} />
      </Navigation>
    </Router>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.go(-2)
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Navigation /> re-renders correctly when "replace" action is called', () => {
  const history = createHistory({
    initialIndex: 1,
    initialEntries: ['/', '/hello'],
  })
  const component = renderer.create(
    <Router history={history}>
      <Navigation hideNavBar>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
        <Route path="/goodbye" render={componentFactory('Goodbye')} />
      </Navigation>
    </Router>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.replace('/goodbye')
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
