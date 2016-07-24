import { StyleSheet, PixelRatio } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
  },
})

export default styles
