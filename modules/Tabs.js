/* @flow */

import React from 'react'
import TabStack from './TabStack'
import TabBarBottom from './TabBarBottom'

type Props = {
  children: Array<React$Element<any>>,
}

const Tabs = (props: Props): React$Element<any> => (
  <TabStack
    {...props}
    renderHeader={TabBarBottom}
  />
)

export default Tabs
