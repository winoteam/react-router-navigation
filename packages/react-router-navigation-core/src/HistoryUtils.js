/* @flow */

import type { RouterHistory } from 'react-router'

const HistoryUtils = {
  listen: (history: RouterHistory, callback: Function): Function => {
    let lastHistory = { ...history }
    return history.listen(() => {
      callback(lastHistory, history)
      lastHistory = { ...history }
    })
  },

  persistNodes: () => false,

  saveNodes: (history: RouterHistory, rootIndex: number, nodes: Array<Location>) => {},
}

export default HistoryUtils
