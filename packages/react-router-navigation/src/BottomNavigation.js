/* @flow */

import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { type StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { TabStack, type TabsRendererProps } from 'react-router-navigation-core'
import { TabViewPagerPan } from 'react-native-tab-view'
import { type SceneRendererProps } from 'react-native-tab-view/types'
import { type TabsProps, type TabRoute } from './TypeDefinitions'
import DefaultTabsRenderer from './DefaultTabsRenderer'
import TabBarBottom from './TabBarBottom'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    overflow: 'hidden',
  },
})

type Props = TabsProps & {
  children?: React$Node,
  lazy?: boolean,
  style?: StyleObj,
}

class BottomNavigation extends React.Component<Props> {
  static defaultProps = {
    lazy: true,
    tabBarPosition: 'bottom',
  }

  renderPager = (pagerProps: *) => {
    const { key, ...sceneProps } = pagerProps
    return <TabViewPagerPan {...sceneProps} animationEnabled={false} swipeEnabled={false} />
  }

  renderTabBar = (
    tabBarProps: TabsRendererProps & TabsProps & SceneRendererProps<TabRoute>,
  ) => {
    if (tabBarProps.hideTabBar) return null
    if (tabBarProps.renderTabBar) {
      return React.createElement(tabBarProps.renderTabBar, tabBarProps)
    }
    return <TabBarBottom {...tabBarProps} />
  }

  render() {
    return (
      <TabStack
        {...this.props}
        render={tabsRendererProps => (
          <DefaultTabsRenderer
            initialLayout={Dimensions.get('window')}
            animationEnabled={false}
            renderPager={this.renderPager}
            renderTabBar={this.renderTabBar}
            {...this.props}
            {...tabsRendererProps}
          />
        )}
      />
    )
  }
}

export default BottomNavigation
