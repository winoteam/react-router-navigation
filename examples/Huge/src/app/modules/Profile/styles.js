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
  link: {
    marginTop: 20,
    marginLeft: -8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: BRAND_COLOR_50,
    borderRadius: 3,
  },
  span: {
    color: BRAND_COLOR_50,
  },
  strong: {
    fontWeight: '700',
  },
})

export default styles
