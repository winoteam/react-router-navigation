/* @flow */

import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Navigation, Card } from 'react-router-navigation'
import { type ContextRouter, type Match } from 'react-router'
import { Link } from 'react-router-native'
import { HeaderTitle } from 'react-navigation'
import pathToRegexp from 'path-to-regexp'
import List from './List'
import Article from './Article'
import { NEUTRAL_COLOR_00, BRAND_COLOR_50 } from './theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    backgroundColor: BRAND_COLOR_50,
  },
  title: {
    color: NEUTRAL_COLOR_00,
  },
  link: {
    marginHorizontal: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: NEUTRAL_COLOR_00,
    borderRadius: 3,
  },
  span: {
    color: NEUTRAL_COLOR_00,
  },
})

type Props = ContextRouter

export default class Feed extends React.Component<Props> {
  listView: ?List = null

  renderArticleTitle = (titleProps: { match: Match }) => {
    const { match } = titleProps
    return (
      <HeaderTitle style={styles.title}>
        Item {match && match.params.id}
      </HeaderTitle>
    )
  }

  renderArticleRightComponent = (rightComponentProps: { match: Match }) => {
    const { match } = rightComponentProps
    const toPath = pathToRegexp.compile(match.path)
    if (!match || !match.params) return null
    const newPath = toPath({
      ...match.params,
      method: match.params.method === 'update' ? 'read' : 'update',
    })
    return (
      <Link
        style={styles.link}
        component={TouchableOpacity}
        replace={true}
        to={newPath}
      >
        <Text style={styles.span}>
          {match.params.method === 'update' ? 'Done' : 'Edit'}
        </Text>
      </Link>
    )
  }

  renderList = (contextRouter: ContextRouter) => {
    return (
      <List
        ref={c => (this.listView = c)}
        history={contextRouter.history}
        location={contextRouter.location}
        match={contextRouter.match}
      />
    )
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { match } = this.props
    if (!match) return null
    return (
      <Navigation
        navBarStyle={styles.navBar}
        titleStyle={styles.title}
        backButtonTintColor="white"
      >
        <Card
          exact={true}
          path={match.url}
          render={this.renderList}
          title="Feed"
        />
        <Card
          path={`${match.url}/article/:id/:method(read|update)?`}
          routePath={`${match.url}/article/:id`}
          component={Article}
          backButtonTitle="Back"
          renderTitle={this.renderArticleTitle}
          renderRightButton={this.renderArticleRightComponent}
        />
      </Navigation>
    )
  }
}
