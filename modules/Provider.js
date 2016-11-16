/* @flow */

import React, { PropTypes } from 'react'
import { Subscriber } from 'react-broadcast'
import type { Location, History, Match, Router } from './../types'

type Props = {
  children?: () => React$Element<any>,
}

type Context = {
  location: Location,
  match: Match,
  router: Router,
  history: History,
}

const Provider = (props: Props, context: Context): ?React$Element<any> => {
  const { children } = props
  if (!children) return null
  return (
    <Subscriber channel="location">
      {(locationContext) => (
        children({
          ...context,
          location: locationContext,
        })
      )}
    </Subscriber>
  )
}

Provider.contextTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  router: PropTypes.object,
}

export default Provider
