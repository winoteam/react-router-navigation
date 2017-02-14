import React from 'react'
import { StatusBar, View, Text } from 'react-native'
import styles from './styles'

const Search = () => (
  <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <Text>Search</Text>
  </View>
)

export default Search
