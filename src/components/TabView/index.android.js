/* @flow */

import React from 'react'
import { ViewPagerAndroid, View } from 'react-native'
import type { NavigationState, NavigationSceneProps } from './../../types'
import styles from './styles'

type Props = {
  navigationState: NavigationState,
  renderScene: (sceneProps: NavigationSceneProps) => React$Element<any>,
  changeTab: (index: number) => void,
}

const TabView = (props: Props): React$Element<any> => {
  const { navigationState, renderScene } = props
  const { routes } = navigationState
  return (
    <View style={styles.container}>
      <View style={styles.tabBar} />
      <ViewPagerAndroid style={{ flex: 1 }} initialPage={0}>
        {routes.map((route, index) => (
          <View key={index}>
            {renderScene(route)}
          </View>
        ))}
      </ViewPagerAndroid>
    </View>
  )
}

export default TabView
