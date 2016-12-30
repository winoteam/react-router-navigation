/* @flow */

import React from 'react'
import { Match } from 'react-router'

type Props = {
  title?: string,
}

const MatchTab = (props: Props) => <Match {...props} />

export default MatchTab
