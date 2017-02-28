import { StyleSheet, PixelRatio } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#cdcdcd',
  },
  row: {
    padding: 15,
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
})

export default styles
