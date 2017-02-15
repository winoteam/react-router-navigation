/* @flow */
/* eslint no-duplicate-imports: 0 */

import { Component } from 'react'
import { BackAndroid } from 'react-native'
import { StateUtils } from 'react-navigation'
import { matchPath, withRouter } from 'react-router'
import type { RouterHistory } from 'react-router'
import isEqual from 'lodash.isequal'
import type { CardRendererProps, NavigationState, Cards, CardProps } from './TypeDefinitions'
import getCurrentRoute from './getCurrentRoute'
import buildStack from './buildStack'
import normalizeRoute from './normalizeRoute'
import shouldStackUpdate from './shouldStackUpdate'

type State = {
  navigationState: NavigationState,
  cards: Cards,
}

type Props = RouterHistory & {
  children: Array<React$Element<CardProps>>,
  render: (props: CardRendererProps) => React$Element<any>,
}

class CardStack extends Component<void, Props, State> {

  props: Props
  state: State

  static displayName = 'CardStack'

  // Initialyze navigation state with initial history
  constructor(props: Props): void {
    super(props)
    // Build the card stack
    const { children, entries, location } = props
    const cards = buildStack(children)
    // Get initial route of navigation state
    if (!entries) throw new Error('No history entries found')
    // Build navigation state
    const navigationState = entries.reduce((state, { pathname }) => {
      const card = cards.find(({ path, exact, strict }) => {
        return matchPath(pathname, path, { exact, strict })
      })
      if (!card || !card.path) return state
      return {
        index: matchPath(location.pathname, card.path, card)
          ? state.routes.length
          : state.index,
        routes: [...state.routes, { key: card.key }],
      }
    }, { index: -1, routes: [] })
    // Save everything in component state
    this.state = { navigationState, cards }
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
  componentWillReceiveProps(nextProps): void {
    const { location: previousLocation } = this.props
    const { cards, navigationState } = this.state
    const { action, location, index } = nextProps
    // Get current card
    const currentRoute = normalizeRoute(navigationState.routes[navigationState.index])
    const currentCard = cards.find(({ key }) => key === currentRoute.key)
    // Get next card
    const nextRoute = getCurrentRoute(cards, location)
    const nextCard = cards.find(({ key }) => nextRoute && key === nextRoute.key)
    // Local state must be updated ?
    if (
      (currentCard && nextRoute && nextCard && index !== undefined) &&
      shouldStackUpdate(currentCard, nextCard, nextProps, previousLocation)
    ) {
      const key = `${nextRoute.key}@@${Date.now()}`
      switch (action) {
        case 'PUSH': {
          this.setState({
            navigationState: StateUtils.push(
              navigationState,
              { key },
            ),
          })
          break
        }
        case 'POP': {
          const n = this.props.index - nextProps.index
          if (n > 1) {
            this.setState({
              navigationState: StateUtils.reset(
                navigationState,
                navigationState.routes.slice(
                  0,
                  (navigationState.index - n) + 1,
                ),
                navigationState.index - n,
              ),
            })
          } else {
            this.setState({
              navigationState: StateUtils.pop(navigationState),
            })
          }
          break
        }
        case 'REPLACE': {
          this.setState({
            navigationState: StateUtils.replaceAtIndex(
              navigationState,
              navigationState.index,
              { key },
            ),
          })
          break
        }
        default:
      }
    }
  }

  // Pop to previous scene (n-1)
  onNavigateBack = (): boolean => {
    if (this.state.navigationState.index > 0) {
      this.props.goBack()
      return true
    }
    return false
  }

  // Render when setState is calls
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState)
  }

  // Render view
  render(): React$Element<any> {
    return this.props.render({
      ...this.state,
      onNavigateBack: this.onNavigateBack,
    })
  }

}

export default withRouter(CardStack)
