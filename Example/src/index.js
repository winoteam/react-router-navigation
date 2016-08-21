/* eslint-disable react/jsx-boolean-value */

import React from 'react'
import Router, { IndexScene, Scene } from 'react-native-router-navigation'
import LaunchScene from './scenes/LaunchScene'
import WelcomeScene from './scenes/WelcomeScene'
import AppScene from './scenes/AppScene'
import FeedScene from './scenes/FeedScene'
import ArticleScene from './scenes/ArticleScene'
import HistoryScene from './scenes/HistoryScene'

export default () => (
  <Router>
    <Scene key="app" tabs={true} component={AppScene}>
      <Scene key="feed">
        <IndexScene component={FeedScene} />
        <Scene key="article" component={ArticleScene} />
      </Scene>
      <Scene key="history">
        <IndexScene component={HistoryScene} />
        <Scene key="article" component={ArticleScene} />
      </Scene>
    </Scene>
    <Scene key="launch" component={LaunchScene} />
    <Scene key="welcome" component={WelcomeScene} />
  </Router>
)
