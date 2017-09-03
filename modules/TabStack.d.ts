/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint react/no-unused-prop-types:0 */

import { ReactElement, PureComponent } from 'react'
import { History } from 'history'
import { NavigationState, TabsRendererProps, Tab } from './TypeDefinitions'

type Props = {
  history: History // eslint-disable-next-line
  children?: Array<ReactElement<any>>
  render: (props: TabsRendererProps) => ReactElement<any> // eslint-disable-next-line
  lazy?: boolean
  forceSync?: boolean
}

type DefaultProps = {
  forceSync: false
}

type State = {
  navigationState: NavigationState<{
    title?: string
    testID?: string
  }>
  tabs: Array<Tab>
  rootIndex: number
  tabsHistory: { [key: number]: Array<Location> }
}

declare class TabStack extends PureComponent<Props, State> {
  props: Props
  state: State

  unlistenHistory: Function

  static defaultProps: DefaultProps

  // Update navigation state
  onListenHistory: (history: History, nextHistory: History) => void

  // Callback for when the current tab changes
  onRequestChangeTab: (index: number) => void
}

export default TabStack
