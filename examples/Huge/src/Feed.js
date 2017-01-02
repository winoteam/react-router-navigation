import React, { Component } from 'react'
import { StyleSheet, Platform, PixelRatio, ListView, View, Text } from 'react-native'
import { Navigation, MatchCard, Link, withHistory } from 'react-native-router-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 64 : 54,
  },
  separator: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#cdcdcd',
  },
  row: {
    padding: 15,
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  article: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: Platform.OS === 'ios' ? 64 : 54,
    padding: 16,
  },
  link: {
    marginTop: 16,
    marginLeft: -8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
})

class Feed extends Component {

  constructor() {
    super()
    const ds = new ListView.DataSource({
      rowHasChanged: () => false,
    })
    this.state = {
      dataSource: ds.cloneWithRows(
        Array
          .from({ length: 100 })
          .map((a, i) => `Item ${i + 1}`)
      ),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation>
          <MatchCard
            exactly
            pattern="/app/feed"
            title="Feed"
            render={() => (
              <ListView
                style={styles.scene}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => (
                  <Text
                    style={styles.row}
                    onPress={() => {
                      const id = rowData.slice(5) // Remove 'Item ' string
                      this.props.history.push(`/app/feed/article/${id}`)
                    }}
                  >
                    {rowData}
                  </Text>
                )}
                renderSeparator={(sectionIndex, rowIndex) => (
                  <View
                    key={`${sectionIndex}-${rowIndex}`}
                    style={styles.separator}
                  />
                )}
              />
            )}
          />
          <MatchCard
            pattern="/app/feed/article/:id"
            title="Item"
            render={({ params }) => (
              <View style={styles.article}>
                <Text>Item {params.id}</Text>
                <Link style={styles.link} to={`/app/feed/article/${parseInt(params.id) + 1}`}>
                  Next item
                </Link>
              </View>
            )}
          />
        </Navigation>
      </View>
    )
  }

}

export default withHistory(Feed)
