import React, { PropTypes, Component } from 'react'
import { StyleSheet, Platform, PixelRatio, StatusBar, ListView, View, Text } from 'react-native'
import { Link } from 'react-router-navigation'

const styles = StyleSheet.create({
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
})

class List extends Component {

  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    isTransitioning: PropTypes.bool.isRequired,
  }

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

  shouldComponentUpdate(nextProps) {
    return nextProps.isFocused && !nextProps.isTransitioning
  }

  render() {
    return (
      <View style={styles.scene}>
        <StatusBar
          barStyle="dark-content"
        />
        <ListView
          ref={(c) => this.listView = c}
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <Link to={`/app/feed/article/${rowData.slice(5)}`}>
              {({ onPress }) => (
                <Text
                  style={styles.row}
                  onPress={onPress}
                >
                  {rowData}
                </Text>
              )}
            </Link>
          )}
          renderSeparator={(sectionIndex, rowIndex) => (
            <View
              key={`${sectionIndex}-${rowIndex}`}
              style={styles.separator}
            />
          )}
        />
      </View>
    )
  }

}

export default List
