/* @flow */

import React, { Component } from 'react'
import { Platform, NavigationExperimental, View } from 'react-native'
import StyleInterpolator from './../../utils/StyleInterpolator'

const {
  Transitioner: NavigationTransitioner,
  Card: NavigationCard,
} = NavigationExperimental

const {
  CardStackPanResponder,
} = NavigationCard

class CardStack extends Component {

  renderScenes = (props): React$Element<any> => {
    const { renderOverlay } = this.props
    const overlay = renderOverlay && renderOverlay(props)

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
        {overlay}
      </View>
    )
  }

  renderScene = (props): React$Element<any> => {
    const style = Platform.OS == 'android' ?
      StyleInterpolator.forAndroid(props) :
      StyleInterpolator.forIOS(props)

    const panHandlersProps = {
      ...props,
      onNavigateBack: this.props.pop,
    }
    const panHandlers = Platform.OS == 'android' ?
      CardStackPanResponder.forVertical(panHandlersProps) :
      CardStackPanResponder.forHorizontal(panHandlersProps)

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
