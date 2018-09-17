/* @flow */

import { createLocation } from 'history'
import type { RouterHistory, Location } from 'react-router'
import type {
  RouteProps,
  HistoryNodes,
  HistoryNode,
  HistoryRootIndex,
} from './TypeDefinitions'

export default {
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
    if (
      historyNode.entries.length > 1 ||
      history.entries.length > historyRootIndex + 1
    ) {
      history.entries = [
        ...history.entries.slice(0, historyRootIndex),
        ...historyNode.entries,
      ]
      history.index = historyRootIndex + historyNode.index
    }
    history.replace(historyNode.entries[historyNode.index].pathname)
    return
  },
}
