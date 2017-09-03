/* @flow */

import { ReactElement, Component } from 'react'
import { TabSubViewProps, TabBarProps } from './TypeDefinitions'

type Props = TabBarProps & {
  children?: Array<ReactElement<any>>
}

type State = {
  key: string
}

declare class Tabs extends Component<Props, State> {
  props: Props

  state: State

  renderHeader: (sceneProps: TabSubViewProps) => ReactElement<any> | null

  renderFooter: (sceneProps: TabSubViewProps) => ReactElement<any> | null

  renderTabBar: (
    sceneProps: TabSubViewProps,
    props: TabSubViewProps
  ) => ReactElement<any> | null

  renderScene: (sceneProps: TabSubViewProps) => ReactElement<any> | null
}

export default Tabs
