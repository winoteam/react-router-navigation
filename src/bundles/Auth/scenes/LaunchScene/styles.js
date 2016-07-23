/* @flow */

import { Platform, StyleSheet } from 'react-native'
import { DEFAULT_BACKGROUND_COLOR } from '@theme/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    marginTop: Platform.OS == 'ios' ? 64 : 56,
  },
})

export default styles
