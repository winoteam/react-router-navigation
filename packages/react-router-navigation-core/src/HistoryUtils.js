/* @flow */

import type { RouterHistory } from 'react-router'

// eslint-disable-next-line
export const runHistoryListenner = (
  history: RouterHistory,
  onListenHistory: Function,
): Function => {
  let lastHistory = { ...history }
  return history.listen(() => {
    onListenHistory(lastHistory, history)
    lastHistory = { ...history }
  })
}
