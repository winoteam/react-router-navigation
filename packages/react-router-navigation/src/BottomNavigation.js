import * as React from 'react'
import { Dimensions } from 'react-native'
import { Route } from 'react-router'
import { TabStack } from 'react-router-navigation-core'
import { TabViewPagerPan } from 'react-native-tab-view'
import DefaultTabsRenderer from './DefaultTabsRenderer'
import TabBarBottom from './TabBarBottom'
import { BottomNavigationPropTypes } from './PropTypes'

class BottomNavigation extends React.Component {
  static propTypes = BottomNavigationPropTypes

  static defaultProps = {
    lazy: true,
    initialLayout: Dimensions.get('window'),
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
                animationEnabled={false}
                renderPager={this.renderPager}
                renderTabBar={this.renderTabBar}
                tabBarPosition="bottom"
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
