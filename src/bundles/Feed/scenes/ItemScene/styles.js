/* @flow */

import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'ios' ? 64 : 56,
  },
})

export default styles
