/* @flow */
/* eslint react/no-children-prop: 0 */

import React from 'react'
import type { NavigationProps } from './TypeDefinitions'
import CardStack from './CardStack'
import NativeRenderer from './NativeRenderer'
import History from './History'

type Props = NavigationProps & {
  children?: Array<React$Element<any>>,
}

class NativeNavigation extends React.Component<void, Props, void> {

  props: Props

  renderScene = (sceneProps: TabSubViewProps): ?React$Element<any> => {
    const { render, children, component } = sceneProps
    if (render) return render(sceneProps)
    else if (children && typeof children === 'function') return children(sceneProps)
    else if (component) return React.createElement(component, sceneProps)
    return null
  }

  render(): React$Element<any> {
    const { children, ...props } = this.props
    return (
      <History>
        {({ history, location }) => (
          <CardStack
            {...props}
            location={location}
            history={history}
            children={children}
            render={ownProps => (
              <NativeRenderer
                {...props}
                {...ownProps}
                renderScene={this.renderScene}
              />
            )}
          />
        )}
      </History>
    )
  }

}

export default NativeNavigation
