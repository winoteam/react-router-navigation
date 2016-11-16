/* @flow */

import React from 'react'
import CardStack from './CardStack'
import NativeRenderer from './NativeRenderer'

type Props = {
  children: Array<React$Element<any>>,
}

const Navigator = (props: Props): React$Element<any> => (
  <CardStack
    {...props}
    render={(sceneProps) => (
      <NativeRenderer
        {...sceneProps}
      />
    )}
  />
)

export default Navigator
