/* @flow */

import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view'
import { TabStack, renderSubView } from 'react-router-navigation-core'
import type { TabBarProps, TabSubViewProps, TabProps } from './TypeDefinitions'
import TabBarBottom from './TabBarBottom'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    overflow: 'hidden',
  },
})

type Props = TabBarProps & {
  children?: Array<React$Element<TabProps>>,
  lazy?: boolean,
  style?: StyleObj,
}

type State = {
  key: string,
}

class BottomNavigation extends React.Component<Props, State> {
  static defaultProps = {
    lazy: true,
  }

  state = { key: Math.random().toString(10) }

  renderPager = (sceneProps: TabSubViewProps) => (
    <TabViewPagerPan
      {...sceneProps}
      key={`pager_${this.state.key}`}
      swipeEnabled={false}
    />
  )

  renderNavigationBar = (
    sceneProps: TabSubViewProps,
    props: TabSubViewProps,
  ) => {
    // Hide tab bar
    if (sceneProps.hideTabBar) return null
    // Custom tab bar
    if (sceneProps.renderTabBar) {
      return React.createElement(sceneProps.renderTabBar, sceneProps)
    }
    // Default tab bar
    return <TabBarBottom sceneProps={sceneProps} {...props} />
  }

  renderSceneView = (sceneProps: TabSubViewProps) => {
    const { render, children, component, lazy, loadedTabs } = sceneProps
    const { key } = sceneProps
    if (lazy && !loadedTabs.includes(key)) {
      return null
    } else if (render) {
      return render(sceneProps)
    } else if (children && typeof children === 'function') {
      return children(sceneProps)
    } else if (component) {
      return React.createElement(component, sceneProps)
    }
    return null
  }

  renderScene = (sceneProps: TabSubViewProps) => {
    return <View style={styles.scene}>{this.renderSceneView(sceneProps)}</View>
  }

  render() {
    return (
      <TabStack
        {...this.props}
        style={styles.container}
        forceSync
        render={props => {
          const ownProps = { ...this.props, ...props }
          return (
            <TabViewAnimated
              {...props}
              key={`transitioner_${this.state.key}`}
              style={[styles.container, this.props.style]}
              initialLayout={Dimensions.get('window')}
              animationEnabled={false}
              renderPager={renderSubView(this.renderPager, ownProps)}
              renderFooter={renderSubView(this.renderNavigationBar, ownProps)}
              renderScene={renderSubView(this.renderScene, ownProps)}
            />
          )
        }}
      />
    )
  }
}

export default BottomNavigation
