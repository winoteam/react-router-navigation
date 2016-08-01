/* @flow */
/* eslint max-len: 0 */

import React, { PropTypes, Component, createElement } from 'react'
import { View, TabBarIOS } from 'react-native'
import StaticContainer from 'react-static-container'
import CardStack from './../CardStack'
import type { NavigationTabs, NavigationRoute, NavigationState, NavigationTransitionProps } from './../../types'

type Props = {
  children: NavigationTabs,
  renderTabsContainer: () => React$Element<any>,
  onChange: (index: number) => void,
}

type State = {
  selectedIndex: number,
}

class TabView extends Component {

  props: Props

  state: State = {
    selectedIndex: 0,
  }


  // Callback for when the current item
  // changes.
  onChangeTab = (index: number): void => {
    this.props.onChange(index)
    this.setState({
      selectedIndex: index,
    })
  }


  render() {
    const { children, renderTabsContainer } = this.props
    const { selectedIndex } = this.state
    return createElement(renderTabsContainer, {},
      <TabBarIOS>
        {children.map((child, index) => (
          <TabBarIOS.Item
            key={index}
            title={child.key}
            selected={selectedIndex === index}
            onPress={() => this.onChangeTab(index)}
            children={createElement(() => this.props.renderTab(index))}
          />
        ))}
      </TabBarIOS>
    )
  }

}

export default TabView
