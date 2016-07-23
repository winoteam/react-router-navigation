/* @flow */

import { Platform, StyleSheet } from 'react-native'
import { DEFAULT_BACKGROUND_COLOR } from '@theme/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 64 : 56,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
  },
})

export default styles
