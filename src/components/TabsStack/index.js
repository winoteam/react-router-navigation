/* @flow */

import React, { PropTypes, Component } from 'react'
import _ from 'lodash'
import CardStack from './../CardStack'
import TabView from './../TabView'
import { normalizePath } from './../../helpers/utils'
import type { NavigationState, NavigationSceneProps } from './../../types'

type Props = {
  push: (key: string) => void,
  pop: () => void,
  changeTab: (index: number) => void,
  navigationState: NavigationState,
  renderScene: (sceneProps: NavigationSceneProps) => React$Element<any>,
  renderHeader: (sceneProps: NavigationSceneProps) => React$Element<any> | null,
}

type DefaultProps = {
  renderHeader: () => null,
}

type State = {
  navigationState: NavigationState,
  tabIndex: number,
}

class TabsStack extends Component {

  state: State
  props: Props

  static defaultProps: DefaultProps = {
    renderHeader: () => null
  }


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
    }
  }


  // Dispatch actions
  push = (key: string) => {
    this.props.push(key, this.updateNavigationState)
  }
  changeTab = (index: number) => {
    this.props.changeTab(index, this.updateNavigationState)
  }
  pop = () => {
    this.props.pop(this.updateNavigationState)
  }


  // Update local navigation state each
  // time an action is dispatched
  updateNavigationState = (navigationState: navigationState): void => {
    const path = normalizePath(navigationState.path.slice(0, -4))
    const nextNavigationState = _.cloneDeep(_.get(navigationState, path))
    this.setState({ navigationState: nextNavigationState })
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
    const { navigationState } = this.state
    return (
      <TabView
        navigationState={navigationState}
        changeTab={this.changeTab}
        renderScene={(_navigationState) => (
          <CardStack
            navigationState={_navigationState}
            pop={this.pop}
            renderScene={this.props.renderScene}
            renderHeader={(sceneProps) => this.props.renderHeader(sceneProps, this.pop)}
          />
        )}
      />
    )
  }

}

export default TabsStack
