import React, { PropTypes, Component, createElement } from 'react'
import { View, Text } from 'react-native'
import { Match, StaticRouter } from 'react-router'
import { createMemoryHistory } from 'history'

export const componentFactory = (message) => () => (
  <Text>{message}</Text>
)

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
  componentWillMount() {
    this.history = createMemoryHistory(this.props)
  }
  onPress = (callback) => {
    callback(this.history)
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
  const currentCard = cards.find((card) => {
    const currentRoute = navigationState.routes[navigationState.index]
    return card.key === currentRoute.key
  })
  return createElement(currentCard.component)
}

export const TabView = ({ navigationState, tabs }) => {
  const currentTab = tabs.find((tab) => {
    const currentRoute = navigationState.routes[navigationState.index]
    return tab.key === currentRoute.key
  })
  return createElement(currentTab.component)
}
