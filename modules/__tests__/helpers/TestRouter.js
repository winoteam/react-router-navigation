/* eslint react/no-multi-comp: 0 */

import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { StaticRouter } from 'react-router'
import { createMemoryHistory } from 'history'

// @TODO use <Router /> from react-router
class History extends Component {
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

class TestRouter extends Component {
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

export default TestRouter
