/* @flow */

import React, { PropTypes, Component } from 'react'
import { BackAndroid, NavigationExperimental } from 'react-native'
import _ from 'lodash'
import { matchPattern } from 'react-router'
import type { NavigationState, NavigationTransitionProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Card, MatchCardProps } from './StackTypeDefinitions'
import CardStackView from './CardStackView'
import { getCurrentRoute, buildCards } from './utils'

const {
  Transitioner: NavigationTransitioner,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental

type Props = {
  children: Array<React$Element<MatchCardProps>>,
  render: (
    props: NavigationTransitionProps & {
      cards: Array<Card>,
      onNavigateBack: Function,
    }) => React$Element<any>,
}

// @TODO tpye check match and history
type Context = {
  match: any,
  history: any,
}

type State = {
  navigationState: NavigationState,
  cards: Array<Card>,
}

class CardStack extends Component<void, Props, State> {

  props: Props
  state: State
  context: Context

  unlistenHistory: Function

  static contextTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
  }

  // Initialyze navigation state with
  // initial history
  constructor(props: Props, context: Context): void {
    super(props, context)
    // Build the card stack
    const { children } = props
    const cards = buildCards(children)
    // Get initial route of navigation state
    const { match, history } = context
    const { location, entries } = history
    const parent = match && match.parent
    const currentRoute = getCurrentRoute(cards, parent, location)
    const currentCard = currentRoute && cards.find((card) => card.key === currentRoute.key)
    // Build navigation state
    const index = entries.findIndex(({ pathname }) => {
      if (!currentCard) return false
      return matchPattern(currentCard.pattern, { pathname }, currentCard.exactly)
    })
    const routes = entries.reduce((acc, { pathname }) => {
      const entry = cards.find((card) => {
        return matchPattern(card.pattern, { pathname }, card.exactly)
      })
      if (!entry) return acc
      return [...acc, { key: entry.pattern }]
    }, [])
    const navigationState = { index, routes }
    // Save everything in local state
    this.state = { navigationState, cards }
  }

  // Listen history from <MemoryRouter /> and
  // hardware BackAndroid event
  componentDidMount(): void {
    const { history } = this.context
    this.unlistenHistory = history.listen(this.onListenHistory)
    BackAndroid.addEventListener('hardwareBackPress', this.onNavigateBack)
  }

  // Remove all listeners
  componentWillUnmount(): void {
    this.unlistenHistory()
    BackAndroid.removeEventListener('hardwareBackPress', this.onNavigateBack)
  }

  // Listen all history events
  onListenHistory = (): void => {
    // Get current route
    const { navigationState, cards } = this.state
    const currentRoute = navigationState.routes[navigationState.index]
    const currentCard = cards.find((card) => card.key === currentRoute.key)
    // Get next route
    const { history, match } = this.context
    const { action, location } = history
    const parent = match && match.parent
    const nextRoute = getCurrentRoute(cards, parent, location)
    // Local state must be updated ?
    if (nextRoute && currentCard && currentCard.pattern !== nextRoute.key) {
      switch (action) {
        case 'PUSH':
          this.setState({
            navigationState: NavigationStateUtils.push(
              navigationState,
              { key: nextRoute.key },
            ),
          })
          break
        case 'POP':
          this.setState({
            navigationState: NavigationStateUtils.pop(navigationState),
          })
          break
        case 'REPLACE':
          this.setState({
            navigationState: NavigationStateUtils.replaceAtIndex(
              navigationState,
              navigationState.index,
              { key: nextRoute.key },
            ),
          })
          break
        default:
      }
    }
  }

  // Pop to previous scene (n-1)
  onNavigateBack = (): boolean => {
    if (this.state.navigationState.index > 0) {
      this.context.history.goBack()
      return true
    }
    return false
  }

  // Render when index is updated or when
  // one route is updated
  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return !_.isEqual(
      this.state.navigationState,
      nextState.navigationState,
    )
  }

  // Render into <NavigationTransitioner /> with
  // custom render() prop
  // !! Warning: transitions are disabled by default !!
  render(): React$Element<any> {
    return (
      <NavigationTransitioner
        navigationState={this.state.navigationState}
        configureTransition={() => null}
        render={(props: NavigationTransitionProps) => (
          <CardStackView
            {...props}
            cards={this.state.cards}
            render={this.props.render}
            onNavigateBack={this.onNavigateBack}
          />
        )}
      />
    )
  }

}

export default CardStack
