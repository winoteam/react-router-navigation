/* eslint react/no-unused-prop-types: 0 */

import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'
import styles from './styles'

class Article extends Component {

  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    isTransitioning: PropTypes.bool.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.isFocused && !nextProps.isTransitioning
  }

  render() {
    const { match } = this.props
    if (!match) return null
    return (
      <View style={styles.scene}>
        <Text>Item {match.params.id}</Text>
        <Link
          style={styles.link}
          component={TouchableOpacity}
          to={`/app/feed/article/${parseInt(match.params.id) + 1}`}
        >
          <Text>Next item</Text>
        </Link>
      </View>
    )
  }

}

export default Article
