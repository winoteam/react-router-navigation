/* @flow */

import React from 'react'
import { StyleSheet, Platform, Text } from 'react-native'
import { TabBar } from 'react-native-tab-view'
import { renderSubView } from 'react-router-navigation-core'
import type { TabSubViewProps } from './TypeDefinitions'

const TAB_HEIGHT = Platform.OS === 'ios' ? 49 : 56

const styles = StyleSheet.create({
  tabBar: {
    height: TAB_HEIGHT,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    ...Platform.select({
      ios: {
        backgroundColor: '#f4f4f4',
      },
      android: {
        backgroundColor: '#ffffff',
      },
    }),
  },
  tab: {
    flex: 1,
    paddingVertical: 4,
    height: TAB_HEIGHT,
  },
  label: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontSize: 10,
      },
      android: {
        fontSize: 13,
        includeFontPadding: false,
      },
    }),
  },
})

type Props = {
  ...TabSubViewProps,
  sceneProps: TabSubViewProps,
}

class TabBarBottom extends React.Component<Props> {
  static defaultProps = {
    tabTintColor: '#929292',
    tabActiveTintColor: '#3478f6',
  }

  renderIndicator = () => {
    return null
  }

  renderLabel = (sceneProps: TabSubViewProps) => {
    // Custom label component
    if (sceneProps.renderLabel) return sceneProps.renderLabel(sceneProps)
    // Default label
    const { label, focused, tabTintColor, tabActiveTintColor } = sceneProps
    if (!label) return null
    return (
      <Text
        style={[
          styles.label,
          sceneProps.labelStyle,
          !focused && { color: tabTintColor },
          focused && { color: tabActiveTintColor },
        ]}
      >
        {label}
      </Text>
    )
  }

  renderIcon = (sceneProps: TabSubViewProps) => {
    if (!sceneProps.renderTabIcon) return null
    return sceneProps.renderTabIcon(sceneProps)
  }

  shouldComponentUpdate(nextProps: Props) {
    const { index } = this.props.navigationState
    const { index: nextIndex } = nextProps.navigationState
    return index !== nextIndex
  }

  render() {
    const { label, renderTabIcon } = this.props
    return (
      <TabBar
        {...this.props}
        style={[
          styles.tabBar,
          { justifyContent: label && renderTabIcon ? 'flex-end' : 'center' },
          this.props.sceneProps.tabBarStyle,
        ]}
        tabStyle={[styles.tab, this.props.sceneProps.tabStyle]}
        jumpToIndex={this.props.onIndexChange}
        onIndexChange={() => null}
        pressOpacity={1}
        renderIndicator={this.renderIndicator}
        renderLabel={renderSubView(this.renderLabel, this.props)}
        renderIcon={renderSubView(this.renderIcon, this.props)}
      />
    )
  }
}

export default TabBarBottom
