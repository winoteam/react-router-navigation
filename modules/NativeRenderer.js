/* @flow */

import React, { Component, cloneElement } from 'react'
import { Animated, Navigator, StyleSheet, View } from 'react-native'
import type { NavigationState, NavigationSceneRendererProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#e9e9ee',
  },
})

type Scene = { key: string }

type Props = {
  navigationState: NavigationState,
  renderScene: (props: NavigationSceneRendererProps & { scene: Scene }) => ?React$Element<any>,
  renderNavBar: (props: NavigationSceneRendererProps) => React$Element<any>,
}

type State = {
  isTransitioning: boolean,
  index: number,
}

class NativeRenderer extends Component<void, Props, State> {

  props: Props

  state: State = {
    isTransitioning: false,
    index: 0,
  }

  pan: Animated.Value = new Animated.Value(0)

  navigator: Navigator

  componentWillReceiveProps(nextProps: Props): void {
    const { navigationState } = this.props
    const nextNavigationState = nextProps.navigationState
    const currentRoute = nextNavigationState.routes[nextNavigationState.index]
    // Test if navigation state changes
    if (navigationState.index !== nextNavigationState.index) {
      // Update animated position for <NavigationHeader />
      Animated.timing(
        this.pan,
        { toValue: nextNavigationState.index, duration: 375 },
      ).start()
      // Update navigator state
      if (navigationState.index < nextNavigationState.index) {
        this.navigator.push(currentRoute)
      } else {
        const n = navigationState.index - nextNavigationState.index
        this.navigator.popN(n)
      }
    }
  }

  renderScene = (scene: Scene): React$Element<any> => {
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
    const { navigationState } = this.props
    return (
      <Navigator
        ref={(c) => this.navigator = c}
        initialRoute={navigationState.routes[navigationState.index]}
        renderScene={this.renderScene}
        navigationBar={this.props.renderNavBar(this.pan)}
        configureScene={() => Navigator.SceneConfigs.PushFromRight}
        onDidFocus={this.onTransitionEnd}
      />
    )
  }

}

export default NativeRenderer
