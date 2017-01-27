import React, { PropTypes, Component, createElement } from 'react'
import { View, Text } from 'react-native'
import { StaticRouter } from 'react-router'
import { createMemoryHistory } from 'history'
import { getCurrentCard } from './../utils'

export const componentFactory = (message) => ({ params }) => {
  if (params && params.id) {
    return <Text>{params.id}</Text>
  }
  return <Text>{message}</Text>
}

export class History extends Component {
  static childContextTypes = {
    history: PropTypes.object.isRequired,
  }
  getChildContext() {
    return { history: this.history }
  }
  componentWillMount() {
    this.history = this.props.history
    this.unlisten = this.history.listen(() => this.forceUpdate())
  }
  componentWillUnmount() {
    this.unlisten()
  }
  render() {
    const history = this.history
    const { location, action } = history
    return this.props.children({
      history,
      location,
      action,
    })
  }
}

export class TestRouter extends Component {
  state = { key: 0 }
  componentWillMount() {
    this.history = createMemoryHistory(this.props)
  }
  onPress = (callback) => {
    callback(this.history, (newState) => this.setState(newState))
  }
  render() {
    return (
      <View onPress={this.onPress}>
        <History
          {...this.props}
          history={this.history}
        >
          {({ history, action, location }) => (
            <StaticRouter
              {...this.props}
              children={typeof this.props.children === 'function'
                ? this.props.children(this.state)
                : this.props.children
              }
              action={action}
              location={location}
              onPush={history.push}
              onReplace={history.replace}
              blockTransitions={history.block}
            />
          )}
        </History>
      </View>
    )
  }
}

export const CardView = ({ navigationState, cards }) => {
  const route = navigationState.routes[navigationState.index]
  const currentCard = getCurrentCard(route, cards)
  return createElement(
    currentCard.component || currentCard.children,
    { key: route.key },
  )
}

export const TabView = ({ navigationState, tabs }) => {
  const currentTab = tabs.find((tab) => {
    const currentRoute = navigationState.routes[navigationState.index]
    return tab.key === currentRoute.key
  })
  return createElement(currentTab.component)
}
