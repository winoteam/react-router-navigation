/* @flow */
/* eslint new-cap: 0 */

import React, { PropTypes, Component } from 'react'
import { TouchableWithoutFeedback, TouchableNativeFeedback, StyleSheet, Platform, Dimensions, PixelRatio, View, Text } from 'react-native'
import type { SceneRendererProps } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { Tabs, Tab } from './TabTypeDefinitions'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    backgroundColor: '#fafafa',
    ...Platform.select({
      ios: {
        height: 49,
        borderTopColor: '#b2b2b2',
        borderTopWidth: 1 / PixelRatio.get(),
      },
      android: {
        height: 56,
        borderTopWidth: 2 / PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        backgroundColor: 'white',
      },
    }),
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...Platform.select({
      ios: {
        color: '#929292',
        fontSize: 10,
      },
      android: {
        fontSize: 13,
      },
    }),
    textAlign: 'center',
  },
  activeLabel: {
    ...Platform.select({
      android: {
        color: '#008f8d',
      },
      ios: {
        color: '#0075ff',
      },
    }),
  },
})

type Props = SceneRendererProps & {
  tabs: Tabs,
  onResetTab: (index: number) => void,
}

type State = {
  tabItems: Array<Tab & {
    isActive: boolean,
    pathname: string,
  }>,
}

type Context = {
  history: any,
}

class BottomNavigationBar extends Component<void, Props, State> {

  props: Props
  state: State
  context: Context

  static contextTypes = {
    history: PropTypes.object,
  }

  constructor(props: Props, context: Context) {
    super(props, context)
    const { navigationState, tabs } = props
    this.state = {
      tabItems: tabs.map((tab, index) => ({
        ...tab,
        pathname: tab.pattern,
        isActive: navigationState.index === index,
      })),
    }
  }

  onRequestChangeTab = (index: number): void => {
    const { tabItems } = this.state
    const { history } = this.context
    const { navigationState } = this.props
    // Get current tab and update its pathname
    const currentTab = tabItems[navigationState.index]
    currentTab.pathname = history.location.pathname
    currentTab.isActive = true
    // Get new tab to switch
    const tab = tabItems[index]
    // Update history
    history.replace(tab.pathname)
    // Reset tab
    if (navigationState.index === index) this.props.onResetTab(index)
    // Update state
    const nextTabItems = tabItems.map((tabItem, i) => ({
      ...tabItem,
      isActive: i === index,
    }))
    this.setState({ tabItems: nextTabItems })
  }

  render(): React$Element<any> {
    const { tabItems } = this.state
    const Touchable = Platform.OS === 'ios'
      ? TouchableWithoutFeedback
      : TouchableNativeFeedback
    const isAndroid = Platform.OS === 'android'
    return (
      <View style={styles.container}>
        {tabItems.map((item, index) => {
          const labelStyle = item.labelStyle && typeof item.labelStyle === 'function'
            ? item.labelStyle(item)
            : item.labelStyle
          return (
            <Touchable
              key={index}
              background={isAndroid && TouchableNativeFeedback.Ripple('#008f8d', true)}
              onPress={() => this.onRequestChangeTab(index)}
            >
              <View style={styles.item}>
                {item.renderTabIcon && item.renderTabIcon(item)}
                {item.label &&
                  <Text style={[styles.label, item.isActive && styles.activeLabel, labelStyle]}>
                    {item.label}
                  </Text>
                }
              </View>
            </Touchable>
          )
        })}
      </View>
    )
  }

}

export default BottomNavigationBar
