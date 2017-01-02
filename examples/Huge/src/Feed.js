import React, { Component } from 'react'
import { StatusBar, StyleSheet, Platform, PixelRatio, ListView, View, Text } from 'react-native'
import { Navigation, MatchCard, withHistory } from 'react-native-router-navigation'

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
    padding: 16,
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
        <StatusBar
          backgroundColor="black"
          barStyle="default"
        />
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
                    onPress={() => this.props.history.push(`/app/feed/article/${rowData}`)}
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
            pattern="/app/feed/article/:name"
            title="Item"
            render={({ params }) => (
              <View style={styles.scene}>
                <Text style={styles.article}>{params.name}</Text>
              </View>
            )}
          />
        </Navigation>
      </View>
    )
  }

}

export default withHistory(Feed)
