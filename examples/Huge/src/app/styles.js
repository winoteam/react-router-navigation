import { StyleSheet } from 'react-native'
import { BRAND_COLOR_60 } from '@ressources/theme'

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
  },
  activeLabel: {
    color: BRAND_COLOR_60,
  },
  modal: {
    marginTop: 12.5,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
})

export default styles
