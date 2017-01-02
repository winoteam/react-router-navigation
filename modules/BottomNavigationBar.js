/* @flow */

import React, { PropTypes, Component } from 'react'
import { TouchableWithoutFeedback, StyleSheet, Dimensions, PixelRatio, View, Text } from 'react-native'
import type { SceneRendererProps } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { Tab } from './StackTypeDefinitions'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: 48,
    backgroundColor: '#fafafa',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#b2b2b2',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#929292',
    fontSize: 10,
    textAlign: 'center',
  },
})

type Props = SceneRendererProps & {
  tabs: Array<Tab>,
}

type State = {
  tabItems: Array<Tab & {
    pathname: string,
  }>,
}

type Context = {
  history: any,
}

class BottomNavigationBar extends Component<void, Props, State> {

  props: Props
  state: State
  context: Context

  constructor(props: Props, context: Context) {
    super(props, context)
    const { tabs } = props
    this.state = {
      tabItems: tabs.map((tab) => ({
        ...tab,
        pathname: tab.pattern,
      })),
    }
  }

  static contextTypes = {
    history: PropTypes.object,
  }

  onRequestChangeTab = (index: number): void => {
    const { tabItems } = this.state
    const { history } = this.context
    const { navigationState } = this.props
    // Get current tab and update its pathname
    const currentTab = tabItems[navigationState.index]
    currentTab.pathname = history.location.pathname
    const nextTabItems = tabItems
    // Get new tab to switch
    const tab = tabItems[index]
    // Update history
    history.replace(tab.pathname)
    // Update state
    nextTabItems[navigationState.index] = currentTab
    this.setState({ tabItems: nextTabItems })
  }

  render(): React$Element<any> {
    const { tabItems } = this.state
    return (
      <View style={styles.container}>
        {tabItems.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => this.onRequestChangeTab(index)}
          >
            <View style={styles.item}>
              <Text style={styles.label}>
                {item.label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    )
  }

}

export default BottomNavigationBar
