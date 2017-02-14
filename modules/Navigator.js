/* @flow */
/* eslint react/no-unused-prop-types: 0 */

import React, { Component, createElement } from 'react'
import ReactNative, { StyleSheet, View } from 'react-native'
import CardStack from './CardStack'
import NavBar from './NavBar'
import NativeRenderer from './NativeRenderer'
import { getCurrentCard } from './utils'
import type { CardProps, CardRendererProps } from './TypeDefinitions'

const styles = StyleSheet.create({
  customNavBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 64,
    backgroundColor: 'transparent',
  },
  defaultNavBar: {
    backgroundColor: '#fafafa',
    borderBottomWidth: .5,
    borderBottomColor: '#b2b2b2',
  },
  subView: {
    top: 11,
  },
})

type Scene = {
  key: string,
}

type Props = {
  children: Array<React$Element<CardProps>>,
}

class Navigator extends Component<void, Props, void> {

  props: Props

  renderScene = (props: CardRendererProps & { scene: Scene }): ?React$Element<any> => {
    const { cards, scene: route } = props
    const card = getCurrentCard(cards, route)
    if (!card) return null
    if (!card.component && !card.render) return null
    return createElement(
      card.component || card.render,
      { key: route.key }
    )
  }

  renderNavBar = (props: CardRendererProps): ?React$Element<any> => {
    const { cards, navigationState: { routes, index } } = props
    const card = getCurrentCard(cards, routes[index])
    // Custom <Navbar />
    if (card && card.renderNavBar) {
      return (
        <View style={styles.customNavBar}>
          {card && card.renderNavBar(props)}
        </View>
      )
    }
    // Hide nav bar
    if (card && card.hideNavBar) return null
    // Default <NavBar />
    return (
      <ReactNative.Navigator.NavigationBar
        style={[styles.defaultNavBar, card.navBarStyle]}
        routeMapper={{
          LeftButton: () => NavBar.renderLeftComponent(
            { ...props, scene: { route, index: props.navigationState.index } },
            styles.subView,
          ),
          Title: (route) => NavBar.renderTitleComponent(
            { ...props, scene: { route } },
            styles.subView,
          ),
          RightButton: () => NavBar.renderRightComponent(),
        }}
      />
    )
  }

  render(): React$Element<any> {
    return (
      <CardStack
        {...this.props}
        render={(props) => (
          <NativeRenderer
            {...props}
            renderScene={(scene) => this.renderScene({ ...props, scene })}
            renderNavBar={() => this.renderNavBar(props)}
          />
        )}
      />
    )
  }

}

export default Navigator
