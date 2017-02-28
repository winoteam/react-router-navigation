/* @flow */

import React from 'react'
import { Route } from 'react-router'
import type { TabProps } from './TypeDefinitions'

type Props = TabProps

const Tab = (props: Props) => {
  const { path, exact, strict, render, children, component: Component } = props
  return (
    <Route path={path} exact={exact} strict={strict}>
      {(routeProps) => {
        if (render) return render(routeProps)
        else if (children) return children(routeProps)
        else if (Component) return <Component {...routeProps} />
        return null
      }}
    </Route>
  )
}

export default Tab
