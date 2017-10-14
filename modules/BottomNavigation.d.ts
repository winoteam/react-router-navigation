/* @flow */
/* eslint  no-nested-ternary: 0 */

import * as React from 'react'
import { Dimensions, View } from 'react-native'
import { TabViewPagerPanProps } from 'react-native-tab-view'
import { TabProps, TabBarProps, TabSubViewProps } from './TypeDefinitions'

type Props = TabBarProps & {
  children?: Array<React.ReactElement<TabProps>>
  lazy?: boolean
  style?: StyleSheet
}

type DefaultProps = {
  lazy: true
}

type State = {
  key: string
}

declare class BottomNavigation extends React.Component<Props, State> {
  static defaultProps: DefaultProps

  state: State

  renderPager: (sceneProps: TabViewPagerPanProps) => React.ReactNode

  renderNavigationBar: (
    sceneProps: TabSubViewProps,
    props: TabBarProps
  ) => React.ReactNode

  renderScene: (sceneProps: TabSubViewProps) => React.ReactNode

  render(): React.ReactElement<any>
}

export default BottomNavigation
