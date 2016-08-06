/* @flow */
/* eslint-disable react/jsx-boolean-value */

import React from 'react'
import Router, { IndexScene, Scene } from 'react-native-router-navigation'
import LaunchScene from './scenes/LaunchScene'
import AuthScene from './scenes/AuthScene'
import WelcomeScene from './scenes/WelcomeScene'
import AppScene from './scenes/AppScene'
import FeedScene from './scenes/FeedScene'
import ArticleScene from './scenes/ArticleScene'
import HistoryScene from './scenes/HistoryScene'

export default () => (
  <Router>
    <Scene key="launch" component={LaunchScene} />
    <Scene key="auth" component={AuthScene} />
    <Scene key="welcome" component={WelcomeScene} />
    <Scene key="app" tabs={true} component={AppScene}>
      <Scene key="feed">
        <IndexScene component={FeedScene} />
        <Scene key="article" component={ArticleScene} />
      </Scene>
      <Scene key="history">
        <IndexScene component={HistoryScene} />
      </Scene>
    </Scene>
  </Router>
)
