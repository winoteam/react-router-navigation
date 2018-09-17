/* @flow */

import PropTypes from 'prop-types'

export const RoutePropTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  sensitive: PropTypes.bool,
  component: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}

export const TabBarPropTypes = {
  label: PropTypes.string,
}

export const DefaultTabsRendererPropTypes = {
  ...TabBarPropTypes,
}
export const TabsPropTypes = DefaultTabsRendererPropTypes

export const TabPropTypes = {
  ...RoutePropTypes,
  ...TabBarPropTypes,
  routePath: PropTypes.string,
  initialPath: PropTypes.string,
}
