/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint react/no-children-prop: 0 */

import React, { Component, createElement } from 'react'
import type { NavigationSceneRendererProps } from 'react-navigation/src/TypeDefinition'
import type { NavBarProps, CardRendererProps } from './TypeDefinitions'
import CardStack from './CardStack'
import DefaultRenderer from './DefaultRenderer'
import NavBar from './NavBar'
import StackUtils from './StackUtils'

type SceneRendererProps = CardRendererProps & NavigationSceneRendererProps

type Props = NavBarProps & {
  children: Array<React$Element<any>>,
  render: (props: SceneRendererProps) => React$Element<any>,
}

class Navigation extends Component<void, Props, void> {

  props: Props

  renderHeader = (props: SceneRendererProps): ?React$Element<any> => {
    // Get current card $FlowFixMe
    const { cards, scene: { route } } = props
    const card = StackUtils.get(cards, route)
    if (!card) return null
    // Get nav bar props
    const navBarProps = { ...this.props, ...card }
    // Hide nav bar
    if (navBarProps.hideNavBar) return null
    // Render custom nav bar
    if (navBarProps.renderNavBar) {
      return navBarProps.renderNavBar(navBarProps)
    }
    // Else return default <NavBar /> component
    return <NavBar {...navBarProps} />
  }

  renderScene = (props: SceneRendererProps): ?React$Element<any> => {
    // Get card $FlowFixMe
    const { cards, scene: { route } } = props
    const card = StackUtils.get(cards, route)
    if (!card) return null
    // Render view
    if (card.render) return card.render(props)
    else if (card.children) return card.children(props)
    else if (card.component) return createElement(card.component, props)
    return null
  }

  render(): React$Element<any> {
    const { children, ...props } = this.props
    return (
      <CardStack
        {...props}
        children={children}
        render={(ownProps) => (
          <DefaultRenderer
            {...props}
            {...ownProps}
            renderScene={this.renderScene}
            renderHeader={this.renderHeader}
          />
        )}
      />
    )
  }

}

export default Navigation
