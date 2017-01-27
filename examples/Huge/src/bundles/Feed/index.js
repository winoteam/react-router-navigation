import React, { Component } from 'react'
import { Navigator, Card } from 'react-router-navigation'
import List from './List'
import Article from './Article'

class Feed extends Component {

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Navigator>
        <Card
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
        <Card
          pattern="/app/feed/article/:id"
          title="Item"
          component={Article}
        />
      </Navigator>
    )
  }

}

export default Feed
