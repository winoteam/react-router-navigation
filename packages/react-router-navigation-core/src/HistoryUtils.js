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

  saveNodes: oldHistoryNodes => oldHistoryNodes,
}

export default HistoryUtils
