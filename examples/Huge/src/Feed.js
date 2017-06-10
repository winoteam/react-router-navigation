/* @flow */

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Navigation, Card } from 'react-router-navigation'
import type { Match } from 'react-router'
import HeaderTitle from 'react-navigation/src/views/HeaderTitle'
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

/* FIX > https://github.com/facebook/react/issues/4936 */
class Feed extends Component<void, Props, void> {

  props: Props
  listView: List

  shouldComponentUpdate(): boolean {
    return false
  }

  render(): React$Element<any> {
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
              ref={(c) => {
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
          title="Item"
          backButtonTitle="Back"
          renderTitle={({ title, match }) => (
            <HeaderTitle style={styles.title}>
              {title} {match && match.params.id}
            </HeaderTitle>
          )}
        />
      </Navigation>
    )
  }

}

export default Feed
