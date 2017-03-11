/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint react/no-unused-prop-types: 0 */

import React, { Component } from 'react'
import { BackAndroid } from 'react-native'
import { Route, matchPath } from 'react-router'
import { StateUtils } from 'react-navigation'
import type { ContextRouter } from 'react-router'
import type { CardsRendererProps, NavigationState, Card, CardProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'

type State = {
  location: Location,
  navigationState: NavigationState<{
    path?: string,
    params?: Object,
  }>,
  cards: Array<Card>,
}

type Props = {
  children?: Array<React$Element<CardProps>>,
  render: (props: CardsRendererProps) => React$Element<any>,
}

class CardStack extends Component<void, (Props & ContextRouter), State> {

  props: (Props & ContextRouter)
  state: State

  // Initialyze navigation state with initial history
  constructor(props: Props): void {
    super(props)
    // Build the card stack $FlowFixMe
    const { children, history: { entries }, location } = props
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
    // Save everything in component state
    this.state = { navigationState, cards, location }
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
  componentWillReceiveProps(nextProps: ContextRouter): void {
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
          this.setState((state) => ({
            location,
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
          const currentIndex = entries.findIndex(({ pathname }) => matchPath(pathname, currentCard))
          const n = currentIndex - parseInt(nextProps.history.index)
          if (n > 1) {
            this.setState((state) => ({
              location,
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
            this.setState((state) => ({
              location,
              navigationState: StateUtils.pop(state.navigationState),
            }))
          }
          break
        }
        case 'REPLACE': {
          this.setState((state) => ({
            location,
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
      onNavigateBack: this.onNavigateBack,
    })
  }

}

export default (props: Props) => (
  <Route>
    {(ownProps) => (
      <CardStack
        {...props}
        {...ownProps}
      />
    )}
  </Route>
)
