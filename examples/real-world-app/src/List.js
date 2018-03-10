/* @flow */

import React from 'react'
import { StyleSheet, PixelRatio, ListView, View, Text } from 'react-native'
import { Link } from 'react-router-native'
import type { Match } from 'react-router'

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

type Props = {
  match: Match,
}

type State = {|
  dataSource: Object,
|}

class List extends React.Component<Props, State> {
  listView: ListView

  constructor(props: Props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: () => false,
    })
    this.state = {
      dataSource: ds.cloneWithRows(
        Array.from({ length: 100 }).map((a, i) => `Article #${i + 1}`),
      ),
    }
  }

  scrollTo = (options: Object) => {
    if (this.listView) this.listView.scrollTo(options)
  }

  render() {
    const { match: { url } } = this.props
    return (
      <ListView
        ref={c => {
          this.listView = c
        }}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={rowData => (
          <Link to={`${url}/article/${rowData.slice(9)}`}>
            <Text style={styles.row}>{rowData}</Text>
          </Link>
        )}
        renderSeparator={(sectionIndex, rowIndex) => (
          <View key={`${sectionIndex}-${rowIndex}`} style={styles.separator} />
        )}
      />
    )
  }
}

export default List
