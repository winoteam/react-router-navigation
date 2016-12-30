import { View } from 'react-native'
import React, { PropTypes, Component, createElement } from 'react'
import { Match } from 'react-router'
import { TestRouter, componentFactory, CardView } from './utils'
import CardStack from './../CardStack'
import renderer from 'react-test-renderer'

it('<CardStack /> renders correctly', () => {
  const component = renderer.create(
    <TestRouter>
      <CardStack render={CardView}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
      </CardStack>
    </TestRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> renders correctly with initialIndex and initialEntries prop ', () => {
  const component = renderer.create(
    <TestRouter
      initialIndex={1}
      initialEntries={['/', '/hello', '/goodbye']}
    >
      <CardStack render={CardView}>
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
  const component = renderer.create(
    <TestRouter>
      <CardStack render={CardView}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
      </CardStack>
    </TestRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  tree.props.onPress((history) => history.push('/hello'))
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "pop" action is called', () => {
  const component = renderer.create(
    <TestRouter
      initialIndex={1}
      initialEntries={['/', '/hello']}
    >
      <CardStack render={CardView}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
      </CardStack>
    </TestRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  tree.props.onPress((history) => history.goBack())
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "replace" action is called', () => {
  const component = renderer.create(
    <TestRouter
      initialIndex={1}
      initialEntries={['/', '/hello']}
    >
      <CardStack render={CardView}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
        <Match pattern="/goodbye" component={componentFactory('Goodbye')} />
      </CardStack>
    </TestRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  tree.props.onPress((history) => history.replace('/goodbye'))
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when onNavigateBack() method is called', () => {
  const component = renderer.create(
    <TestRouter
      initialIndex={1}
      initialEntries={['/', '/hello']}
    >
      <CardStack render={({ navigationState, onNavigateBack, cards }) => {
        return (
          <View onPress={onNavigateBack}>
            {CardView({ navigationState, onNavigateBack, cards })}
          </View>
        )
      }}>
        <Match exactly pattern="/" component={componentFactory('Index')} />
        <Match pattern="/hello" component={componentFactory('Hello')} />
      </CardStack>
    </TestRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  tree.children[0].children[0].props.onPress()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
