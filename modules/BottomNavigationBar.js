/* @flow */
/* eslint new-cap: 0 */

import React from 'react'
import { TouchableWithoutFeedback, StyleSheet, Platform, Dimensions, PixelRatio, View, Text } from 'react-native'
import { Route } from 'react-router'
import type { TabSubViewProps } from './TypeDefinitions'

const DEFAULT_ANDROID_COLOR = '#008f8d'
const DEFAULT_IOS_COLOR = '#0075ff'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    backgroundColor: '#fafafa',
    ...Platform.select({
      ios: {
        height: 49,
        borderTopColor: '#b2b2b2',
        borderTopWidth: 1 / PixelRatio.get(),
      },
      android: {
        height: 56,
        borderTopWidth: 2 / PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        backgroundColor: 'white',
      },
    }),
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...Platform.select({
      ios: {
        color: '#929292',
        fontSize: 10,
      },
      android: {
        fontSize: 13,
      },
    }),
    textAlign: 'center',
  },
  activeLabel: {
    ...Platform.select({
      android: {
        color: DEFAULT_ANDROID_COLOR,
      },
      ios: {
        color: DEFAULT_IOS_COLOR,
      },
    }),
  },
})

const BottomNavigationBar = (props: TabSubViewProps): React$Element<any> => (
  <View style={styles.container}>
    {props.tabs.map((tab, index) => (
      <Route
        key={index}
        path={tab.path}
        exact={tab.exact}
        strict={tab.strict}
      >
        {({ match }) => {
          const isActive = !!match
          const tabbBarProps = { ...props, ...tab, isActive, key: tab.key }
          return (
            <TouchableWithoutFeedback onPress={() => props.onRequestChangeTab(index)}>
              <View style={[styles.item, styles.tabbBarProps]}>
                {tabbBarProps.renderTabIcon && tabbBarProps.renderTabIcon(tabbBarProps)}
                {tabbBarProps.label &&
                  <Text
                    style={[
                      styles.label,
                      isActive && styles.activeLabel,
                      typeof tabbBarProps.labelStyle === 'function'
                        ? tabbBarProps.labelStyle(tabbBarProps)
                        : tabbBarProps.labelStyle,
                    ]}
                  >
                    {tabbBarProps.label}
                  </Text>
                }
              </View>
            </TouchableWithoutFeedback>
          )
        }}
      </Route>
    ))}
  </View>
)

export default BottomNavigationBar
