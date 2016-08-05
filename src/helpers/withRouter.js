/* @flow */

import React, { PropTypes } from 'react'
import hoistStatics from 'hoist-non-react-statics'

function getDisplayName(WrappedComponent: () => React$Element<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withRouter(WrappedComponent: () => React$Element<any>) {
  const WithRouter = (props, context) => (
    <WrappedComponent
      {...props}
      {...context}
    />
  )
  WithRouter.contextTypes = {
    router: PropTypes.object.isRequired,
    navigationState: PropTypes.object.isRequired,
  }
  WithRouter.displayName = `withRouter(${getDisplayName(WrappedComponent)})`
  WithRouter.WrappedComponent = WrappedComponent
  return hoistStatics(WithRouter, WrappedComponent)
}
