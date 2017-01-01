import React, { PropTypes, Component, createElement } from 'react'
import { View } from 'react-native'
import { TestRouter, componentFactory, CardView } from './utils'
import CardStack from './../CardStack'
import MatchCard from './../MatchCard'
import renderer from 'react-test-renderer'

it('<CardStack /> renders correctly', () => {
  const component = renderer.create(
    <TestRouter>
      <CardStack render={CardView}>
        <MatchCard exactly pattern="/" component={componentFactory('Index')} />
        <MatchCard pattern="/hello" component={componentFactory('Hello')} />
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
        <MatchCard exactly pattern="/" component={componentFactory('Index')} />
        <MatchCard pattern="/hello" component={componentFactory('Hello')} />
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
        <MatchCard exactly pattern="/" component={componentFactory('Index')} />
        <MatchCard pattern="/hello" component={componentFactory('Hello')} />
        <MatchCard pattern="/goodbye" component={componentFactory('Goodbye')} />
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
        <MatchCard exactly pattern="/" component={componentFactory('Index')} />
        <MatchCard pattern="/hello" component={componentFactory('Hello')} />
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
        <MatchCard exactly pattern="/" component={componentFactory('Index')} />
        <MatchCard pattern="/hello" component={componentFactory('Hello')} />
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
        <MatchCard exactly pattern="/" component={componentFactory('Index')} />
        <MatchCard pattern="/hello" component={componentFactory('Hello')} />
        <MatchCard pattern="/goodbye" component={componentFactory('Goodbye')} />
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
        <MatchCard exactly pattern="/" component={componentFactory('Index')} />
        <MatchCard pattern="/hello" component={componentFactory('Hello')} />
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
          <MatchCard exactly pattern="/" component={componentFactory('Index')} />
          <MatchCard pattern="/hello" component={componentFactory('Hello')} />
          <MatchCard pattern="/goodbye" component={componentFactory('Goodbye')} />
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
    history.goBack(-9999999)
  })
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
