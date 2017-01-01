/* @flow */

import { Component } from 'react'
import _ from 'lodash'
import type { NavigationTransitionProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Card } from './StackTypeDefinitions'

type Props = NavigationTransitionProps & {
  cards: Array<Card>,
  onNavigateBack: Function,
  render: (
    props: NavigationTransitionProps & {
      cards: Array<Card>,
      onNavigateBack: Function,
    }) => React$Element<any>,
}

class CardStackView extends Component<void, Props, void> {

  shouldComponentUpdate(nextProps: Props): boolean {
    return !_.isEqual(
      this.props.navigationState,
      nextProps.navigationState,
    )
  }

  render() {
    return this.props.render(this.props)
  }

}

export default CardStackView
