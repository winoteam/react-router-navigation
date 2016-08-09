/* @flow */

import React, { Component, createElement } from 'react'
import { Platform, NavigationExperimental, View } from 'react-native'
import StyleInterpolator from './../../helpers/StyleInterpolator'
import type { NavigationState, NavigationSceneProps } from './../../types'

const {
  Transitioner: NavigationTransitioner,
  Card: NavigationCard,
} = NavigationExperimental

const {
  CardStackPanResponder,
} = NavigationCard

type Props = {
  navigationState: NavigationState,
  renderScene: (sceneProps: NavigationSceneProps) => React$Element<any>,
  renderHeader?: (sceneProps: NavigationSceneProps) => React$Element<any> | null,
  pop: () => void,
}

class CardStack extends Component {

  props: Props

  renderScenes = (props: any): React$Element<any> => {
    const { renderHeader } = this.props
    const scenes = props.scenes.map((scene) => (
      this.renderScene({
        ...props,
        scene,
      })
    ))
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {scenes}
        </View>
        {renderHeader && createElement(renderHeader, props)}
      </View>
    )
  }

  renderScene = (props: NavigationSceneProps): React$Element<any> => {
    const style = Platform.OS === 'android' ?
      StyleInterpolator.forAndroid(props) :
      StyleInterpolator.forIOS(props)

    /** @TODO pass StyleInterpolator via props **/

    const panHandlersProps = {
      ...props,
      onNavigateBack: this.props.pop,
    }
    const panHandlers = Platform.OS === 'ios'
      ? CardStackPanResponder.forHorizontal(panHandlersProps)
      : null

    return (
      <NavigationCard
        {...props}
        key={props.scene.key}
        panHandlers={panHandlers}
        renderScene={this.props.renderScene}
        style={style}
      />
    )
  }

  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.navigationState.index !== nextProps.navigationState.index ||
      this.props.navigationState.key !== nextProps.navigationState.key
    )
  }

  render() {
    return (
      <NavigationTransitioner
        navigationState={this.props.navigationState}
        render={this.renderScenes}
      />
    )
  }

}

export default CardStack
