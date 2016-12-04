/* @flow */

import React, { createElement, PropTypes, Component } from 'react'
import { Platform, NavigationExperimental, StyleSheet } from 'react-native'
import { TabViewAnimated, TabViewPagerAndroid, TabViewPagerScroll } from 'react-native-tab-view'
import { getRoute, initNavigationState } from './utils'
import type { NavigationState, Match, Location, History, Route } from './../types'

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

type Props = {
  children: Array<React$Element<any>>,
}

type Context = {
  location: Location,
  match: Match,
  history: History,
}

type State = NavigationState

class CardStack extends Component<void, Props, State> {

  props: Props
  state: State
  context: Context

  static contextTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
  }

  constructor(props: Props, context: Context): void {
    super(props, context)
    // Initialyze state with a first route
    const { children } = props
    const { match, history } = context
    const { location } = history
    const parent = match && match.parent
    const route = getRoute({ children, parent, location })
    this.state = initNavigationState(route, children, true)
  }

  componentDidMount() {
    // Listen history from <MemoryRouter />
    const { history } = this.context
    this.unlistenHistory = history.listen(this.onListenHistory)
  }

  componentWillUnmount() {
    // Remove listeners
    this.unlistenHistory()
  }

  onListenHistory = (): void => {
    // Get current route
    const navigationState = this.state
    const route = navigationState.routes[navigationState.index].component
    // Get next route
    const { children } = this.props
    const { match } = this.context
    const { history } = this.context
    const { action, location } = history
    const parent = match && match.parent
    const nextRoute = getRoute({ children, parent, location })
    // Local state must be updated ?
    if (nextRoute && route.props.pattern !== nextRoute.props.pattern) {
      if (action === 'REPLACE') {
        const index = navigationState.routes
          .findIndex(({ key }) => key === nextRoute.props.pattern)
        this.setState(
          NavigationStateUtils.jumpToIndex(
            navigationState,
            index,
          ),
        )
      }
    }
  }

  handleChangeTab = (index: number): void => {
    // When tabs index changes, replace new route in history
    const { key } = this.state.routes[index]
    this.context.history.replace(key)
  }

  renderLabel = ({ route }: { route: Route }): React$Element<any> => {
    const scene = this.props.routes
      .find(({ key }) => key === route.key)
    if (!scene) return null
    return (
      <Text style={styles.tabLabel}>
        {scene.props.component.title}
      </Text>
    )
  }

  renderScene = ({ route }: { route: Route }): ?React$Element<any> => {
    const scene = this.state.routes
      .find(({ key }) => key === route.key)
    if (!scene) return null
    return createElement(
      scene.component.props.component,
      { key: route.key },
    )
  }

  renderPager = (sceneProps): React$Element<any> => {
    const { renderPager } = this.props
    if (renderPager) {
      return renderPager({
        ...sceneProps,
        renderScene: this.renderScene,
      })
    }
    return Platform.OS === 'ios'
      ? <TabViewPagerScroll {...sceneProps} />
      : <TabViewPagerAndroid {...sceneProps} />
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return this.state.index !== nextState.index
  }

  render(): React$Element<any> {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderFooter={this.props.renderFooter}
        renderPager={this.renderPager}
        renderScene={this.renderScene}
        onRequestChangeTab={this.handleChangeTab}
        configureTransition={() => null}
      />
    )
  }

}

export default CardStack
