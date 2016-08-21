/* @flow */

import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 49,
    borderTopWidth: 1,
    borderTopColor: '#c7c7c7',
    backgroundColor: '#fafafa',
  },
  item: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    top: -1,
  },
  text: {
    marginTop: 2.75,
    bottom: 2,
    textAlign: 'center',
    fontSize: 10,
    color: '#0076ff',
  },
})

export default styles
