/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint react/no-unused-prop-types: 0 */
/* eslint no-mixed-operators: 0 */

import { PureComponent, ReactElement } from 'react'
import { History } from 'history'
import { CardsRendererProps, NavigationState, Card } from './TypeDefinitions'

type State = {
  key: number
  navigationState: NavigationState<{}>
  cards: Array<Card>
}

type Props = {
  history: History // eslint-disable-next-line
  children?: Array<ReactElement<any>>
  render: (props: CardsRendererProps) => ReactElement<any>
}

declare class CardStack extends PureComponent<Props, State> {
  props: Props
  state: State

  unlistenHistory: Function

  // Update navigation state
  onListenHistory: (history: History, nextHistory: History) => void

  // Pop to previous scene (n-1)
  onNavigateBack: () => boolean
}

export default CardStack
