/* @flow */

import React, { Component, cloneElement } from 'react'
import { Navigator, StyleSheet, View } from 'react-native'
import type { NavigationState, NavigationSceneRendererProps } from 'react-native-tab-view/src/TabViewTypeDefinitions'

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

  navigator: Navigator

  componentWillReceiveProps(nextProps: Props): void {
    const { navigationState } = this.props
    const nextNavigationState = nextProps.navigationState
    const currentRoute = nextNavigationState.routes[nextNavigationState.index]
    // Test if navigation state changes
    if (navigationState.index !== nextNavigationState.index) {
      if (navigationState.index < nextNavigationState.index) {
        this.navigator.push(currentRoute)
      } else {
        const n = navigationState.index - nextNavigationState.index
        this.navigator.popN(n)
      }
    }
  }

  onTransitionEnd = (): void => {
    this.setState({ isTransitioning: false })
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
    return (
      <View style={styles.scene}>
        {cloneElement(
          this.props.renderScene(scene),
          cardState,
        )}
      </View>
    )
  }

  render(): React$Element<any> {
    const { navigationState } = this.props
    return (
      <Navigator
        ref={(c) => this.navigator = c}
        initialRoute={navigationState.routes[navigationState.index]}
        renderScene={this.renderScene}
        navigationBar={this.props.renderNavBar}
        configureScene={() => Navigator.SceneConfigs.PushFromRight}
        onDidFocus={this.onTransitionEnd}
      />
    )
  }

}

export default NativeRenderer
