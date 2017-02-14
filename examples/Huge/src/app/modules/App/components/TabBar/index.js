import React from 'react'
import { StyleSheet } from 'react-native'
import { BottomNavigationBar } from 'react-router-navigation'
import { BRAND_COLOR_60 } from '@ressources/theme'

const styles = StyleSheet.create({
  activeLabel: {
    color: BRAND_COLOR_60,
  },
})

const TabBar = (props) => (
  <BottomNavigationBar
    {...props}
    labelStyle={({ isActive }) => isActive && styles.activeLabel}
  />
)

export default TabBar
