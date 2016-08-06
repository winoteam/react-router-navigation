/* @flow */

import { StyleSheet, Dimensions } from 'react-native'

const NAVBAR_HEIGHT = 56

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    width: Dimensions.get('window').width,
    height: NAVBAR_HEIGHT,
    backgroundColor: '#f5f5f5',
    elevation: 4,
  },
  title: {
    top: -1,
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
})

export default styles
