/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint react/no-children-prop: 0 */

import React, { Component, createElement } from 'react'
import type { NavigationProps, CardSubViewProps } from './TypeDefinitions'
import CardStack from './CardStack'
import DefaultRenderer from './DefaultRenderer'
import NavBar from './NavBar'
import * as StackUtils from './StackUtils'

type Props = NavigationProps & {
  children?: Array<React$Element<any>>,
}

class Navigation extends Component<void, Props, void> {

  props: Props

  renderHeader = (sceneProps: CardSubViewProps, props: CardSubViewProps): ?React$Element<any> => {
    // Hide nav bar
    if (sceneProps.hideNavBar) return null
    // Render custom nav bar
    if (sceneProps.renderNavBar) {
      return sceneProps.renderNavBar(sceneProps)
    }
    // Else return default <NavBar /> component
    return <NavBar {...props} />
  }

  renderScene = (sceneProps: CardSubViewProps): ?React$Element<any> => {
    const { render, children, component } = sceneProps
    if (render) return render(sceneProps)
    else if (children && typeof children === 'function') return children(sceneProps)
    else if (component) return createElement(component, sceneProps)
    return null
  }

  render(): React$Element<any> {
    const { children, ...props } = this.props
    return (
      <CardStack
        {...props}
        children={children}
        render={ownProps => (
          <DefaultRenderer
            {...props}
            {...ownProps}
            renderScene={StackUtils.renderSubView(this.renderScene)}
            renderHeader={StackUtils.renderSubView(this.renderHeader)}
          />
        )}
      />
    )
  }

}

export default Navigation
