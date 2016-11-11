/* @flow */

import React, { Component } from 'react'
import { Dimensions, View, Text } from 'react-native'
import TabBar from './../TabBar'
import type { NavigationState, NavigationSceneProps } from './../../types'
import styles from './styles'

type Props = {
  navigationState: NavigationState,
  renderScene: (sceneProps: NavigationSceneProps) => React$Element<any>,
}

type State = {
  renderedTabs: Array<number>,
}

class TabView extends Component {

  props: Props
  stat: State

  constructor(props) {
    super(props)
    const { index } = props.navigationState
    this.state = { renderedTabs: [index] }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { renderedTabs } = this.state
    const { index } = nextProps.navigationState
    if (!renderedTabs.includes(index)) {
      this.setState({
        renderedTabs: [...renderedTabs, index],
      })
    }
  }

  render() {
    const { navigationState, renderScene } = this.props
    const { renderedTabs } = this.state
    const { routes } = navigationState
    const WrapperComponent = navigationState.component || {}
    const route = routes.find((_route, index) => index === navigationState.index)

    const hideTabBar = route.routes.slice(-1)[0].component.hideTabBar

    return (
      <WrapperComponent {...this.props}>
        <View style={styles.container}>
          <View
            style={[
              styles.wrapper,
              {
                transform: [{
                  translateX: Dimensions.get('window').width * -navigationState.index,
                }],
              },
            ]}
          >
            {routes.map((scene, index) => (
              <View key={index} style={styles.scene}>
                {renderedTabs.includes(index) ? renderScene(scene) : null}
              </View>
            ))}
          </View>
          {!hideTabBar && <TabBar {...this.props} />}
        </View>
      </WrapperComponent>
    )
  }

}

export default TabView
