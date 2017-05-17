/* @flow */

import React from 'react'
import type { ContextRouter, Location } from 'react-router'
import type { CardProps } from './TypeDefinitions'

type Props = ContextRouter & CardProps

type State = {
  location: Location,
}

class SceneView extends React.Component<void, Props, State> {

  props: Props
  state: State

  unlisten: Function

  constructor(props: Props) {
    super(props)
    this.state = {
      location: props.location,
    }
  }

  componentDidMount(): void {
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
    const { render, children, component } = this.props
    const ownProps = { ...this.props, ...this.state }
    if (render) return render(ownProps)
    else if (children && typeof children === 'function') return children(ownProps)
    else if (component) return React.createElement(component, ownProps)
    return null
  }

}

export default SceneView
