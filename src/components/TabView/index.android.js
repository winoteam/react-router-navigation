/* @flow */

import React, { createElement } from 'react'
import { Dimensions, ViewPagerAndroid, TouchableHighlight, View, Text } from 'react-native'
import StaticContainer from 'react-static-container'
import type { NavigationState, NavigationSceneProps } from './../../types'
import styles from './styles'

type Props = {
  navigationState: NavigationState,
  renderScene: (sceneProps: NavigationSceneProps) => React$Element<any>,
  changeTab: (index: number) => void,
}

const TabView = (props: Props): React$Element<any> => {
  const { navigationState, renderScene, changeTab } = props
  const { routes } = navigationState
  const route = routes[navigationState.index]
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
