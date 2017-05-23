/* @flow */

import React from 'react'
import type { ContextRouter, Location } from 'react-router'
import { withRouter } from 'react-router'

const enhancer = withRouter

type Props = ContextRouter & {
  children?: () => React$Element<any>,
}

type State = {
  location: Location,
}

class History extends React.Component<void, Props, State> {

  props: Props
  state: State

  unlisten: Function

  constructor(props: Props) {
    super(props)
    const { location } = props.history
    this.state = { location }
  }

  componentWillMount(): void {
    const { history } = this.props
    this.unlisten = history.listen(this.onChangeHistory)
  }

  componentWillUnmount(): void {
    this.unlisten()
  }

  onChangeHistory = (location: Location): void => {
    this.setState({ location })
  }

  render(): ?React$Element<any> {
    const { children, history } = this.props
    if (!children) return null
    const { location } = this.state
    return children({ history, location })
  }

}

export default enhancer(History)
