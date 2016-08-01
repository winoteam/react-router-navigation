/* @flow */
/* eslint max-len: 0 */

import React, { Component, createElement } from 'react'
import { TabBarIOS } from 'react-native'
import StaticContainer from 'react-static-container'
import type { NavigationTabs, NavigationRoute, NavigationState, NavigationTransitionProps } from './../../types'

type Props = {
  children: NavigationTabs,
  onChange: (index: number) => void,
  renderContainer: () => React$Element<any>,
  renderScene: (sceneProps: NavigationTransitionProps) => React$Element<any>,
  renderOverlay: (sceneProps: NavigationTransitionProps) => React$Element<any>,
  pop: () => void,
  navigationState: NavigationState,
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


  // Callback which receives the current
  // scene and returns a React Element.
  renderScene = (child: NavigationRoute): React$Element<any> => {
    return (
      <StaticContainer>
        {createElement(
          this.props.renderContainer,
          {},
          createElement(child.component, {})
        )}
      </StaticContainer>
    )
  }


  render() {
    const { children } = this.props
    const { selectedIndex } = this.state
    return (
      <TabBarIOS>
        {children.map((child, index) => (
          <TabBarIOS.Item
            key={index}
            title={child.title}
            systemIcon="history"
            selected={selectedIndex === index}
            onPress={() => this.onChangeTab(index)}
            children={this.renderScene(child)}
          />
        ))}
      </TabBarIOS>
    )
  }

}

export default TabView
