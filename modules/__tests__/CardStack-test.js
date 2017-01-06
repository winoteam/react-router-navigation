import React, { PropTypes, Component, createElement } from 'react'
import { View } from 'react-native'
import { Match } from 'react-router'
import { TestRouter, componentFactory, CardView } from './helpers'
import CardStack from './../CardStack'
import MatchCard from './../MatchCard'
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

it('<CardStack /> renders correctly by ignoring non <Match /> component', () => {
  const component = renderer.create(
    <TestRouter>
      <CardStack render={CardView}>
        <View pattern="/" />
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

it('<CardStack /> re-renders correctly when "push" action is called with same pattern', () => {
  const component = renderer.create(
    <TestRouter initialEntries={['/article/1']}>
      <CardStack render={CardView}>
        <MatchCard pattern="/article/:id" component={componentFactory('Article')} />
      </CardStack>
    </TestRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  tree.props.onPress((history) => history.push('/article/2'))
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<CardStack /> re-renders correctly when "goBack" action is called', () => {
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

it('<CardStack /> re-renders correctly when "go" action is called', () => {
  const component = renderer.create(
    <TestRouter
      initialIndex={2}
      initialEntries={['/', '/hello', '/goodbye']}
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
  tree.props.onPress((history) => history.go(-2))
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
      <CardStack render={({ navigationState, onNavigateBack, cards }) => (
        <View onPress={onNavigateBack}>
          {CardView({ navigationState, onNavigateBack, cards })}
        </View>
      )}>
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

it('<CardStack /> re-renders correctly after unmount/reset', () => {
  const component = renderer.create(
    <TestRouter
      initialIndex={1}
      initialEntries={['/', '/hello']}
    >
      {({ key }) => (
        // Unmount and remount <CardStack /> with key update
        <CardStack key={key} render={CardView}>
          <Match exactly pattern="/" component={componentFactory('Index')} />
          <Match pattern="/hello" component={componentFactory('Hello')} />
          <Match pattern="/goodbye" component={componentFactory('Goodbye')} />
        </CardStack>
      )}
    </TestRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  tree.props.onPress((history) => history.push('/goodbye'))
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  // Reset <CardStack /> and history :
  tree.props.onPress((history, setState) => {
    setState({ key: 1 })
    history.goBack(0)
  })
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
