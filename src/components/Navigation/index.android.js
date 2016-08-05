/* @flow */

import React, { Component, createElement } from 'react'
import { BackAndroid, StatusBar, View } from 'react-native'
import StaticContainer from 'react-static-container'
import NavBar from './../NavBar'
import CardStack from './../CardStack'
import TabView from './../TabView'
import { getCurrentRoute } from './../../helpers/utils'
import type { NavigationState, NavigationTransitionProps } from './../../types'

type Props = {
  navigationState: NavigationState,
  pop: () => void,
  changeTab: (index: number) => void,
}

class Navigation extends Component {

  props: Props

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.pop()
      return true
    })
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress')
  }

  renderScene = (sceneProps: NavigationTransitionProps): React$Element<any> => {
    const { component } = sceneProps.scene.route
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          pop={this.props.pop}
          {...sceneProps}
        />
        {createElement(component)}
      </View>
    )
  }

  getStatusBarStyle() {
    const route = getCurrentRoute(this.props.navigationState)
    if (!route) return 'default'
    return route && route.component && route.component.statusBarStyle || 'default'
  }

  render() {
    const { navigationState } = this.props
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={this.getStatusBarStyle()}
        />
        <CardStack
          navigationState={navigationState}
          pop={this.props.pop}
          renderScene={this.renderScene}
        />
      </View>
    )
  }

}

export default Navigation




//
//
//
//
//
//
//
//
//
//
//
//
//
// /* @flow */
//
// import React, { Component, createElement } from 'react'
// import { BackAndroid, View } from 'react-native'
// import NavBar from './../NavBar'
// import CardStack from './../CardStack'
// import TabView from './../TabView'
// import type { NavigationState, NavigationSceneRendererProps } from './types'
//
// type Props = {
//   navigationState: NavigationState,
//   pop: () => void,
// }
//
// class Navigation extends Component {
//
//   props: Props
//
//   componentDidMount() {
//     BackAndroid.addEventListener('hardwareBackPress', () => {
//       this.props.pop()
//       return true
//     })
//   }
//
//   componentWillUnmount() {
//     BackAndroid.removeEventListener('hardwareBackPress')
//   }
//
//   renderScene = (sceneProps: NavigationSceneRendererProps): React$Element<any> => {
//     const { component, tabs } = sceneProps.scene.route
//     return tabs
//       ? this.renderTabs(sceneProps)
//       : <View style={{ flex: 1 }}>
//           <NavBar
//             pop={this.props.pop}
//             {...sceneProps}
//           />
//           {createElement(component)}
//         </View>
//   }
//
//   renderTabs = (sceneProps: NavigationSceneRendererProps): React$Element<any> => {
//     const { children } = sceneProps.scene.route
//     return (
//       <TabView>
//         {children}
//       </TabView>
//     )
//   }
//
//   render() {
//     const { navigationState, pop } = this.props
//     return (
//       <CardStack
//         navigationState={navigationState}
//         pop={pop}
//         renderScene={this.renderScene}
//       />
//     )
//   }
//
// }
//
// export default Navigation
