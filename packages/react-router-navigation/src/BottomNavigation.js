import * as React from 'react'
import { Dimensions } from 'react-native'
import { Route } from 'react-router'
import { TabStack } from 'react-router-navigation-core'
import { TabViewPagerPan } from 'react-native-tab-view'
import DefaultTabsRenderer from './DefaultTabsRenderer'
import TabBarBottom from './TabBarBottom'

class BottomNavigation extends React.Component {
  static defaultProps = {
    lazy: true,
    tabBarPosition: 'bottom',
    initialLayout: Dimensions.get('window'),
    animationEnabled: false,
  }

  renderPager = pagerProps => {
    return (
      <TabViewPagerPan
        {...pagerProps}
        animationEnabled={false}
        swipeEnabled={false}
      />
    )
  }

  renderTabBar = tabBarProps => {
    if (tabBarProps.hideTabBar) return null
    if (tabBarProps.renderTabBar) {
      return React.createElement(tabBarProps.renderTabBar, tabBarProps)
    }
    return <TabBarBottom {...tabBarProps} />
  }

  render() {
    return (
      <Route>
        {({ history }) => (
          <TabStack
            {...this.props}
            history={history}
            render={tabsRendererProps => (
              <DefaultTabsRenderer
                renderPager={this.renderPager}
                renderTabBar={this.renderTabBar}
                {...this.props}
                {...tabsRendererProps}
              />
            )}
          />
        )}
      </Route>
    )
  }
}

export default BottomNavigation
