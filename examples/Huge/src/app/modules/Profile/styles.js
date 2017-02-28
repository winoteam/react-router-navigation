import { StyleSheet, Platform } from 'react-native'
import { BRAND_COLOR_50 } from '@ressources/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: BRAND_COLOR_50,
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
})

export default styles
