/* @flow */

import React from 'react'
import type { TabProps } from './TypeDefinitions'
import History from './History'
import SceneView from './SceneView'

type Props = TabProps

const Tab = (props: Props): React$Element<any> => (
  <History>
    {({ history, location }) => (
      <SceneView
        {...props}
        type="tab"
        location={location}
        history={history}
      />
    )}
  </History>
)

export default Tab
