/* @flow */

import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 49,
    borderTopWidth: 1,
    borderTopColor: '#c7c7c7',
    backgroundColor: '#fafafa',
  },
  tabText: {
    marginTop: 4,
    fontSize: 10,
    color: '#0076ff',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2.5,
  },
})

export default styles
