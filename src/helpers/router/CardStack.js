/* @flow */

import React, { PropTypes, Component } from 'react'
import { NavigationExperimental, View } from 'react-native'

const {
  Transitioner: NavigationTransitioner,
  CardStack: NavigationCardStack,
  Card: NavigationCard,
} = NavigationExperimental

const {
  CardStackPanResponder,
  CardStackStyleInterpolator,
} = NavigationCard

const {
  Directions,
} = CardStackPanResponder;

export default class Stack extends Component {
  static propTypes = {
    navigationState: PropTypes.object.isRequired,
    style: View.propTypes.style,
    render: PropTypes.func,
  }

  state = {
    inTransition: false,
  }

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
    const isVertical = this.props.direction === 'vertical'

    const style = isVertical ?
      CardStackStyleInterpolator.forVertical(props) :
      CardStackStyleInterpolator.forHorizontal(props)

    const panHandlersProps = {
      ...props,
      onNavigateBack: this.props.onNavigateBack,
    }
    const panHandlers = isVertical ?
      CardStackPanResponder.forVertical(panHandlersProps) :
      CardStackPanResponder.forHorizontal(panHandlersProps)

    return (
      <NavigationCard
        {...props}
        key={'card_' + props.scene.key}
        panHandlers={panHandlers}
        renderScene={this.props.renderScene}
        style={[style, this.props.cardStyle]}
      />
    )
  }

  render() {
    return (
      <NavigationTransitioner
        navigationState={this.props.navigationState}
        render={(props) => this.renderScenes(props)}
        style={this.props.style}
      />
    )
  }

}
