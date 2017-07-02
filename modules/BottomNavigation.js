/* @flow */
/* eslint  no-nested-ternary: 0 */

import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view'
import type { TabProps, TabBarProps, TabSubViewProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'
import TabBarBottom from './TabBarBottom'
import { History } from './HistoryUtils'
import TabStack from './TabStack'

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
  style?: StyleSheet,
}

type DefaultProps = {
  lazy: boolean,
}

type State = {
  key: string,
}

class BottomNavigation extends React.Component<DefaultProps, Props, State> {
  props: Props

  static defaultProps: DefaultProps = {
    lazy: true,
  }

  state: State = { key: Math.random().toString(10) }

  renderPager = (sceneProps: TabSubViewProps): React$Element<any> =>
    <TabViewPagerPan
      {...sceneProps}
      key={`pager_${this.state.key}`}
      swipeEnabled={false}
    />

  renderNavigationBar = (
    sceneProps: TabSubViewProps,
    props: TabSubViewProps,
  ): ?React$Element<any> => {
    // Hide tab bar
    if (sceneProps.hideTabBar) return null
    // Custom tab bar
    if (sceneProps.renderTabBar) {
      return React.createElement(sceneProps.renderTabBar, sceneProps)
    }
    // Default tab bar
    return <TabBarBottom sceneProps={sceneProps} {...props} />
  }

  renderScene = (sceneProps: TabSubViewProps): ?React$Element<any> => {
    const { render, children, component } = sceneProps
    const Scene = component // component prop gets first priority
      ? React.createElement(component, sceneProps)
      : render // render prop is next
        ? render(sceneProps)
        : children && typeof children === 'function' // then children as func
          ? children(sceneProps)
          : null
    return (
      <View style={styles.scene}>
        {Scene}
      </View>
    )
  }

  render(): React$Element<any> {
    return (
      <History>
        {history =>
          <TabStack
            {...this.props}
            history={history}
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
                  lazy={this.props.lazy}
                  animationEnabled={false}
                  renderPager={StackUtils.renderSubView(
                    this.renderPager,
                    ownProps,
                  )}
                  renderFooter={StackUtils.renderSubView(
                    this.renderNavigationBar,
                    ownProps,
                  )}
                  renderScene={StackUtils.renderSubView(
                    this.renderScene,
                    ownProps,
                  )}
                />
              )
            }}
          />}
      </History>
    )
  }
}

export default BottomNavigation
