/* @flow */

import React, { PropTypes, Component } from 'react'
import _ from 'lodash'
import { TabBarIOS } from 'react-native'
import CardStack from './../CardStack'
import { normalizePath } from './../../helpers/utils'
import type { NavigationState, NavigationSceneProps } from './../../types'

type Props = {
  push: (key: string) => void,
  pop: () => void,
  changeTab: (index: string) => void,
  navigationState: NavigationState,
  renderScene: (sceneProps: NavigationSceneProps) => React$Element<any>,
  renderOverlay: (sceneProps: NavigationSceneProps) => React$Element<any> | null,
}

type State = {
  navigationState: NavigationState,
  tabIndex: number,
}

class TabsStack extends Component {

  state: State
  props: Props


  // Clone navigation state to it's own
  // in this component and remove circular
  // references
  constructor(props: Props) {
    super(props)
    const { navigationState } = this.props
    const path = normalizePath(navigationState.path.slice(0, -4))
    const extractedNavigationState = _.cloneDeep(_.get(navigationState, path))
    this.state = {
      navigationState: extractedNavigationState,
      tabIndex: 0,
    }
  }


  // Push new route and update local
  // navigation state with updated navigation
  // state
  push = (key: string) => {
    this.props.push(key, (navigationState) => {
      const path = normalizePath(navigationState.path.slice(0, -4))
      const nextNavigationState = _.cloneDeep(_.get(navigationState, path))
      this.setState({ navigationState: nextNavigationState })
    })
  }


  // Update current tab index
  changeTab = (index: string) => {
    this.props.changeTab(index)
    this.setState({
      tabIndex: index,
    })
  }


  // Back to previous route
  pop = () => {
    this.props.pop((navigationState) => {
      const path = normalizePath(navigationState.path.slice(0, -4))
      const nextNavigationState = _.cloneDeep(_.get(navigationState, path))
      this.setState({ navigationState: nextNavigationState })
    })
  }


  // Provided updated router context
  static childContextTypes = {
    router: PropTypes.object.isRequired,
  }
  getChildContext() {
    return {
      router: {
        push: this.push,
        pop: this.pop,
      },
    }
  }


  // Render each tab in a <CardStack />
  // component
  render() {
    const { navigationState, tabIndex } = this.state
    return (
      <TabBarIOS>
        {navigationState.routes.map((child, index) => (
          <TabBarIOS.Item
            key={index}
            title={child.key}
            selected={tabIndex === index}
            onPress={() => this.changeTab(index)}
          >
            <CardStack
              navigationState={child}
              pop={this.pop}
              renderScene={this.props.renderScene}
              renderOverlay={(sceneProps) => this.props.renderOverlay(sceneProps, this.pop)}
            />
          </TabBarIOS.Item>
        ))}
      </TabBarIOS>
    )
  }

}

export default TabsStack
