/* eslint react/no-unused-prop-types: 0 */

import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'
import styles from './styles'

class Article extends Component {

  static propTypes = {
    state: PropTypes.shape({
      isFocused: PropTypes.bool.isRequired,
      isTransitioning: PropTypes.bool.isRequired,
    }),
  }

  state = { time: 0 }

  componentDidMount() {
    setInterval(() => {
      if (!this.props.state.isFocused) return
      this.setState((state) => ({
        time: state.time + 250,
      }))
    }, 250)
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.state.isFocused &&
      !nextProps.state.isTransitioning
    )
  }

  render() {
    const { match } = this.props
    if (!match) return null
    return (
      <View style={styles.scene}>
        <Text>
          I know words. I have the best words. Be careful, or I will spill the
          beans on your placeholder text. Trump Ipsum is calling for a total
          and complete shutdown of Muslim text entering your website.
        </Text>
        <Text style={styles.strong}>
          Focus time: {this.state.time / 1000}s
        </Text>
        <Link
          style={styles.link}
          component={TouchableOpacity}
          to={`/app/feed/article/${parseInt(match.params.id) + 1}`}
        >
          <Text style={styles.span}>
            See item {parseInt(match.params.id) + 1}
          </Text>
        </Link>
      </View>
    )
  }

}

export default Article
