/* @flow */

import React, { Component, createElement } from 'react'
import { TouchableWithoutFeedback, View, Text } from 'react-native'
import type { NavigationState } from './../../types'
import styles from './styles'

type Props = {
  navigationState: NavigationState,
  changeTab: (index: number) => void,
}

class TabBar extends Component {

  props: Props

  shouldComponentUpdate(nextProps) {
    return nextProps.navigationState.index !== this.props.navigationState.index
  }

  render() {
    const { navigationState, changeTab } = this.props
    const { component, routes } = navigationState
    const tabComponent = component || {}

    const defaultColor = tabComponent.tabBarDefaultColor || '#929292'
    const activeColor = tabComponent.tabBarActiveColor || '#0076ff'

    return (
      <View style={[styles.container, tabComponent.tabBarStyle]}>
        {routes.map((route, index) => {
          const active = index === navigationState.index
          const { renderTabIcon, title } = route.routes[0].component
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => changeTab(index)}
            >
              <View style={styles.item}>
                <View style={styles.icon}>
                  {renderTabIcon && createElement(renderTabIcon, {
                    active, activeColor, defaultColor,
                  })}
                </View>
                <Text
                  style={[
                    styles.text,
                    { color: active ? activeColor : defaultColor },
                  ]}
                >
                  {title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </View>
    )
  }

}

export default TabBar
