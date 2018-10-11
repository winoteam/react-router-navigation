/* @flow */

import { createLocation } from 'history'
import { type RouterHistory, type Location, matchPath } from 'react-router'
import type {
  Route,
  RouteProps,
  HistoryNode,
  HistoryRootIndex,
} from './TypeDefinitions'

export default {
  listen(history: RouterHistory, callback: Function): Function {
    let lastHistory = { ...history }
    return history.listen(() => {
      callback(lastHistory, history)
      lastHistory = { ...history }
    })
  },

  createLocation(history: RouterHistory, route: RouteProps): Location {
    const path = route.initialPath || route.path
    return createLocation(
      path,
      history.location.state,
      undefined,
      history.location,
    )
  },

  saveNodes(
    source: Location | RouterHistory,
    route: Route,
    localHistoryState: {
      historyNodes: { [name: string]: HistoryNode },
      historyRootIndex: number,
    },
  ) {
    const { historyRootIndex, historyNodes } = localHistoryState
    if ('pathname' in source) {
      // $FlowFixMe
      const location: Location = source
      const historyNode = historyNodes[route.name]
      const index = historyNode ? historyNode.index : 0
      const entries = historyNode ? historyNode.entries : [location]
      return { ...historyNodes, [route.name]: { index, entries } }
    }
    // $FlowFixMe
    const history: RouterHistory = source
    const initialEntries = history.entries.slice(historyRootIndex)
    const initialIndex = initialEntries.findIndex(location => {
      return (
        route.match &&
        matchPath(location.pathname, {
          path: route.match.path,
        })
      )
    })
    const index = history.index - historyRootIndex - initialIndex
    const entries = initialEntries.slice(initialIndex)
    return { ...historyNodes, [route.name]: { index, entries } }
  },

  regenerateFromEntries(
    history: RouterHistory,
    historyNode: HistoryNode,
    historyRootIndex: HistoryRootIndex,
  ) {
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
  },

  regenerateFromLocation(history: RouterHistory, location: Location) {
    history.replace(location.pathname)
  },
}
