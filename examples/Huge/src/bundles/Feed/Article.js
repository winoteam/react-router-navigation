import React, { Component, PropTypes } from 'react'
import { StyleSheet, Platform, StatusBar, View, Text } from 'react-native'
import { Link } from 'react-router-navigation'

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: Platform.OS === 'ios' ? 64 : 54,
    padding: 16,
  },
  link: {
    marginTop: 16,
    marginLeft: -8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
})

class Article extends Component {

  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    isTransitioning: PropTypes.bool.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.isFocused && !nextProps.isTransitioning
  }

  render() {
    const { params } = this.props
    return (
      <View style={styles.scene}>
        <StatusBar
          barStyle="dark-content"
        />
        <Text>Item {params.id}</Text>
        <Link
          style={styles.link}
          to={`/app/feed/article/${parseInt(params.id) + 1}`}
        >
          Next item
        </Link>
      </View>
    )
  }

}

export default Article
