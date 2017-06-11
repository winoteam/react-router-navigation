/* @flow */

import React from 'react'
import type { TabProps } from './TypeDefinitions'
import { History } from './HistoryUtils'
import SceneView from './SceneView'

type Props = TabProps

const Tab = (props: Props): React$Element<any> => (
  <History>
    {history => (
      <SceneView
        {...props}
        type="tab"
        history={history}
      />
    )}
  </History>
)

export default Tab
