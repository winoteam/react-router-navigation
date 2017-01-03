/* @flow */
/* eslint react/no-unused-prop-types: 0 */

import React from 'react'
import { Match } from 'react-router'
import type { MatchCardProps } from './StackTypeDefinitions'

type Props = MatchCardProps

type MatchProps = {
  pattern: string,
  pathname: string,
  location: { pathname: string },
  isExact: boolean,
  pararms: Object,
}

type State = {
  matchProps: ?MatchProps,
  pathname: ?string,
}

class MatchCard extends React.Component<void, Props, State> {

  props: Props
  state: State = {
    pathname: null,
    matchProps: null,
  }

  static displayName = 'MatchCard'

  renderMatchView = (matchProps: MatchProps): ?React$Element<MatchProps> => {
    const { render, component: Component } = this.props
    if (!this.state.pathname) this.state.pathname = matchProps.pathname
    if (
      this.state.pathname === matchProps.pathname ||
      !this.state.matchProps
    ) {
      this.state.matchProps = matchProps
    }
    if (render) return render(this.state.matchProps)
    else if (Component) return <Component {...this.state.matchProps} />
    return null
  }

  render(): React$Element<any> {
    return (
      <Match {...this.props}>
        {this.renderMatchView}
      </Match>
    )
  }

}

export default MatchCard
