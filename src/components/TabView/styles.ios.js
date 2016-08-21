/* @flow */

import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  scene: {
    flex: 1,
    width: Dimensions.get('window').width,
    overflow: 'hidden',
  },
})

export default styles
