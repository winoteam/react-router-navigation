/* @flow */

import React, { Component } from 'react'
import { Platform } from 'react-native'
import MaterialBottomNavigationBar, { Tab } from 'react-native-material-bottom-navigation'
import TabBarBottom from 'react-navigation/src/views/TabView/TabBarBottom'
import type { TabSubViewProps } from './TypeDefinitions'

type Props = TabSubViewProps & {
  sceneProps: TabSubViewProps,
  state: {
    key: string,
  },
}

class BottomNavigationBar extends Component<void, Props, void> {

  props: Props

  // Render when navigation state is updated
  shouldComponentUpdate(nextProps: Props): boolean {
    const { index } = this.props.navigationState
    const { index: nextIndex } = nextProps.navigationState
    return index !== nextIndex
  }

  render(): React$Element<any> {
    const { sceneProps, ...props } = this.props
    // Default tab bar
    if (Platform.OS === 'ios') {
      return (
        <TabBarBottom
          {...sceneProps}
          jumpToIndex={sceneProps.onRequestChangeTab}
          labelStyle={sceneProps.labelStyle}
          inactiveTintColor={sceneProps.tabTintColor}
          activeTintColor={sceneProps.tabActiveTintColor}
          getLabel={({ route: { routeName } }) => {
            const tab = props.tabs.find(({ key }) => key === routeName)
            const ownProps = { ...sceneProps, ...tab }
            if (ownProps.renderLabel) return ownProps.renderLabel(ownProps)
            return ownProps.label
          }}
          renderIcon={({ route, ...otherProps }) => {
            const tab = props.tabs.find(({ key }) => key === route.routeName)
            const ownProps = { ...sceneProps, ...tab, ...otherProps }
            if (!ownProps.renderTabIcon) return null
            return ownProps.renderTabIcon(ownProps)
          }}
        />
      )
    }
    return (
      <MaterialBottomNavigationBar
        {...sceneProps}
        key={`tabbar_${this.props.state.key}`}
        labelColor="white"
        rippleColor="white"
        style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
        activeTab={sceneProps.navigationState.index}
        onTabChange={sceneProps.onRequestChangeTab}
      >
        {sceneProps.navigationState.routes.map((route) => {
          const tab = props.tabs.find(({ key }) => key === route.routeName)
          const ownProps = { ...props, ...tab, route }
          return (
            <Tab
              key={`tabitem_${tab.key}`}
              barBackgroundColor="#37474F"
              label={ownProps.label}
              icon={ownProps.renderTabIcon(ownProps)}
            />
          )
        })}
      </MaterialBottomNavigationBar>
    )
  }

}

export default BottomNavigationBar
