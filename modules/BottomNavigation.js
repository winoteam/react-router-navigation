/* @flow */
/* error: https://github.com/react-community/react-navigation/blob/master/src/views/TabView/TabView.js#L193 */

import React, { Component, createElement } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view'
import type { TabProps, TabBarProps, TabSubViewProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'
import BottomNavigationBar from './BottomNavigationBar'
import TabStack from './TabStack'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

type Props = TabBarProps & {
  children?: Array<React$Element<TabProps>>,
  lazy?: boolean,
  style?: StyleSheet,
}

type DefaultProps = {
  lazy: boolean,
}

type State = {
  key: string,
}

class BottomNavigation extends Component<DefaultProps, Props, State> {

  props: Props

  static defaultProps: DefaultProps = {
    lazy: true,
  }

  state: State = { key: Math.random().toString(10) }

  renderPager = (sceneProps: TabSubViewProps): React$Element<any> => (
    <TabViewPagerPan
      {...sceneProps}
      key={`pager_${this.state.key}`}
      swipeEnabled={false}
    />
  )

  renderNavigationBar = (
    sceneProps: TabSubViewProps,
    props: TabSubViewProps,
  ): ?React$Element<any> => {
    // Hide tab bar
    if (sceneProps.hideTabBar) return null
    // Custom tab bar
    if (sceneProps.renderTabBar) {
      return createElement(
        sceneProps.renderTabBar,
        sceneProps,
      )
    }
    // Default tab bar
    return (
      <BottomNavigationBar
        {...props}
        sceneProps={sceneProps}
        state={this.state}
      />
    )
  }

  renderScene = (sceneProps: TabSubViewProps): ?React$Element<any> => {
    const { render, children, component } = sceneProps
    if (render) return render(sceneProps)
    else if (children && typeof children === 'function') return children(sceneProps)
    else if (component) return createElement(component, sceneProps)
    return null
  }

  render(): React$Element<any> {
    return (
      <TabStack
        {...this.props}
        style={styles.container}
        forceSync
        render={(props) => {
          const ownProps = { ...this.props, ...props }
          return (
            <TabViewAnimated
              {...props}
              key={`transitioner_${this.state.key}`}
              style={[styles.container, this.props.style]}
              initialLayout={Dimensions.get('window')}
              lazy={this.props.lazy}
              configureTransition={() => null}
              renderPager={StackUtils.renderSubView(this.renderPager, ownProps)}
              renderFooter={StackUtils.renderSubView(this.renderNavigationBar, ownProps)}
              renderScene={StackUtils.renderSubView(this.renderScene, ownProps)}
            />
          )
        }}
      />
    )
  }

}

export default BottomNavigation
