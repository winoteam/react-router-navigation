/* @flow */

import React, { Component, cloneElement } from 'react'
import { Animated, Navigator, Platform, StyleSheet, View } from 'react-native'
import type { CardRendererProps } from './TypeDefinitions'

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 64 : 56,
    backgroundColor: '#e9e9ee',
  },
})

type Scene = { key: string }

type DefaultProps = {
  renderNavBar: () => ?React$Element<any>,
}

type Props = CardRendererProps & {
  renderScene: (scene: Scene) => ?React$Element<any>,
  renderNavBar?: (position?: Animated.Value) => ?React$Element<any>,
}

type State = {
  isTransitioning: boolean,
  index: number,
}

class NativeRenderer extends Component<DefaultProps, Props, State> {

  props: Props

  state: State = {
    isTransitioning: false,
    index: 0,
  }

  navigator: Navigator

  componentWillReceiveProps(nextProps: Props): void {
    const { navigationState } = this.props
    const currentRoute = navigationState.routes[navigationState.index]
    const nextNavigationState = nextProps.navigationState
    const nextRoute = nextNavigationState.routes[nextNavigationState.index]
    // Test if navigation state changes
    if (currentRoute.key !== nextRoute.key) {
      // Update navigator state
      if ((navigationState.index + 1) === nextNavigationState.index) {
        this.navigator.push(nextRoute) // case 1) PUSH
      } else if (
        navigationState.index === nextNavigationState.index &&
        currentRoute.key !== nextRoute.key
      ) {
        this.navigator.replace(nextRoute) // case 2) REPLACE
      } else if (navigationState.index > nextNavigationState.index) {
        // Warning, special case when POP is called with swipe back
        const routes = this.navigator.getCurrentRoutes()
        if (nextNavigationState.routes.length !== routes.length) {
          const n = navigationState.index - nextNavigationState.index
          this.navigator.popN(n) // case 3) POP
        }
      }
    }
  }

  renderScene = (scene: Scene): React$Element<any> => {
    // Get card state
    const { navigationState } = this.props
    const index = navigationState.routes.findIndex((route) => {
      return route.key === scene.key
    })
    const isActive = navigationState.routes[navigationState.index].key === scene.key
    if (isActive && index !== this.state.index) {
      this.state.index = index
      this.state.isTransitioning = true
    }
    const cardState = {
      isFocused: isActive,
      isTransitioning: this.state.isTransitioning,
    }
    // Render scene
    const component = this.props.renderScene(scene)
    return (
      <View style={styles.scene}>
        {component && cloneElement(
          component,
          cardState,
        )}
      </View>
    )
  }

  onTransitionEnd = (): void => {
    this.setState({ isTransitioning: false })
  }

  render(): React$Element<any> {
    const { navigationState, renderNavBar } = this.props
    return (
      <Navigator
        ref={(c) => this.navigator = c}
        initialRoute={navigationState.routes[navigationState.index]}
        renderScene={this.renderScene}
        navigationBar={renderNavBar()}
        configureScene={() => ({
          ...Navigator.SceneConfigs.PushFromRight,
          gestures: {},
        })}
        onDidFocus={this.onTransitionEnd}
      />
    )
  }

}

export default NativeRenderer
