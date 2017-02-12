import React from 'react'
import { View, Text } from 'react-native'
import Link from '@ressources/components/Link'
import styles from './styles'

const Auth = () => (
  <View style={styles.container}>
    <Link
      to="/main"
      style={styles.link}
    >
      <Text>Go to app</Text>
    </Link>
  </View>
)

export default Auth
