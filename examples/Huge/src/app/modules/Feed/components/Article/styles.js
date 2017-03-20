/* @flow */

import { StyleSheet } from 'react-native'
import { BRAND_COLOR_50, BRAND_COLOR_60 } from '@ressources/theme'

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
  },
  link: {
    marginTop: 16,
    marginLeft: -8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: BRAND_COLOR_50,
    borderRadius: 3,
  },
  span: {
    color: BRAND_COLOR_60,
  },
  strong: {
    marginTop: 5,
    fontWeight: '700',
  },
})

export default styles
