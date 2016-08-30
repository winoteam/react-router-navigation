/* @flow */

import React, { createElement, Component } from 'react'
import {
  NavigationExperimental, Platform, Dimensions, Animated,
  ScrollView, View,
} from 'react-native'
import StyleInterpolator from './../../helpers/StyleInterpolator'
import type { NavigationState, NavigationSceneProps } from './../../types'
import styles from './styles'

const NAVBAR_HEIGHT = 64

const {
  Card: NavigationCard,
} = NavigationExperimental

const {
  CardStackPanResponder,
} = NavigationCard

type Props = NavigationSceneProps & {
  navigationState: NavigationState,
  renderScene: (sceneProps: NavigationSceneProps) => React$Element<any>,
  renderHeader?: (sceneProps: NavigationSceneProps) => React$Element<any> | null,
}

type ScrollEvent = {
  nativeEvent: {
    contentOffset: {
      x: number,
      y: number,
    },
    contentInset: {
      top: number,
      right: number,
      bottom: number,
      left: number,
    },
    contentSize: {
      width: number,
      heigth: number,
    },
  },
}

class DefaultRenderer extends Component {

  props: Props

  state = {
    hideNavBar: false,
    scrollY: 0,
  }

  pan: Animated.Value = new Animated.Value(0)

  // Render each scenes in <NavigationCard />
  // component with StyleInterpolator and
  // PanResponder
  renderScenes = (): React$Element<any> => {
    const { scenes } = this.props

    return scenes.map((scene) => {
      const style = Platform.OS === 'android' ?
        StyleInterpolator.forAndroid({ ...this.props, scene }) :
        StyleInterpolator.forIOS({ ...this.props, scene })

      const panHandlersProps = {
        ...{ ...this.props, scene },
        onNavigateBack: this.props.pop,
      }

      const panHandlers = Platform.OS === 'ios'
        ? CardStackPanResponder.forHorizontal(panHandlersProps)
        : null

      return (
        <NavigationCard
          key={scene.route.key}
          {...this.props}
          scene={scene}
          panHandlers={panHandlers}
          style={style}
          renderScene={this.renderScene}
        />
      )
    })
  }


  // Render each scene within <View />
  // or Scroll component
  renderScene = (sceneProps: NavigationSceneProps): React$Element<any> => {
    const { navigationState, scene } = sceneProps
    const { component } = scene.route
    const { wrapInScrollView, hideNavBarOnScroll, hideTabBar } = component
    const tabs = navigationState.isWrappedInTabs && !hideTabBar
    const props = sceneProps
    if (!wrapInScrollView && hideNavBarOnScroll) {
      props.onHideNavBarOnScroll = this.onScroll
    }

    return createElement(
      wrapInScrollView ? ScrollView : View,
      {
        style: [styles.scene, { paddingBottom: tabs ? 49 : 0 }],
        contentContainerStyle: { paddingBottom: tabs ? 49 : 0 },
        onScroll: this.onScroll,
        scrollEventThrottle: hideNavBarOnScroll ? 25 : 99999,
      }, (
      <View style={styles.wrapper}>
        {this.props.renderScene(props)}
      </View>
      ),
    )
  }


  // Hide nav bar on scroll when
  // hideNavBarOnScroll is true
  onScroll = (e: ScrollEvent): void => {
    const { hideNavBarOnScroll } = this.props.scenes.slice(-1)[0].route.component
    const scrollViewHeight = e.nativeEvent.contentSize.height - Dimensions.get('window').height
    const scrollY = Math.min(
      Math.max(
        parseInt(e.nativeEvent.contentOffset.y),
        0,
      ),
      scrollViewHeight,
    )
    if (hideNavBarOnScroll) {
      const deltaY = this.state.scrollY - scrollY
      const direction = deltaY > 0 ? 'up' : 'down'
      if (Math.abs(deltaY) > 10 && direction === 'up' && this.state.hideNavBar) {
        Animated.timing(
          this.pan,
          { toValue: 0, duration: 150 }
        ).start()
        this.state.hideNavBar = false
      }
      if (scrollY > (NAVBAR_HEIGHT * 1.5) && direction === 'down' && !this.state.hideNavBar) {
        Animated.timing(
          this.pan,
          { toValue: -NAVBAR_HEIGHT, duration: 150 }
        ).start()
        this.state.hideNavBar = true
      }
      this.state.scrollY = scrollY
    }
  }


  // Re-active nav bar when user
  // push/pop an other scene
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.navigationState.index !== nextProps.navigationState.index) {
      if (this.state.hideNavBar) {
        Animated.timing(
          this.pan,
          { toValue: 0, duration: 0 }
        ).start()
        this.state.hideNavBar = false
      }
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.navigationState.index !== nextProps.navigationState.index ||
      this.props.scenes.length !== nextProps.scenes.length ||
      this.props.scene.key !== nextProps.scene.key
    )
  }

  render() {
    const { renderHeader } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.scenes}>
          {this.renderScenes()}
        </View>
        <Animated.View style={[styles.header, { top: this.pan }]}>
          {renderHeader(this.props)}
        </Animated.View>
      </View>
    )
  }

}

export default DefaultRenderer
