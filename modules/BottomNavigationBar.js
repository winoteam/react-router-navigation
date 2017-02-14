/* @flow */
/* eslint new-cap: 0 */
/* eslint max-len: 0 */
/* eslint no-duplicate-imports: 0 */

import React, { Component } from 'react'
import { TouchableWithoutFeedback, TouchableNativeFeedback, StyleSheet, Platform, Dimensions, PixelRatio, View, Text } from 'react-native'
import { withRouter } from 'react-router'
import type { RouterHistory } from 'react-router'
import type { SceneRendererProps } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { TabBarProps, TabRendererProps, Tab } from './TypeDefinitions'

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

type Props = RouterHistory & TabBarProps & SceneRendererProps & TabRendererProps

type State = {
  tabItems: Array<Tab & {
    isActive: boolean,
    pathname: string,
  }>,
}

class BottomNavigationBar extends Component<void, Props, State> {

  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    const { navigationState, tabs } = props
    this.state = {
      tabItems: tabs.map((tab, index) => ({
        ...tab,
        pathname: tab.path,
        isActive: navigationState.index === index,
      })),
    }
  }

  onRequestChangeTab = (index: number): void => {
    const { tabItems } = this.state
    const { navigationState, location, replace, onResetTab } = this.props
    // Get current tab and update its pathname
    const currentTab = tabItems[navigationState.index]
    currentTab.pathname = location.pathname
    currentTab.isActive = true
    // Get new tab to switch
    const tab = tabItems[index]
    // Update history
    replace(tab.pathname)
    // Reset tab
    if (navigationState.index === index && onResetTab) onResetTab(index)
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
          const tabsLabelStyle = this.props.labelStyle && typeof this.props.labelStyle === 'function'
            ? this.props.labelStyle(item)
            : this.props.labelStyle
          const tabLabelStyle = item.labelStyle && typeof item.labelStyle === 'function'
            ? item.labelStyle(item)
            : item.labelStyle
          return (
            <Touchable
              key={index}
              background={isAndroid && TouchableNativeFeedback.Ripple('#008f8d', true)}
              onPress={() => this.onRequestChangeTab(index)}
            >
              <View style={styles.item}>
                {(this.props.renderTabIcon || item.renderTabIcon) && (
                  this.props.renderTabIcon(item) || item.renderTabIcon(item)
                )}
                {(this.props.label || item.label) &&
                  <Text style={[styles.label, item.isActive && styles.activeLabel, tabsLabelStyle, tabLabelStyle]}>
                    {(this.props.label || item.label)}
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

export default withRouter(BottomNavigationBar)
