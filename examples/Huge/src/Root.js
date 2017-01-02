import React, { Component } from 'react'
import { Navigation, MatchCard } from 'react-native-router-navigation'

import Launch from './Launch'
import Auth from './Auth'
import App from './App'

class Root extends Component {

  state = { key: 0 }

  onReset = () => {
    this.setState({
      key: this.state.key + 1,
    })
  }

  render() {
    return (
      <Navigation key={this.state.key}>
        <MatchCard
          pattern="/launch"
          component={Launch}
          hideNavBar
        />
        <MatchCard
          pattern="/auth"
          component={Auth}
          title="Auth"
        />
        <MatchCard
          pattern="/app"
          component={App}
          hideNavBar
        />
      </Navigation>
    )
  }

}

export default Root
