/* @flow */
/* eslint max-len: 0 */

import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99999999,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#00000075',
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    padding: 20,
    width: Dimensions.get('window').width - 50,
    zIndex: 99999999,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .1,
    shadowRadius: 2,
    elevation: 3,
  },
  close: {
    marginBottom: 5,
    fontSize: 13,
    textAlign: 'center',
  },
})

export default styles
