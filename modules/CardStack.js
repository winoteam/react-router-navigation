/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint react/no-unused-prop-types: 0 */

import { Component } from 'react'
import { BackHandler } from 'react-native'
import { matchPath } from 'react-router'
import { StateUtils } from 'react-navigation'
import type { ContextRouter, Location, HistoryAction } from 'react-router'
import isEqual from 'lodash.isequal'
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

type Props = ContextRouter & {
  // eslint-disable-next-line
  children?: Array<React$Element<CardProps>>,
  render: (props: CardsRendererProps) => React$Element<any>,
}

class CardStack extends Component<void, Props, State> {

  props: Props
  state: State

  unlistenHistory: Function

  // Initialyze navigation state with initial history
  constructor(props: Props): void {
    super(props)
    // Build the card stack $FlowFixMe
    const { children, history: { entries, index, location } } = props
    const cards = children && StackUtils.build(children)
    if (!cards) throw new Error('No cards found')
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

  // Listen hardware BackHandler event
  componentDidMount(): void {
    const { history } = this.props
    BackHandler.addEventListener('hardwareBackPress', this.onNavigateBack)
    this.unlistenHistory = history.listen(this.onChangeHistory)
  }

  // Remove all listeners
  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.onNavigateBack)
    this.unlistenHistory()
  }

  // Listen all history events
  onChangeHistory = (location: Location, action: HistoryAction): void => {
    const { history: { entries, index: indexHistory } } = this.props
    const { cards, navigationState: { routes, index } } = this.state
    // Re-build cards
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
            historyIndex: indexHistory,
            navigationState: StateUtils.push(
              state.navigationState,
              { ...nextRoute, key },
            ),
          }))
          break
        }
        case 'POP': {
          if (
            indexHistory === undefined ||
            indexHistory === undefined ||
            entries === undefined
          ) {
            return
          }
          const n = this.state.historyIndex - indexHistory
          if (n > 1) {
            this.setState(state => ({
              location,
              historyIndex: indexHistory,
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
              historyIndex: indexHistory,
              navigationState: StateUtils.pop(state.navigationState),
            }))
          }
          break
        }
        case 'REPLACE': {
          this.setState(state => ({
            location,
            historyIndex: indexHistory,
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

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return !isEqual(
      this.state.navigationState.routes
        .map(({ match }) => {
          return match.url
        }),
      nextState.navigationState.routes
        .map(({ match }) => {
          return match.url
        }),
    )
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

export default CardStack
