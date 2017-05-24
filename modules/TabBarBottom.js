/* @flow */

import React from 'react'
import { StyleSheet, Platform, Text } from 'react-native'
import { TabBar } from 'react-native-tab-view'
import type { TabSubViewProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'

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

type Props = TabSubViewProps & {
  sceneProps: TabSubViewProps,
}

type DefaultProps = {
  tabTintColor: string,
  tabActiveTintColor: string,
}

class TabBarBottom extends React.Component<DefaultProps, Props, void> {

  props: Props

  static defaultProps: DefaultProps = {
    tabTintColor: '#929292',
    tabActiveTintColor: '#3478f6',
  }

  // Align tab icon & label
  alignTabBarContent = (): Object => {
    const { label, renderTabIcon } = this.props
    if (label && renderTabIcon) return { justifyContent: 'flex-end' }
    return { justifyContent: 'center' }
  }

  // Disable indicator
  renderIndicator = (): ?React$Element<any> => {
    return null
  }

  // Render tab label
  renderLabel = (sceneProps: TabSubViewProps): ?React$Element<any> => {
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

  // Render tab icon
  renderIcon = (sceneProps: TabSubViewProps): ?React$Element<any> => {
    if (!sceneProps.renderTabIcon) return null
    return sceneProps.renderTabIcon(sceneProps)
  }

  // Render when navigation state is updated
  shouldComponentUpdate(nextProps: Props): boolean {
    const { index } = this.props.navigationState
    const { index: nextIndex } = nextProps.navigationState
    return index !== nextIndex
  }

  render(): React$Element<any> {
    return ( // $FlowFixMe
      <TabBar
        {...this.props}
        style={[styles.tabBar, this.alignTabBarContent, this.props.sceneProps.tabBarStyle]}
        tabStyle={[styles.tab, this.props.sceneProps.tabStyle]}
        jumpToIndex={this.props.onRequestChangeTab}
        onRequestChangeTab={() => null}
        pressOpacity={1}
        renderIndicator={this.renderIndicator}
        renderLabel={StackUtils.renderSubView(this.renderLabel, this.props)}
        renderIcon={StackUtils.renderSubView(this.renderIcon, this.props)}
      />
    )
  }

}

export default TabBarBottom
