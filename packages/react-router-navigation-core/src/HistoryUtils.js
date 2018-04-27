/* @flow */

import type { RouterHistory } from 'react-router'
import type { HistoryNodes, HistoryNode, HistoryRootIndex } from './TypeDefinitions'

const HistoryUtils = {
  listen: (history: RouterHistory, callback: Function): Function => {
    let lastHistory = { ...history }
    return history.listen(() => {
      callback(lastHistory, history)
      lastHistory = { ...history }
    })
  },

  persistNodes: (
    history: RouterHistory,
    historyNode: HistoryNode,
    historyRootIndex: HistoryRootIndex,
  ) => false,

  saveNodes: (oldHistoryNodes: HistoryNodes): HistoryNodes => oldHistoryNodes,
}

export default HistoryUtils
