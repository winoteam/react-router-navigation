/* @flow */

import * as React from 'react'
import { matchPath, type RouterHistory } from 'react-router'
import invariant from 'invariant'
import HistoryUtils from './HistoryUtils'
import StackUtils from './StackUtils'
import RouteUtils from './RouteUtils'
import StateUtils from './StateUtils'
import type {
  Route,
  CardsRendererProps,
  NavigationState,
  Card,
  BackHandler,
} from './TypeDefinitions'

type Props = {
  history: RouterHistory,
  children: React$Node[],
  backHandler: BackHandler,
  render: (props: CardsRendererProps) => React$Node,
}

type State = {|
  key: string,
  cards: Card[],
  navigationState: NavigationState<>,
  historyRootIndex: number,
|}

export default class CardStack extends React.Component<Props, State> {
  unlistenHistory: ?Function = null

  constructor(props: Props) {
    super(props)
    const { children, history } = props
    invariant(
      history,
      'The prop `history` is marked as required in `CardStack`, but its value is `undefined` in CardStack',
    )
    invariant(
      children || React.Children.count(children) > 0,
      'A <CardStack /> must have child elements',
    )
    const { location } = history
    const entries = history.entries || [location]
    const cards = StackUtils.create(children, props)
    const key = `id-${Date.now()}`
    const navigationState = StateUtils.initialize(
      cards,
      location,
      entries,
      'history',
    )
    invariant(
      navigationState.index !== -1,
      'There is no route defined for path « %s »',
      location.pathname,
    )
    this.unlistenHistory = HistoryUtils.listen(history, this.onHistoryChange)
    const historyRootIndex = history.index - navigationState.index
    this.state = { key, cards, navigationState, historyRootIndex }
  }

  componentDidMount() {
    const { backHandler } = this.props
    backHandler.addEventListener('hardwareBackPress', this.onNavigateBack)
  }

  componentWillUnmount() {
    const { backHandler } = this.props
    if (this.unlistenHistory) this.unlistenHistory()
    backHandler.removeEventListener('hardwareBackPress', this.onNavigateBack)
  }

  componentWillReceiveProps(nextProps: Props) {
    const { children: nextChildren, history } = nextProps
    const { location } = history
    const { cards, historyRootIndex, navigationState } = this.state
    const nextCards = StackUtils.create(nextChildren, nextProps)
    const nextCard = nextCards.find(card => matchPath(location.pathname, card))
    const nextRoute = nextCard && RouteUtils.create(nextCard, location)
    const isCorrumped = StateUtils.isCorrumped(
      navigationState,
      history,
      historyRootIndex,
    )
    if (
      nextRoute &&
      nextCards &&
      (!StackUtils.shallowEqual(cards, nextCards) || isCorrumped)
    ) {
      const { location, index } = history
      const entries = history.entries || [location]
      const newKey = `id-${Date.now()}`
      const nextNavigationState = StateUtils.initialize(
        nextCards,
        location,
        entries,
        'history',
        navigationState,
      )
      invariant(
        nextNavigationState.index !== -1,
        'There is no route defined for path « %s »',
        location.pathname,
      )
      const newHistoryRootIndex = index - nextNavigationState.index
      this.setState(prevState => ({
        key: isCorrumped ? newKey : prevState.key,
        cards: nextCards,
        navigationState: nextNavigationState,
        historyRootIndex: newHistoryRootIndex,
      }))
    }
  }

  onHistoryChange = (history: RouterHistory, nextHistory: RouterHistory) => {
    const { index } = history
    const { location, action, index: nextIndex } = nextHistory
    const { navigationState, cards } = this.state
    const currentRoute = navigationState.routes[navigationState.index]
    const nextCard = cards.find(card => matchPath(location.pathname, card))
    const nextRoute = nextCard && RouteUtils.create(nextCard, location)
    if (nextRoute && !RouteUtils.equal(currentRoute, nextRoute)) {
      switch (action) {
        case 'PUSH': {
          this.setState(prevState => ({
            navigationState: StateUtils.push(
              prevState.navigationState,
              nextRoute,
            ),
          }))
          break
        }
        case 'POP': {
          const n = index - nextIndex
          this.setState(prevState => ({
            navigationState: StateUtils.pop(prevState.navigationState, n),
          }))
          break
        }
        case 'REPLACE': {
          this.setState(prevState => ({
            navigationState: StateUtils.replace(
              prevState.navigationState,
              prevState.navigationState.index,
              nextRoute,
            ),
          }))
          break
        }
        default:
      }
    }
  }

  onNavigateBack = () => {
    if (this.state.navigationState.index > 0) {
      this.props.history.goBack()
      return true
    }
    return false
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      this.state.cards !== nextState.cards ||
      this.state.navigationState !== nextState.navigationState
    )
  }

  renderCard = (route: Route) => {
    const children = React.Children.toArray(this.props.children)
    const child = children.find(({ props }) => props.path === route.name)
    if (!child) return null
    return React.cloneElement(child, route)
  }

  render() {
    return this.props.render({
      ...this.state,
      onNavigateBack: this.onNavigateBack,
      renderCard: this.renderCard,
    })
  }
}
