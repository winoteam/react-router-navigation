/* @flow */

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Navigation, Card } from 'react-router-navigation'
import { HeaderTitle } from 'react-navigation'
import type { Match } from 'react-router'
import List from './List'
import Article from './Article'
import { BRAND_COLOR_50 } from './theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    backgroundColor: BRAND_COLOR_50,
  },
  title: {
    color: 'white',
  },
})

type Props = {
  match: Match,
}

class Feed extends Component<Props> {
  props: Props
  listView: List

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { match: { url } } = this.props
    return (
      <Navigation
        navBarStyle={styles.navBar}
        titleStyle={styles.title}
        backButtonTintColor="white"
      >
        <Card
          exact
          path={url}
          render={props => (
            <List
              ref={c => {
                this.listView = c
              }}
              {...props}
            />
          )}
          title="Feed"
        />
        <Card
          path={`${url}/article/:id`}
          component={Article}
          backButtonTitle="Back"
          renderTitle={({ match }) => (
            <HeaderTitle style={styles.title}>Item {match && match.params.id}</HeaderTitle>
          )}
        />
      </Navigation>
    )
  }
}

export default Feed
