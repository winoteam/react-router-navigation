/* @flow */

import React from 'react'
import { Match } from 'react-router'

type Props = {
  title?: string,
}

const MatchCard = (props: Props) => <Match {...props} />

export default MatchCard
