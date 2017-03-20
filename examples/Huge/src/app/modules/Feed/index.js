import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Link } from 'react-router-native'
import { Navigation, Card } from 'react-router-navigation'
import HeaderTitle from 'react-navigation/src/views/HeaderTitle'
import List from './components/List'
import Article from './components/Article'
import styles from './styles'

/* FIX > https://github.com/facebook/react/issues/4936 */
class Feed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigation
          navBarStyle={styles.navBar}
          titleStyle={styles.title}
          backButtonTintColor="white"
        >
          <Card
            exact
            path="/app/feed"
            render={(props) => (
              <List
                ref={(c) => this.listView = c}
                {...props}
              />
            )}
            title="Feed"
          />
          <Card
            path="/app/feed/article/:id"
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
      </View>
    )
  }
}

export default Feed
