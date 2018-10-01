import * as React from 'react'
import { Dimensions } from 'react-native'
import { Route } from 'react-router'
import { TabStack } from 'react-router-navigation-core'
import { PagerPan } from 'react-native-tab-view'
import DefaultTabsRenderer from './DefaultTabsRenderer'
import TabBarBottom from './TabBarBottom'
import { BottomNavigationPropTypes } from './PropTypes'

export default class BottomNavigation extends React.Component {
  static propTypes = BottomNavigationPropTypes

  static defaultProps = {
    lazy: true,
    initialLayout: Dimensions.get('window'),
  }

  renderPager = props => pagerProps => {
    return (
      <PagerPan
        {...props}
        {...pagerProps}
        animationEnabled={false}
        swipeEnabled={false}
      />
    )
  }

  renderTabBar = props => tabBarProps => {
    if (tabBarProps.hideTabBar) return null
    if (tabBarProps.renderTabBar) {
      return React.createElement(tabBarProps.renderTabBar, {
        ...props,
        ...tabBarProps,
      })
    }
    return <TabBarBottom {...props} {...tabBarProps} />
  }

  render() {
    return (
      <Route>
        {({ history }) => (
          <TabStack
            {...this.props}
            changeTabMode="history"
            history={history}
            render={tabStackRendererProps => (
              <DefaultTabsRenderer
                animationEnabled={false}
                renderPager={this.renderPager(tabStackRendererProps)}
                renderTabBar={this.renderTabBar(tabStackRendererProps)}
                tabBarPosition="bottom"
                {...this.props}
                {...tabStackRendererProps}
              />
            )}
          />
        )}
      </Route>
    )
  }
}
