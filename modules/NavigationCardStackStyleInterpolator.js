/* @flow */

import { I18nManager, Platform } from 'react-native'
import type { NavigationSceneRendererProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'

function forInitial(props: NavigationSceneRendererProps): Object {
  const {
    navigationState,
    scene,
  } = props
  const focused = navigationState.index === scene.index
  const opacity = focused ? 1 : 0
  const translateX = focused ? 0 : 1000000
  const translateY = focused ? 0 : Platform.OS === 'android' ? 100 : 1000000
  return {
    opacity,
    transform: [
      { translateX },
      { translateY },
    ],
  }
}

function forIOS(props: NavigationSceneRendererProps): Object {
  const {
    layout,
    position,
    scene,
  } = props
  if (!layout.isMeasured) return forInitial(props)
  const index = scene.index
  const inputRange = [index - 1, index, index + 0.99, index + 1]
  const width = layout.initWidth
  const outputRange = I18nManager.isRTL ? [-width, 0, 10, 10] : [width, 0, -10, -10]
  const opacity = position.interpolate({
    inputRange,
    outputRange: [1, 1, 0.3, 0],
  })
  const scale = position.interpolate({
    inputRange,
    outputRange: [1, 1, 0.95, 0.95],
  })
  const translateY = 0
  const translateX = position.interpolate({
    inputRange,
    outputRange,
  })
  return {
    opacity,
    transform: [
      { scale },
      { translateX },
      { translateY },
    ],
  }
}

function forAndroid(props: NavigationSceneRendererProps): Object {
  const {
    layout,
    position,
    scene,
  } = props
  if (!layout.isMeasured) return forInitial(props)
  const index = scene.index
  const inputRange = [index - 1, index, index + 0.99, index + 1]
  const height = layout.initHeight
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1, 1],
  })
  const translateX = 0
  const translateY = position.interpolate({
    inputRange,
    outputRange: [100, 0, 0, 0],
  })
  return {
    opacity,
    transform: [
      { translateX },
      { translateY },
    ],
  }
}

export default { forInitial, forIOS, forAndroid }
