/* @flow */

import { NavigationExperimental } from 'react-native'
import { POP, PUSH } from './actionTypes'

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental

export default function(state, action) {
  switch (action.type) {
    case PUSH: {
      const route = action.route
      return NavigationStateUtils.push(state, route)
    }
    case POP: {
      const route = action.route
      return NavigationStateUtils.pop(state, route)
    }
  }
}
