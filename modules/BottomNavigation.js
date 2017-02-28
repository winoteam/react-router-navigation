/* @flow */

import React, { Component, createElement } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view'
import type { SceneRendererProps } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { TabProps, TabBarProps, TabRendererProps } from './TypeDefinitions'
import StackUtils from './StackUtils'
import TabStack from './TabStack'
import BottomNavigationBar from './BottomNavigationBar'

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapper: { flex: 1 },
})

type TabSceneRendererProps =
  & SceneRendererProps
  & TabRendererProps
  & TabBarProps

type Props = TabBarProps & {
  children: Array<React$Element<TabProps>>,
  lazy?: boolean,
  style?: StyleSheet,
}

type DefaultProps = {
  lazy: boolean,
}

class BottomNavigation extends Component<DefaultProps, Props, void> {

  props: Props

  static defaultProps: DefaultProps = {
    lazy: true,
  }

  renderPager = (sceneRendererProps: SceneRendererProps): React$Element<any> => (
    <TabViewPagerPan
      {...sceneRendererProps}
      swipeEnabled={false}
    />
  )

  renderNavigationBar = (props: TabSceneRendererProps): React$Element<any> => {
    // $FlowFixMe
    const { tabs, navigationState: { routes, index }, onRequestChangeTab } = props
    const route = routes[index]
    const tab = StackUtils.get(tabs, route)
    const tabBarProps = { ...this.props, ...props, ...tab }
    // Custom tab bar
    if (tabBarProps.renderTabBar) {
      return createElement(
        tabBarProps.renderTabBar,
        tabBarProps,
      )
    }
    // Default tab bar
    return (
      <BottomNavigationBar
        {...tabBarProps}
        onRequestChangeTab={onRequestChangeTab}
      />
    )
  }

  renderScene = (props: TabSceneRendererProps): ?React$Element<any> => {
    // Get tab $FlowFixMe
    const { tabs, route } = props
    const tab = StackUtils.get(tabs, route)
    if (!tab) return null
    // Render view
    const ownProps = { ...props, key: route.key }
    if (tab.render) return tab.render(ownProps)
    else if (tab.children) return tab.children(ownProps)
    else if (tab.component) return createElement(tab.component, ownProps)
    return null
  }

  render(): React$Element<any> {
    return (
      <TabStack
        {...this.props}
        style={styles.container}
        forceSync={true}
        render={(props) => (
          <TabViewAnimated
            {...props}
            style={[styles.container, this.props.style]}
            initialLayout={Dimensions.get('window')}
            lazy={this.props.lazy}
            configureTransition={() => null}
            renderPager={(ownProps) => this.renderPager({ ...props, ...ownProps })}
            renderFooter={(ownProps) => this.renderNavigationBar({ ...props, ...ownProps })}
            renderScene={(ownProps) => this.renderScene({ ...props, ...ownProps })}
          />
        )}
      />
    )
  }

}

export default BottomNavigation
