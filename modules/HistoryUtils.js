/* @flow */
/* eslint no-duplicate-imports: 0 */

import type { ContextRouter, RouterHistory } from 'react-router'
import { withRouter } from 'react-router'

const enhancer = withRouter

type Props = ContextRouter & {
  children?: Function,
}

export const History = enhancer(({ children, history }: Props): ?React$Element<
  any,
> => {
  if (!children) return null
  return children(history)
})

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
