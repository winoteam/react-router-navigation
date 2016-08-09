/* @flow */

import React, { createElement } from 'react'
import { TouchableWithoutFeedback, View, Text } from 'react-native'
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
      <View style={styles.wrapper}>
        {routes.map((route, index) => (
          <View key={index}>
            {index === navigationState.index && renderScene(route)}
          </View>
        ))}
      </View>
      <View style={styles.tabBar}>
        {routes.map((route, index) => {
          const selected = index === navigationState.index
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => changeTab(index)}
            >
              <View style={styles.tabItem}>
                {createElement(route.routes[0].component.renderTabIcon, { selected })}
                <Text
                  style={[
                    styles.tabText,
                    { color: selected ? '#0076ff' : '#929292' }
                  ]}
                >
                  {route.key}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </View>
    </View>
  )
}

export default TabView
