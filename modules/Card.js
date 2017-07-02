/* @flow */

import React from 'react'
import type { CardProps } from './TypeDefinitions'
import { History } from './HistoryUtils'
import SceneView from './SceneView'

type Props = CardProps

const Card = (props: Props) =>
  <History>
    {history => <SceneView {...props} type="card" history={history} />}
  </History>

export default Card
