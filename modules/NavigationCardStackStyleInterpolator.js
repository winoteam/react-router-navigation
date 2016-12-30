/* @flow */

import { I18nManager } from 'react-native'
import type { NavigationSceneRendererProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'

function forInitial(props: NavigationSceneRendererProps): Object {
  const {
    navigationState,
    scene,
  } = props
  const focused = navigationState.index === scene.index
  const opacity = focused ? 1 : 0
  const translateX = focused ? 0 : 1000000
  const translateY = focused ? 0 : 1000000
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
  const outputRange = I18nManager.isRTL
    ? ([-width, 0, 10, 10]: Array<number>)
    : ([width, 0, -10, -10]: Array<number>)
  const opacity = position.interpolate({
    inputRange,
    outputRange: ([1, 1, 0.3, 0]: Array<number>),
  })
  const scale = position.interpolate({
    inputRange,
    outputRange: ([1, 1, 0.95, 0.95]: Array<number>),
  })
  const translateY = 0
  const translateX = position.interpolate({ inputRange, outputRange })
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
  const opacity = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1, 1]: Array<number>),
  })
  const translateX = 0
  const translateY = position.interpolate({
    inputRange,
    outputRange: ([100, 0, 0, 0]: Array<number>),
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
