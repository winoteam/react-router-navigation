/* @flow */

import React from 'react'
import type { ContextRouter, Location } from 'react-router'
import { withRouter } from 'react-router'

const enhancer = withRouter

type Props = ContextRouter

type State = {
  location: Location,
}

class History extends React.Component<void, Props, State> {

  props: Props
  state: State

  unlisten: Function

  constructor(props: Props) {
    super(props)
    this.state = {
      location: props.location,
    }
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
    const { location } = this.state
    return children({ history, location })
  }

}

export default enhancer(History)
