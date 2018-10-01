/* @flow */

import PropTypes from 'prop-types'

const MatchPropType = PropTypes.object

const NavigationRoutePropType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  match: MatchPropType,
})

const NavigationStatePropType = PropTypes.shape({
  routes: PropTypes.arrayOf(NavigationRoutePropType).isRequired,
  index: PropTypes.number.isRequired,
})

export const RoutePropType = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  sensitive: PropTypes.bool,
  component: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}

export const ItemPropType = PropTypes.shape({
  ...RoutePropType,
})

export const CardPropType = PropTypes.shape({
  ...RoutePropType,
})

export const TabPropType = PropTypes.shape({
  ...RoutePropType,
  routePath: PropTypes.string,
  initialPath: PropTypes.string,
})

export const CardRendererPropType = {
  navigationState: NavigationStatePropType,
  cards: PropTypes.arrayOf(CardPropType),
  renderCard: PropTypes.func.isRequired,
  onNavigateBack: PropTypes.func.isRequired,
}

export const TabsRendererPropType = {
  navigationState: NavigationStatePropType,
  tabs: PropTypes.arrayOf(TabPropType),
  renderTab: PropTypes.func.isRequired,
  onIndexChange: PropTypes.func.isRequired,
}
