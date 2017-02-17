import './mocks'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Router, Switch, Route } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer'
import { TestRouter, componentFactory, TabView } from './utils'
import TabStack from './../TabStack'

it('<TabStack /> renders correctly', () => {
  const history = createHistory()
  const component = renderer.create(
    <Router history={history}>
      <TabStack render={TabView}>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
        <Route path="/goodbye" render={componentFactory('Goodbye')} />
      </TabStack>
    </Router>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<TabStack /> renders correctly with initialEntries prop ', () => {
  const history = createHistory({ initialEntries: ['/hello'] })
  const component = renderer.create(
    <Router history={history}>
      <TabStack render={TabView}>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
        <Route path="/goodbye" render={componentFactory('Goodbye')} />
      </TabStack>
    </Router>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<TabStack /> re-renders correctly when "replace" action is called', () => {
  const history = createHistory()
  const component = renderer.create(
    <Router history={history}>
      <TabStack render={TabView}>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
        <Route path="/goodbye" render={componentFactory('Goodbye')} />
      </TabStack>
    </Router>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.replace('/hello')
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<TabStack /> re-renders correctly when onRequestChangeTab() method is called', () => {
  const history = createHistory()
  const component = renderer.create(
    <Router history={history}>
      <TabStack render={({ navigationState, onRequestChangeTab, tabs }) => (
        <TouchableOpacity onPress={onRequestChangeTab}>
          {TabView({ navigationState, onRequestChangeTab, tabs })}
        </TouchableOpacity>
      )}>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
        <Route path="/goodbye" render={componentFactory('Goodbye')} />
      </TabStack>
    </Router>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  tree.props.onPress(2)
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
