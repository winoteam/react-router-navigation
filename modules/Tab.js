/* @flow */
/* eslint react/no-unused-prop-types: 0 */

import React from 'react'
import { Match } from 'react-router'
import type { TabProps } from './TabTypeDefinitions'

type Props = TabProps

const Tab = (props: Props) => {
  const { render, component: Component } = props
  return (
    <Match {...props}>
      {(matchProps) => {
        if (render) return render(matchProps)
        else if (Component) return <Component {...matchProps} />
        return null
      }}
    </Match>
  )
}

Tab.displayName = 'Tab'

export default Tab
