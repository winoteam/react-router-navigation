/* eslint react/no-unused-prop-types: 0 */

import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'
import styles from './styles'

class Article extends Component {

  state = { time: 0 }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.props.match && this.props.match.url === this.props.location.pathname) {
        this.setState((state) => ({
          time: state.time + 250,
        }))
      }
    }, 250)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.time !== nextState.time
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
