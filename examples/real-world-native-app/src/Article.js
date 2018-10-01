/* @flow */

import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import type { ContextRouter } from 'react-router'
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

type Props = ContextRouter

type State = {|
  time: 0,
|}

export default class Article extends React.Component<Props, State> {
  timer: ?IntervalID = null

  state = { time: 0 }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (
        this.props.match &&
        this.props.match.url === this.props.location.pathname
      ) {
        this.setState(prevState => ({
          // $FlowFixMe
          time: prevState.time + 250,
        }))
      }
    }, 250)
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer)
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.state.time !== nextState.time
  }

  render() {
    const { history, match } = this.props
    const params = match && match.params
    if (!params || !params.id) return null
    return (
      <View style={styles.scene}>
        <Text style={styles.strong}>
          {params.method === 'update' ? 'Updating' : 'Reading'} time:{' '}
          {this.state.time / 1000}s
        </Text>
        <Link
          style={styles.link}
          component={TouchableOpacity}
          to={`/feed/article/${parseInt(params.id, 10) + 1}`}
        >
          <Text style={styles.span}>
            Push to article {parseInt(params.id, 10) + 1} (n + 1)
          </Text>
        </Link>
        <Link
          style={styles.link}
          component={TouchableOpacity}
          to={`/feed/article/${parseInt(params.id, 10) + 1}`}
          replace={true}
        >
          <Text style={styles.span}>
            Replace to article {parseInt(params.id, 10) + 1} (n + 1)
          </Text>
        </Link>
        <TouchableOpacity style={styles.link} onPress={() => history.goBack()}>
          <Text style={styles.span}>Go back (n-1)</Text>
        </TouchableOpacity>
        {history.entries.slice(0, history.index + 1).length > 2 && (
          <TouchableOpacity style={styles.link} onPress={() => history.go(-2)}>
            <Text style={styles.span}>Pop (n-2)</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}
