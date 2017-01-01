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

type State = { matchProps: MatchProps }

class MatchCard extends React.Component<void, Props, State> {

  props: Props
  state: State = { matchProps: null }

  renderMatchView = (matchProps: MatchProps): React$Element<MatchProps> => {
    const { render, component: Component } = this.props
    if (!this.state.matchProps) this.state.matchProps = matchProps
    return render
      ? render(this.state.matchProps)
      : <Component {...this.state.matchProps} />
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
