/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint react/no-unused-prop-types: 0 */

import React, { Component } from 'react'
import { BackAndroid } from 'react-native'
import { Route, matchPath } from 'react-router'
import { StateUtils } from 'react-navigation'
import type { ContextRouter, Location } from 'react-router'
import type { CardsRendererProps, NavigationState, Card, CardProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'

type State = {
  location: Location,
  historyIndex: number,
  navigationState: NavigationState<{
    path?: string,
    params?: Object,
  }>,
  cards: Array<Card>,
}

type Props = {
  // eslint-disable-next-line
  children?: Array<React$Element<CardProps>>,
  render: (props: CardsRendererProps) => React$Element<any>,
}

// $FlowFixMe
type OwnProps = ContextRouter & Props

class CardStack extends Component<void, OwnProps, State> {

  props: OwnProps
  state: State

  // Initialyze navigation state with initial history
  constructor(props: OwnProps): void {
    super(props)
    // Build the card stack $FlowFixMe
    const { children, history: { entries, index }, location } = props
    const cards = children && StackUtils.build(children)
    if (!cards) throw new Error('No childre found')
    // Get initial route of navigation state
    if (!entries) throw new Error('No history entries found')
    // Build navigation state
    const navigationState = entries.reduce((state, entry) => {
      const card = cards.find(({ path, exact, strict }) => {
        return matchPath(entry.pathname, { path, exact, strict })
      })
      if (!card || !card.path) return state
      const route = StackUtils.getRoute(cards, entry)
      return {
        index: matchPath(location.pathname, card)
          ? state.routes.length
          : state.index,
        routes: [
          ...state.routes,
          route,
        ],
      }
    }, { index: -1, routes: [] })
    // Get history index
    const historyIndex = index || 0
    // Save everything in component state
    this.state = { navigationState, cards, location, historyIndex }
  }

  // Listen hardware BackAndroid event
  componentDidMount(): void {
    BackAndroid.addEventListener('hardwareBackPress', this.onNavigateBack)
  }

  // Remove all listeners
  componentWillUnmount(): void {
    BackAndroid.removeEventListener('hardwareBackPress', this.onNavigateBack)
  }

  // Listen all history events
  componentWillReceiveProps(nextProps: OwnProps): void {
    const { history: { action, entries }, location } = nextProps
    const { cards, navigationState: { routes, index } } = this.state
    // Get current card
    const currentRoute = routes[index]
    const currentCard = cards.find(({ key }) => key === currentRoute.routeName)
    // Get next card
    const nextRoute = StackUtils.getRoute(cards, location)
    if (!nextRoute) return
    const nextCard = cards.find(({ key }) => key === nextRoute.routeName)
    // Local state must be updated ?
    if (
      currentCard && nextCard &&
      StackUtils.shouldUpdate(currentCard, nextCard, this.state.location, location)
    ) {
      const key = StackUtils.createKey(nextRoute)
      switch (action) {
        case 'PUSH': {
          this.setState(state => ({
            location,
            historyIndex: nextProps.history.index,
            navigationState: StateUtils.push(
              state.navigationState,
              { ...nextRoute, key },
            ),
          }))
          break
        }
        case 'POP': {
          if (
            this.props.history.index === undefined ||
            nextProps.history.index === undefined ||
            entries === undefined
          ) {
            return
          }
          const n = this.state.historyIndex - nextProps.history.index
          if (n > 1) {
            this.setState(state => ({
              location,
              historyIndex: nextProps.history.index,
              navigationState: StateUtils.reset(
                state.navigationState,
                state.navigationState.routes.slice(
                  0,
                  (state.navigationState.index - n) + 1,
                ),
                state.navigationState.index - n,
              ),
            }))
          } else {
            this.setState(state => ({
              location,
              historyIndex: nextProps.history.index,
              navigationState: StateUtils.pop(state.navigationState),
            }))
          }
          break
        }
        case 'REPLACE': {
          this.setState(state => ({
            location,
            historyIndex: nextProps.history.index,
            navigationState: StateUtils.replaceAtIndex(
              state.navigationState,
              state.navigationState.index,
              { ...nextRoute, key },
            ),
          }))
          break
        }
        default:
      }
    }
  }

  // Pop to previous scene (n-1)
  onNavigateBack = (): boolean => {
    if (this.state.navigationState.index > 0) {
      this.props.history.goBack()
      return true
    }
    return false
  }

  // Render view
  render(): React$Element<any> {
    return this.props.render({
      ...this.state,
      match: this.props.match,
      location: this.props.location,
      history: this.props.history,
      onNavigateBack: this.onNavigateBack,
    })
  }

}

export default (props: Props) => (
  <Route>
    {(ownProps: ContextRouter) => (
      <CardStack
        {...props}
        {...ownProps}
      />
    )}
  </Route>
)
