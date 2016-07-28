/* @flow */

import React, { Component, createElement } from 'react'
import { TabBarIOS } from 'react-native'
import StaticContainer from 'react-static-container'

class TabView extends Component {

  componentWillMount() {
    this.state = {
      selectedIndex: 0,
    }  
  }

  onChangeTab = (index) => {
    this.setState({
      selectedIndex: index,
    })
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
            selected={selectedIndex === index}
            onPress={() => this.onChangeTab(index)}
          >
            <StaticContainer>
              {createElement(child.component)}
            </StaticContainer>
          </TabBarIOS.Item>
        ))}
      </TabBarIOS>
    )
  }

}

export default TabView
