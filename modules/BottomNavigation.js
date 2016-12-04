/* @flow */

import React from 'react'
import { Platform } from 'react-native'
import { TabViewPagerPan } from 'react-native-tab-view'
import TabStack from './TabStack'
import TabViewPagerNavigator from './TabViewPagerNavigator'
import TabBarBottom from './TabBarBottom'

type Props = {
  children: Array<React$Element<any>>,
}

const Pager = (props: Props): React$Element<any> => {
  if (Platform.OS === 'android') {
    return (
      <TabViewPagerNavigator
        {...props}
      />
    )
  }
  return (
    <TabViewPagerPan
      {...props}
      swipeEnabled={false}
    />
  )
}

const BottomNavigation = (props: Props): React$Element<any> => (
  <TabStack
    {...props}
    renderFooter={TabBarBottom}
    renderPager={Pager}
    configureTransition={() => null}
  />
)

export default BottomNavigation
