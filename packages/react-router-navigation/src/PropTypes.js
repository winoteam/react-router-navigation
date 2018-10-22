/* @flow */

import PropTypes from 'prop-types'
import { ViewPropTypes, Text } from 'react-native'

export const RoutePropTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  sensitive: PropTypes.bool,
  component: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}

export const NavBarPropTypes = {
  hideNavBar: PropTypes.bool,
  renderNavBar: PropTypes.func,
  navBarStyle: ViewPropTypes.style,
  hideBackButton: PropTypes.bool,
  backButtonTintColor: PropTypes.string,
  backButtonTitle: PropTypes.string,
  renderLeftButton: PropTypes.func,
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  renderTitle: PropTypes.func,
  renderRightButton: PropTypes.func,
}

export const DefaultNavigationRendererPropTypes = {
  ...NavBarPropTypes,
  onTransitionStart: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  cardStyle: ViewPropTypes.style,
  configureTransition: PropTypes.func,
  mode: PropTypes.string,
  gesturesEnabled: PropTypes.bool,
}

export const NavigationPropTypes = DefaultNavigationRendererPropTypes

export const CardPropTypes = {
  ...RoutePropTypes,
  ...NavigationPropTypes,
  routePath: PropTypes.string,
}

export const TabBarPropTypes = {
  hideTabBar: PropTypes.bool,
  tabBarPosition: PropTypes.oneOf(['top', 'bottom']),
  tabBarIndicatorStyle: ViewPropTypes.style,
  tabBarStyle: ViewPropTypes.style,
  renderTabBar: PropTypes.func,
  tabStyle: ViewPropTypes.style,
  tabTintColor: PropTypes.string,
  tabActiveTintColor: PropTypes.string,
  label: PropTypes.string,
  labelStyle: Text.propTypes.style,
  renderLabel: PropTypes.func,
  renderTabIcon: PropTypes.func,
}

export const DefaultTabsRendererPropTypes = {
  ...TabBarPropTypes,
  style: ViewPropTypes.style,
  initialLayout: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  lazy: PropTypes.bool,
}

export const BottomNavigationPropTypes = DefaultTabsRendererPropTypes

export const TabsPropTypes = DefaultTabsRendererPropTypes

export const TabPropTypes = {
  ...RoutePropTypes,
  ...TabBarPropTypes,
  routePath: PropTypes.string,
  initialPath: PropTypes.string,
  onReset: PropTypes.func,
}
