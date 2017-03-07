/* @flow */

import React, { PropTypes } from 'react'

export default (Component: ReactClass<any>): ReactClass<any> => {
  class WithRouter extends React.Component {
    static contextTypes = { history: PropTypes.object.isRequired }
    static displayName = `withRouter(${Component.displayName || Component.name})`
    componentWillMount() {
      this.unlisten = this.context.history.listen(() => {
        this.forceUpdate()
      })
    }
    componentWillUnmount() {
      this.unlisten()
    }
    render() {
      return (
        <Component
          {...this.props}
          history={{ ...this.context.history }}
        />
      )
    }
  }
  return WithRouter
}
