/* @flow */

import { createLocation } from 'history'
import type { RouterHistory, Location } from 'react-router'
import type {
  RouteProps,
  HistoryNodes,
  HistoryNode,
  HistoryRootIndex,
} from './TypeDefinitions'

const HistoryUtils = {
  listen: (history: RouterHistory, callback: Function): Function => {
    let lastHistory = { ...history }
    return history.listen(() => {
      callback(lastHistory, history)
      lastHistory = { ...history }
    })
  },

  createLocation: (history: RouterHistory, route: RouteProps): Location => {
    const path = route.initialPath || route.path
    return createLocation(
      path,
      history.location.state,
      undefined,
      history.location,
    )
  },

  regenerate: (
    history: RouterHistory,
    historyNode: HistoryNode,
    historyRootIndex: HistoryRootIndex,
  ): boolean => {
    return false
  },

  save: (oldHistoryNodes: HistoryNodes): HistoryNodes => {
    return oldHistoryNodes
  },
}

export default HistoryUtils
