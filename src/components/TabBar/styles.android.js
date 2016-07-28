/* @flow */

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: 'white',
    elevation: 4,
    zIndex: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },
  text: {
    fontSize: 12,
  },
  indicator: {
    position: 'absolute',
    backgroundColor: 'grey',
    height: 10,
    top: 0,
    left: 0,
  }
})

export default styles
