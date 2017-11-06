/* @flow */

import { Component, ReactElement } from 'react'
import { CardSubViewProps } from './TypeDefinitions'

type Props = CardSubViewProps

declare class NavBar extends Component<Props, void> {
  props: Props

  renderLeftComponent: (
    sceneProps: CardSubViewProps
  ) => ReactElement<any> | null

  renderTitleComponent: (
    sceneProps: CardSubViewProps
  ) => ReactElement<any> | null

  renderRightComponent: (
    sceneProps: CardSubViewProps
  ) => ReactElement<any> | null
}
export default NavBar
