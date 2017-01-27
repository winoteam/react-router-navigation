/* @flow */

import React, { Children, Component } from 'react'
import { Navigator } from 'react-native'
import type { SceneRendererProps } from 'react-native-tab-view/src/TabViewTypeDefinitions'

type NavigatorRoute = {
  key: string,
}

type Props = SceneRendererProps & {
  children?: Array<React$Element<any>>,
}

class TabViewPagerNavigator extends Component<void, Props, void> {

  navigator: any

  componentWillReceiveProps(nextProps: Props): void {
    const routes = this.navigator.getCurrentRoutes()
    const { navigationState } = this.props
    const nextNavigationState = nextProps.navigationState
    const currentRoute = nextNavigationState.routes[nextNavigationState.index]
    // Test if navigation state changes
    if (navigationState.index !== nextNavigationState.index) {
      // Test if route is already mount or not
      // into <Navigator /> and jump to it
      if (!routes.find((route) => route.key === currentRoute.key)) {
        this.navigator.push(currentRoute)
      } else {
        this.navigator.jumpTo(currentRoute)
      }
    }
  }

  renderScene = (route: NavigatorRoute): ?React$Element<any> => {
    // Get scene from children generated
    // with <TabViewAnimated />
    const { children, navigationState } = this.props
    const sceneIndex = navigationState.routes.findIndex(({ key }) => key === route.key)
    const currentChild = Children.toArray(children)[sceneIndex]
    if (!currentChild) return null
    return currentChild.props.children
  }

  render(): React$Element<any> {
    const { navigationState } = this.props
    return (
      <Navigator
        ref={(c) => this.navigator = c}
        initialRoute={navigationState.routes[navigationState.index]}
        renderScene={this.renderScene}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
      />
    )
  }

}

export default TabViewPagerNavigator
