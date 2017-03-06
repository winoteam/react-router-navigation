/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint react/no-children-prop: 0 */

import React, { Component, createElement } from 'react'
import type { NavBarProps, CardSubViewProps } from './TypeDefinitions'
import CardStack from './CardStack'
import DefaultRenderer from './DefaultRenderer'
import NavBar from './NavBar'
import * as StackUtils from './StackUtils'

type Props = NavBarProps & {
  children?: Array<React$Element<any>>,
}

class Navigation extends Component<void, Props, void> {

  props: Props

  renderHeader = (props: CardSubViewProps): ?React$Element<any> => {
    // Hide nav bar
    if (props.hideNavBar) return null
    // Render custom nav bar
    if (props.renderNavBar) {
      return props.renderNavBar(props)
    }
    // Else return default <NavBar /> component
    return <NavBar {...props} />
  }

  renderScene = (props: CardSubViewProps): ?React$Element<any> => {
    const { render, children, component } = props
    if (render) return render(props)
    else if (children && typeof children === 'function') return children(props)
    else if (component) return createElement(component, props)
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
            renderScene={StackUtils.renderSubView(this.renderScene)}
            renderHeader={StackUtils.renderSubView(this.renderHeader)}
          />
        )}
      />
    )
  }

}

export default Navigation
