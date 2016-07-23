/* @flow */

import React from 'react'
import { StatusBar, Platform, View, Text } from 'react-native'
import { Router } from '@helpers/router'
import scenes from './scenes'

export const Kernel = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#0096A6" />
      <Router scenes={scenes} />
    </View>
  )
}
