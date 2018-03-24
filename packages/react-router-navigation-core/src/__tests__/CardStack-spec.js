/* eslint new-cap: 0 */

import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Router, Route } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer'
import { componentFactory, renderCardView } from './utils'
import CardStack from './../CardStack'
import './__mocks__'

it('<CardStack /> renders correctly', () => {
  const history = createHistory()
  const component = renderer.create(
    <Router history={history}>
      <CardStack render={renderCardView}>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
      </CardStack>
    </Router>,
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> renders correctly with initialIndex and initialEntries prop ', () => {
  const history = createHistory({
    initialIndex: 1,
    initialEntries: ['/', '/hello', '/goodbye'],
  })
  const component = renderer.create(
    <Router history={history}>
      <CardStack render={renderCardView}>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
        <Route path="/goodbye" render={componentFactory('Goodbye')} />
      </CardStack>
    </Router>,
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "push" action is called', () => {
  const history = createHistory()
  const component = renderer.create(
    <Router history={history}>
      <CardStack render={renderCardView}>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
      </CardStack>
    </Router>,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.push('/hello')
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "push" action is called with same path', () => {
  const history = createHistory({
    initialEntries: ['/article/1'],
  })
  const component = renderer.create(
    <Router history={history}>
      <CardStack render={renderCardView}>
        <Route path="/article/:id" render={componentFactory()} />
      </CardStack>
    </Router>,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.push('/article/2')
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "goBack" action is called', () => {
  const history = createHistory({
    initialIndex: 1,
    initialEntries: ['/', '/hello'],
  })
  const component = renderer.create(
    <Router history={history}>
      <CardStack render={renderCardView}>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
      </CardStack>
    </Router>,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.goBack()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "goBack" action is called with same path', () => {
  const history = createHistory({
    initialIndex: 1,
    initialEntries: ['/article/1', '/article/2'],
  })
  const component = renderer.create(
    <Router history={history}>
      <CardStack render={renderCardView}>
        <Route path="/article/:id" render={componentFactory()} />
      </CardStack>
    </Router>,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.goBack()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "go" action is called', () => {
  const history = createHistory({
    initialIndex: 2,
    initialEntries: ['/', '/hello', '/goodbye'],
  })
  const component = renderer.create(
    <Router history={history}>
      <CardStack render={renderCardView}>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
        <Route path="/goodbye" render={componentFactory('Goodbye')} />
      </CardStack>
    </Router>,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.go(-2)
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "go" action is called with same path', () => {
  const history = createHistory({
    initialIndex: 2,
    initialEntries: ['/article/1', '/article/2', '/article/3'],
  })
  const component = renderer.create(
    <Router history={history}>
      <CardStack render={renderCardView}>
        <Route path="/article/:id" render={componentFactory('Article')} />
      </CardStack>
    </Router>,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.go(-2)
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "replace" action is called', () => {
  const history = createHistory({
    initialIndex: 1,
    initialEntries: ['/', '/hello'],
  })
  const component = renderer.create(
    <Router history={history}>
      <CardStack render={renderCardView}>
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
        <Route path="/goodbye" render={componentFactory('Goodbye')} />
      </CardStack>
    </Router>,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  history.replace('/goodbye')
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when onNavigateBack() method is called', () => {
  const history = createHistory({
    initialIndex: 1,
    initialEntries: ['/', '/hello'],
  })
  const component = renderer.create(
    <Router history={history}>
      <CardStack
        render={({ navigationState, onNavigateBack, cards }) => (
          <TouchableOpacity onPress={onNavigateBack}>
            {renderCardView({ navigationState, onNavigateBack, cards })}
          </TouchableOpacity>
        )}
      >
        <Route exact path="/" render={componentFactory('Index')} />
        <Route path="/hello" render={componentFactory('Hello')} />
      </CardStack>
    </Router>,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  tree.props.onPress()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
