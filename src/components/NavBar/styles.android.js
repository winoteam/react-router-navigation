/* @flow */

import { StyleSheet, Dimensions } from 'react-native'

const NAVBAR_HEIGHT = 56

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: NAVBAR_HEIGHT,
    backgroundColor: 'white',
    zIndex: 10,
    elevation: 4,
  },
})

export default styles
