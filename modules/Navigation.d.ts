/* @flow */
/* eslint react/no-children-prop: 0 */

import { ReactElement, Component, ComponentClass } from 'react'
import { NavigationProps, CardSubViewProps } from './TypeDefinitions'

type Props = NavigationProps & {
  children?: Array<ReactElement<any>>
}

declare class Navigation extends Component<Props> {
  props: Props

  renderHeader: (
    sceneProps: CardSubViewProps,
    props: CardSubViewProps
  ) => ReactElement<any> | undefined

  renderSceneComponent: (
    sceneProps: CardSubViewProps
  ) => ComponentClass<any> | undefined
}

export default Navigation
