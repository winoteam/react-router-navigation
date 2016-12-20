import React from 'react'
import renderer from 'react-test-renderer'
import { Match } from 'react-router'
import TestRouter from './helpers/TestRouter'
import DefaultPager from './helpers/DefaultPager'
import componentFactory from './helpers/componentFactory'
import CardStack from './../CardStack'

it('<CardStack /> renders correctly', () => {
  const component = renderer.create(
    <TestRouter>
      <CardStack render={DefaultPager}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
      </CardStack>
    </TestRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> renders correctly with initialEntries prop ', () => {
  const component = renderer.create(
    <TestRouter
      initialIndex={1}
      initialEntries={['/', '/hello', '/goodbye']}
    >
      <CardStack render={DefaultPager}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
        <Match pattern="/goodbye" component={componentFactory('Goodbye')} />
      </CardStack>
    </TestRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "push" action is called', () => {
  // Create component
  const component = renderer.create(
    <TestRouter>
      <CardStack render={DefaultPager}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
      </CardStack>
    </TestRouter>
  )
  // Snapshot on initialization
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  // Push new route
  tree.props.onPress((history) => history.push('/hello'))
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "pop" action is called', () => {
  // Create component
  const component = renderer.create(
    <TestRouter
      initialIndex={1}
      initialEntries={['/', '/hello']}
    >
      <CardStack render={DefaultPager}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
      </CardStack>
    </TestRouter>
  )
  // Snapshot on initialization
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  // Pop
  tree.props.onPress((history) => history.goBack())
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
