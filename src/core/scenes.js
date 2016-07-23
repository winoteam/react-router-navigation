/* @flow */

import React from 'react'
import { LaunchScene } from '@Auth/scenes'
import { FeedScene, ItemScene } from '@Feed/scenes'
import Scene from '@helpers/router/Scene'

const scenes = (
  <Scene key="root">
    <Scene key="launch" title="Launch" component={LaunchScene} />
    <Scene key="app" tabs={true}>
      <Scene key="feed" title="Feed" component={FeedScene}>
        <Scene key="item" title="Item" component={ItemScene} />
      </Scene>
    </Scene>
  </Scene>
)

export default [{
  key: 'launch',
  component: LaunchScene,
}, {
  key: 'feed',
  component: FeedScene,
  tabs: true,
  children: [{
    key: 'feed',
    component: FeedScene,
    children: [{
      key: 'item',
      component: ItemScene,
    }]
  }]
}]
