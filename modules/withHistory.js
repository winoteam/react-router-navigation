/* @flow */

import React, { PropTypes } from 'react'
import hoistStatics from 'hoist-non-react-statics'

function getDisplayName(WrappedComponent: () => React$Element<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withHistory(WrappedComponent: () => React$Element<any>) {
  const WithHistory = (props, context) => (
    <WrappedComponent
      {...props}
      {...context}
    />
  )
  WithHistory.contextTypes = {
    history: PropTypes.object.isRequired,
  }
  WithHistory.displayName = `withHistory(${getDisplayName(WrappedComponent)})`
  WithHistory.WrappedComponent = WrappedComponent
  return hoistStatics(WithHistory, WrappedComponent)
}
