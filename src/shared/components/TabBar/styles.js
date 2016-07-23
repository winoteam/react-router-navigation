/* @flow */

import { StyleSheet } from 'react-native'

const NAVBAR_HEIGHT = 56

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: NAVBAR_HEIGHT,
    backgroundColor: '#00BBD3',
    elevation: 4,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    fontSize: 13,
    color: 'white',
  },
})

export default styles
