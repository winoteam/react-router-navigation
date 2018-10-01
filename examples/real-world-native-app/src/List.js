/* @flow */

import * as React from 'react'
import { StyleSheet, PixelRatio, ListView, View, Text } from 'react-native'
import { Link } from 'react-router-native'
import type { ContextRouter } from 'react-router'

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

type Props = ContextRouter

type State = {|
  dataSource: Object,
|}

export default class List extends React.Component<Props, State> {
  listView: ?List = null

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

  scrollTo = (options: { x?: number, y?: number, animated?: boolean }) => {
    if (this.listView) this.listView.scrollTo(options)
  }

  renderRow = (rowData: string) => {
    const { match } = this.props
    if (!match || !match.params) return null
    return (
      <Link to={`${match.url}/article/${rowData.slice(9)}`}>
        <Text style={styles.row}>{rowData}</Text>
      </Link>
    )
  }

  renderSeparator = (sectionIndex: number, rowIndex: number) => {
    return <View key={`${sectionIndex}-${rowIndex}`} style={styles.separator} />
  }

  render() {
    return (
      <ListView
        ref={c => (this.listView = c)}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
      />
    )
  }
}
