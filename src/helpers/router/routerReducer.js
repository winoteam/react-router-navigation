/* @flow */

import { NavigationExperimental } from 'react-native'

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental

export default function(state, action) {
  switch (action.type) {
    case 'push': {
      const route: Object = action.route
      return NavigationStateUtils.push(state, route)
    }
    case 'pop': {
      const route: Object = action.route
      return NavigationStateUtils.pop(state, route)
    }
  }
}
