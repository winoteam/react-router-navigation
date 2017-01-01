/* @flow */
/* eslint react/no-unused-prop-types: 0 */

import React from 'react'
import { Match } from 'react-router'
import type { MatchCardProps } from './StackTypeDefinitions'

type Props = MatchCardProps

const MatchTab = (props: Props) => {
  const { render, component: Component } = props
  return (
    <Match {...props}>
      {(matchProps) => {
        return render
          ? render(matchProps)
          : <Component {...matchProps} />
      }}
    </Match>
  )
}

export default MatchTab
