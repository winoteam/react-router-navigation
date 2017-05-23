/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint react/no-unused-prop-types: 0 */

import React from 'react'
import { BackHandler } from 'react-native'
import isEqual from 'lodash.isequal'
import { matchPath } from 'react-router'
import { StateUtils } from 'react-navigation'
import type { RouterHistory, Location } from 'react-router'
import type { CardsRendererProps, NavigationState, Card } from './TypeDefinitions'
import * as StackUtils from './StackUtils'

type State = {
  navigationState: NavigationState<{}>,
  cards: Array<Card>,
  historyIndex: number,
}

type Props = {
  // eslint-disable-next-line
  location: Location,
  history: RouterHistory,
  // eslint-disable-next-line
  children?: Array<React$Element<any>>,
  render: (props: CardsRendererProps) => React$Element<any>,
}

class CardStack extends React.Component<void, Props, State> {

  props: Props
  state: State

  // Initialyze navigation state with initial history
  constructor(props: Props): void {
    super(props)
    // Build the card stack
    const { children, history: { entries, index, location } } = props
    const cards = children && StackUtils.build(children)
    if (!cards) throw new Error('No initial route found')
    // Get initial route of navigation state
    if (!entries || index === undefined) throw new Error('No history entries found')
    // Build navigation state
    const navigationState = entries.reduce((state, entry) => {
      const card = cards.find(({ path, exact, strict }) => {
        return matchPath(entry.pathname, { path, exact, strict })
      })
      if (!card || !card.path) return state
      const route = StackUtils.getRoute(cards, entry)
      if (!route) return state
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
    this.state = { navigationState, cards, historyIndex: index }
  }

  // Listen hardware BackHandler event
  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.onNavigateBack)
  }

  // Remove all listeners
  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.onNavigateBack)
  }

  // Listen all history events
  componentWillReceiveProps(nextProps: Props): void {
    const { location, history: { entries } } = this.props
    const { location: nextLocation, history: { action, index: nextIndexHistory } } = nextProps
    const { cards, navigationState: { routes, index }, historyIndex } = this.state
    // Re-build cards
    // Get current card
    const currentRoute = routes[index]
    const currentCard = cards.find(({ key }) => key === currentRoute.routeName)
    // Get next card
    const nextRoute = StackUtils.getRoute(cards, nextLocation)
    if (!nextRoute) return
    const nextCard = cards.find(({ key }) => key === nextRoute.routeName)
    // Local state must be updated ?
    if (
      currentCard && nextCard &&
      StackUtils.shouldUpdate(currentCard, nextCard, location, nextLocation)
    ) {
      const key = StackUtils.createKey(nextRoute)
      switch (action) {
        case 'PUSH': {
          this.setState(state => ({
            navigationState: StateUtils.push(
              state.navigationState,
              { ...nextRoute, key },
            ),
          }))
          break
        }
        case 'POP': {
          if (
            historyIndex === undefined ||
            nextIndexHistory === undefined ||
            entries === undefined
          ) {
            return
          }
          const n = historyIndex - nextIndexHistory
          if (n > 1) {
            this.setState(state => ({
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
              navigationState: StateUtils.pop(state.navigationState),
            }))
          }
          break
        }
        case 'REPLACE': {
          this.setState(state => ({
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
      // Save historyIndex
      if (historyIndex >= 0) this.state.historyIndex = historyIndex
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

  // Diff navigation state
  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return !isEqual(this.state.navigationState, nextState.navigationState)
  }

  // Render view
  render(): React$Element<any> {
    return this.props.render({
      ...this.state,
      history: this.props.history,
      onNavigateBack: this.onNavigateBack,
    })
  }

}

export default CardStack
