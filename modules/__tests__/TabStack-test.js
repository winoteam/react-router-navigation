import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { Match, Redirect, Miss } from 'react-router'
import { TestRouter, componentFactory, TabView } from './utils'
import TabStack from './../TabStack'
import MatchTab from './../MatchTab'
import renderer from 'react-test-renderer'

it('<TabStack /> renders correctly', () => {
  const component = renderer.create(
    <TestRouter>
      <TabStack render={TabView}>
        <MatchTab exactly pattern="/" component={componentFactory('Index')} />
        <MatchTab pattern="/hello" component={componentFactory('Hello')} />
        <MatchTab pattern="/goodbye" component={componentFactory('Goodbye')} />
      </TabStack>
    </TestRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<TabStack /> renders correctly by ignoring non <Match /> component', () => {
  const component = renderer.create(
    <TestRouter>
      <TabStack render={TabView}>
        <View pattern="/" />
        <MatchTab exactly pattern="/" component={componentFactory('Index')} />
        <MatchTab pattern="/hello" component={componentFactory('Hello')} />
      </TabStack>
    </TestRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<TabStack /> renders correctly with initialEntries prop ', () => {
  const component = renderer.create(
    <TestRouter initialEntries={['/hello']}>
      <TabStack render={TabView}>
        <MatchTab exactly pattern="/" component={componentFactory('Index')} />
        <MatchTab pattern="/hello" component={componentFactory('Hello')} />
        <MatchTab pattern="/goodbye" component={componentFactory('Goodbye')} />
      </TabStack>
    </TestRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<TabStack /> re-renders correctly when "replace" action is called', () => {
  const component = renderer.create(
    <TestRouter>
      <TabStack render={TabView}>
        <MatchTab exactly pattern="/" component={componentFactory('Index')} />
        <MatchTab pattern="/hello" component={componentFactory('Hello')} />
        <MatchTab pattern="/goodbye" component={componentFactory('Goodbye')} />
      </TabStack>
    </TestRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  tree.props.onPress((history) => history.replace('/hello'))
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<TabStack /> re-renders correctly when onRequestChangeTab() method is called', () => {
  const component = renderer.create(
    <TestRouter>
      <TabStack render={TabView}>
        <MatchTab exactly pattern="/" component={componentFactory('Index')} />
        <MatchTab pattern="/hello" component={componentFactory('Hello')} />
        <MatchTab pattern="/goodbye" component={componentFactory('Goodbye')} />
      </TabStack>
    </TestRouter>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  tree.children[0].props.onRequestChangeTab(2)
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('<TabStack /> renders correctly with <Redirect />', () => {
  const component = renderer.create(
    <TestRouter>
      <View>
        <Match exactly pattern="/" render={() => <Redirect to="/one" />} />
        <Miss render={() => (
          <TabStack render={TabView}>
            <MatchTab pattern="/one" component={componentFactory('One')} />
            <MatchTab pattern="/two" component={componentFactory('Two')} />
            <MatchTab pattern="/three" component={componentFactory('Three')} />
          </TabStack>
        )} />
      </View>
    </TestRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
