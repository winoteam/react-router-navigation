/* @flow */

import React, { Component, createElement } from 'react'
import { ViewPagerAndroid, View } from 'react-native'
import StaticContainer from 'react-static-container'
import TabBar from './../TabBar'
import styles from './styles'

class TabView extends Component {

  render() {
    const { children } = this.props
    return (
      <View style={styles.container}>
        <TabBar
          tabs={children.map((child) => ({
            ...child,
            name: child.title,
          }))}
        />
        <ViewPagerAndroid style={styles.wrapper}>
          {children.map((child, index) => (
            <StaticContainer key={index}>
              {createElement(child.component)}
            </StaticContainer>
          ))}
        </ViewPagerAndroid>
      </View>
    )
  }

}

export default TabView
