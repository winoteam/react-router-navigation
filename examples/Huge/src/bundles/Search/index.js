import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Search = () => (
  <View style={styles.container}>
    <Text>Search</Text>
  </View>
)

export default Search
