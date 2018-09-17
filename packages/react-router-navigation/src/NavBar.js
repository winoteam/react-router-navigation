import * as React from 'react'
import { Header, HeaderTitle, HeaderBackButton } from 'react-navigation'
import { NavBarPropTypes } from './PropTypes'

export default class NavBar extends React.Component {
  static propTypes = NavBarPropTypes

  renderLeftComponent = sceneProps => {
    const { scenes, cards } = sceneProps
    if (sceneProps.renderLeftButton) {
      return sceneProps.renderLeftButton(sceneProps)
    }
    if (
      sceneProps.scene.index === 0 ||
      !sceneProps.onNavigateBack ||
      sceneProps.hideBackButton
    ) {
      return null
    }
    const previousScene = scenes[Math.max(0, sceneProps.scene.index - 1)]
    const { name: previousRouteName } = previousScene.route
    const previousCard = cards.find(card => card.path === previousRouteName)
    const previousSceneProps = { ...previousScene, ...previousCard }
    return (
      <HeaderBackButton
        title={previousSceneProps.backButtonTitle || previousSceneProps.title}
        tintColor={sceneProps.backButtonTintColor}
        onPress={sceneProps.onNavigateBack}
      />
    )
  }

  renderTitleComponent = sceneProps => {
    if (sceneProps.renderTitle) {
      return sceneProps.renderTitle(sceneProps)
    }
    return (
      <HeaderTitle style={sceneProps.titleStyle}>
        {sceneProps.title}
      </HeaderTitle>
    )
  }

  renderRightComponent = sceneProps => {
    if (sceneProps.renderRightButton) {
      return sceneProps.renderRightButton(sceneProps)
    }
    return null
  }

  render() {
    return (
      <Header
        {...this.props}
        getScreenDetails={scene => {
          const { route } = scene
          const activeCard = this.props.cards.find(card => {
            return card.path === route.name
          })
          const sceneProps = {
            ...this.props,
            ...activeCard,
            ...scene.route,
            scene,
          }
          return {
            options: {
              headerStyle: sceneProps.navBarStyle,
              headerLeft: this.renderLeftComponent(sceneProps),
              headerTitle: this.renderTitleComponent(sceneProps),
              headerRight: this.renderRightComponent(sceneProps),
            },
          }
        }}
      />
    )
  }
}
