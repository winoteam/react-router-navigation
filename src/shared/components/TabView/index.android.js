/* @flow */

import React, { Component } from 'react'
import { ViewPagerAndroid, View } from 'react-native'
import TabBar from '@components/TabBar'
import styles from './styles'

type Props = {
  children?: React$Element<any>
}

class TabView extends Component {

  props: Props

  render() {
    const { children } = this.props
    return (
      <View style={styles.container}>
        <TabBar items={children.map((child) => child.props.title)} />
        <ViewPagerAndroid style={styles.wrapper}>
          {children}
        </ViewPagerAndroid>
      </View>
    )
  }

}

export default TabView
