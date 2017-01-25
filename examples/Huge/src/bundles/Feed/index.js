import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Navigator, MatchCard } from 'react-router-navigation'
import List from './List'
import Article from './Article'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {

  },
})

class Feed extends Component {

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator>
          <MatchCard
            exactly
            pattern="/app/feed"
            title="Feed"
            render={(props) => (
              <List
                ref={(c) => this.listView = c}
                {...props}
              />
            )
            }
            onResetCard={(callback) => {
              if (this.listView) this.listView.scrollTo(0)
              callback()
            }}
          />
          <MatchCard
            pattern="/app/feed/article/:id"
            title="Item"
            component={Article}
          />
        </Navigator>
      </View>
    )
  }

}

export default Feed
