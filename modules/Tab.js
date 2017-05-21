/* @flow */

import React from 'react'
import type { TabProps } from './TypeDefinitions'
import History from './History'
import SceneView from './SceneView'

type Props = TabProps

const Tab = (props: Props) => (
  <History>
    {({ history, location }) => (
      <SceneView
        {...props}
        location={location}
        history={history}
      />
    )}
  </History>
)

export default Tab
