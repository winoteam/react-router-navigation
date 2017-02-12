import React, { PropTypes, Component } from 'react'
import { ListView, View, Text } from 'react-native'
import { Link } from 'react-router-native'
import styles from './styles'

class List extends Component {

  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    isTransitioning: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
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
      <ListView
        ref={(c) => this.listView = c}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <Link to={`/app/feed/article/${rowData.slice(5)}`}>
            <Text style={styles.row}>{rowData}</Text>
          </Link>
        )}
        renderSeparator={(sectionIndex, rowIndex) => (
          <View
            key={`${sectionIndex}-${rowIndex}`}
            style={styles.separator}
          />
        )}
      />
    )
  }

}

export default List
