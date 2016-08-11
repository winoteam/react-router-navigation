/* @flow */

import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  tab: {
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
  tabItem: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tabText: {
    marginTop: 2.75,
    bottom: 2,
    textAlign: 'center',
    fontSize: 10,
    color: '#0076ff',
  },
})

export default styles
