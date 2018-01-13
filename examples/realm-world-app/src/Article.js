/* eslint react/no-unused-prop-types: 0 */

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import type { Match, Location } from 'react-router'
import { Link } from 'react-router-native'
import { BRAND_COLOR_50, BRAND_COLOR_60 } from './theme'

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
  },
  link: {
    marginTop: 16,
    marginLeft: -8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: BRAND_COLOR_50,
    borderRadius: 3,
  },
  span: {
    color: BRAND_COLOR_60,
  },
  strong: {
    marginTop: 5,
    fontWeight: '700',
  },
})

type Props = {
  match: Match,
  location: Location,
}

type State = {
  time: 0,
}

class Article extends React.Component<Props, State> {
  state = { time: 0 }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (
        this.props.match &&
        this.props.match.url === this.props.location.pathname
      ) {
        this.setState(prevState => ({
          time: prevState.time + 250,
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
    return (
      <View style={styles.scene}>
        <Text>
          I know words. I have the best words. Be careful, or I will spill the
          beans on your placeholder text. Trump Ipsum is calling for a total and
          complete shutdown of Muslim text entering your website.
        </Text>
        <Text style={styles.strong}>Focus time: {this.state.time / 1000}s</Text>
        <Link
          style={styles.link}
          component={TouchableOpacity}
          to={`/feed/article/${parseInt(match.params.id, 10) + 1}`}
        >
          <Text style={styles.span}>
            See item {parseInt(match.params.id, 10) + 1}
          </Text>
        </Link>
      </View>
    )
  }
}

export default Article
