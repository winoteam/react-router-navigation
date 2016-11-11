/* @flow */

import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    width,
    height,
  },
  scene: {
    width,
    height,
    overflow: 'hidden',
  },
})

export default styles
