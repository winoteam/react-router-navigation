import React, { Component } from 'react'
import { View } from 'react-native'
import { Navigation, Card } from 'react-router-navigation'
import List from './components/List'
import Article from './components/Article'
import styles from './styles'

/* FIX > https://github.com/facebook/react/issues/4936 */
class Feed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigation>
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
            navBarStyle={styles.navBar}
            titleStyle={styles.title}
          />
          <Card
            path="/app/feed/article/:id"
            component={Article}
            title="Item"
            navBarStyle={styles.navBar}
            backButtonStyle="light"
            titleStyle={styles.title}
          />
        </Navigation>
      </View>
    )
  }
}

export default Feed
