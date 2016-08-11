/* @flow */

import React, { createElement } from 'react'
import { TouchableWithoutFeedback, View, Text } from 'react-native'
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
  const tabComponent = navigationState.component || {}
  const route = routes.find((_route, index) => index === navigationState.index)

  return createElement(tabComponent, {}, (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {renderScene(route)}
      </View>
      <View style={[styles.tabBar, tabComponent.tabBarStyle]}>
        {routes.map((_route, index) => {
          const active = index === navigationState.index
          const { renderTabIcon, title } = _route.routes[0].component
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => changeTab(index)}
            >
              <View style={styles.tabItem}>
                {renderTabIcon && createElement(renderTabIcon, {
                  active,
                  activeColor: tabComponent.tabBarActiveTextColor || '#0076ff',
                  defaultColor: tabComponent.tabBarDefaultTextColor || '#929292',
                })}
                <Text
                  style={[
                    styles.tabText,
                    { color: active
                      ? tabComponent.tabBarActiveTextColor || '#0076ff'
                      : '#929292',
                    },
                  ]}
                >
                  {title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </View>
    </View>
  ))
}

export default TabView
