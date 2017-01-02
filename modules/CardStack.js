/* @flow */

import React, { PropTypes, Component } from 'react'
import { BackAndroid, NavigationExperimental } from 'react-native'
import _ from 'lodash'
import { matchPattern } from 'react-router'
import type { NavigationState, NavigationTransitionProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Card, MatchCardProps } from './StackTypeDefinitions'
import CardStackView from './CardStackView'
import { getCurrentRoute, buildCards, normalizeRoute } from './utils'

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
    const { location } = history
    const parent = match && match.parent
    const currentRoute = getCurrentRoute(cards, parent, location)
    const currentCard = currentRoute && cards.find((card) => card.key === currentRoute.key)
    // Build navigation state
    const entries = history.entries.filter((entry) => {
      return cards.find((card) => matchPattern(card.pattern, entry, card.exactly))
    })
    const index = entries.findIndex((entry) => {
      if (!currentCard) return false
      return matchPattern(currentCard.pattern, entry, currentCard.exactly)
    })
    const routes = entries.map((entry) => {
      const card = cards.find(({ pattern, exactly }) => matchPattern(pattern, entry, exactly))
      if (!card) return { key: entry.pathname }
      return { key: card.key }
    })
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
    const { cards, navigationState } = this.state
    const currentRoute = normalizeRoute(navigationState.routes[navigationState.index])
    const currentCard = cards.find((card) => card.key === currentRoute.key)
    // Get next route
    const { history, match } = this.context
    const { action, location } = history
    const { entries, index } = history
    const parent = match && match.parent
    const nextRoute = getCurrentRoute(cards, parent, location)
    // Local state must be updated ?
    if (nextRoute && currentCard && (
      // Basic pathname
      (currentCard.pattern !== nextRoute.key) ||
      // Pathname with query params
      (matchPattern(currentRoute.key, location, true) &&
       matchPattern(nextRoute.key, location, true) &&
       entries[index].pathname !== entries[index - 1].pathname
      )
    )) {
      // Note: Extra '@@xxx' is removed with normalizeRoute()
      const key = `${nextRoute.key}@@${Date.now()}`
      switch (action) {
        case 'PUSH':
          this.setState({
            navigationState: NavigationStateUtils.push(
              navigationState,
              { key },
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
              { key },
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


  renderView = (transitionProps: NavigationTransitionProps): React$Element<any> => {
    return (
      <CardStackView
        {...transitionProps}
        cards={this.state.cards}
        render={this.props.render}
        onNavigateBack={this.onNavigateBack}
      />
    )
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
        render={this.renderView}
      />
    )
  }

}

export default CardStack
