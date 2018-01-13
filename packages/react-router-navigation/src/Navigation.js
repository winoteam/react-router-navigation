/* @flow */

import React from 'react'
import { CardStack, renderSubView } from 'react-router-navigation-core'
import type {
  NavigationProps,
  CardProps,
  CardSubViewProps,
} from './TypeDefinitions'
import DefaultRenderer from './DefaultRenderer'
import NavBar from './NavBar'

type Props = NavigationProps & {
  children?: Array<React$Element<CardProps>>,
}

class Navigation extends React.Component<Props> {
  renderHeader = (sceneProps: CardSubViewProps, props: CardSubViewProps) => {
    // Hide nav bar
    if (sceneProps.hideNavBar) return null
    // Render custom nav bar
    if (sceneProps.renderNavBar) {
      return sceneProps.renderNavBar(sceneProps)
    }
    // Else return default <NavBar /> component
    return <NavBar {...props} />
  }

  renderSceneComponent = (sceneProps: CardSubViewProps) => {
    const { render, children, component } = sceneProps
    if (render) return render
    else if (children && typeof children === 'function') return children
    else if (component) return component
    return null
  }

  render() {
    return (
      <CardStack
        {...this.props}
        render={ownProps => (
          <DefaultRenderer
            {...this.props}
            {...ownProps}
            renderSceneComponent={renderSubView(this.renderSceneComponent)}
            renderHeader={renderSubView(this.renderHeader)}
          />
        )}
      />
    )
  }
}

export default Navigation
