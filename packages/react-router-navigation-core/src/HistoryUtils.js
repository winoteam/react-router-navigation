/* @flow */

import type { RouterHistory } from 'react-router'
import type {
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

  regenerate: (
    history: RouterHistory,
    historyNode: HistoryNode,
    historyRootIndex: HistoryRootIndex,
  ) => {
    return false
  },

  save: (oldHistoryNodes: HistoryNodes): HistoryNodes => {
    return oldHistoryNodes
  },
}

export default HistoryUtils
