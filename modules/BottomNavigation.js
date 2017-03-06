/* @flow */

import React, { Component, createElement } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view'
import type { TabProps, TabBarProps, TabSubViewProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'
import TabStack from './TabStack'
import BottomNavigationBar from './BottomNavigationBar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

type Props = TabBarProps & {
  children?: Array<React$Element<TabProps>>,
  lazy?: boolean,
  style?: StyleSheet,
}

type DefaultProps = {
  lazy: boolean,
}

type State = {
  key: string,
}

class BottomNavigation extends Component<DefaultProps, Props, State> {

  props: Props

  static defaultProps: DefaultProps = {
    lazy: true,
  }

  state: State = { key: Math.random().toString(10) }

  renderPager = (props: TabSubViewProps): React$Element<any> => (
    <TabViewPagerPan
      {...props}
      key={`pager_${this.state.key}`}
      swipeEnabled={false}
    />
  )

  renderNavigationBar = (props: TabSubViewProps): React$Element<any> => {
    // Custom tab bar
    if (props.renderTabBar) {
      return createElement(
        props.renderTabBar,
        props,
      )
    }
    // Default tab bar
    return (
      <BottomNavigationBar
        {...props}
        key={`tabbar_${this.state.key}`}
        onRequestChangeTab={props.onRequestChangeTab}
      />
    )
  }

  renderScene = (props: TabSubViewProps): ?React$Element<any> => {
    const { render, children, component } = props
    if (render) return render(props)
    else if (children && typeof children === 'function') return children(props)
    else if (component) return createElement(component, props)
    return null
  }

  render(): React$Element<any> {
    return (
      <TabStack
        {...this.props}
        style={styles.container}
        forceSync={true}
        render={(props) => {
          const ownProps = { ...this.props, ...props }
          return (
            <TabViewAnimated
              {...props}
              key={`transitioner_${this.state.key}`}
              style={[styles.container, this.props.style]}
              initialLayout={Dimensions.get('window')}
              lazy={this.props.lazy}
              configureTransition={() => null}
              renderPager={StackUtils.renderSubView(this.renderPager, ownProps)}
              renderFooter={StackUtils.renderSubView(this.renderNavigationBar, ownProps)}
              renderScene={StackUtils.renderSubView(this.renderScene, ownProps)}
            />
          )
        }}
      />
    )
  }

}

export default BottomNavigation
