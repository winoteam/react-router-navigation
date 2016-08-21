/* @flow */

import React, { createElement } from 'react'
import { Dimensions, View } from 'react-native'
import TabBar from './../TabBar'
import type { NavigationState, NavigationSceneProps } from './../../types'
import styles from './styles'

type Props = {
  navigationState: NavigationState,
  renderScene: (sceneProps: NavigationSceneProps) => React$Element<any>,
}

const TabView = (props: Props): React$Element<any> => {
  const { navigationState, renderScene } = props
  const { routes } = navigationState
  const tabComponent = navigationState.component || {}
  const route = routes.find((_route, index) => index === navigationState.index)

  const hideTabBar = route.routes.slice(-1)[0].component.hideTabBar

  return createElement(tabComponent, {}, (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          {
            transform: [{ translateX: Dimensions.get('window').width * -navigationState.index }],
          },
        ]}
      >
        {routes.map((scene, index) => (
          <View key={index} style={styles.scene}>
            {renderScene(scene)}
          </View>
        ))}
      </View>
      {!hideTabBar && <TabBar {...props} />}
    </View>
  ))
}

export default TabView
