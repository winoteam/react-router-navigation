import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Link } from 'react-native-router-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
})

const Auth = () => (
  <View style={styles.container}>
    <Link to="/app" style={styles.link}>Go to app</Link>
  </View>
)

export default Auth
