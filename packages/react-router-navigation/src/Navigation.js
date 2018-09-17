import * as React from 'react'
import { Platform, BackHandler } from 'react-native'
import { Route } from 'react-router'
import { CardStack } from 'react-router-navigation-core'
import DefaultNavigationRenderer from './DefaultNavigationRenderer'
import NavBar from './NavBar'
import { NavigationPropTypes } from './PropTypes'

export default class Navigation extends React.Component {
  static propTypes = NavigationPropTypes

  static defaultProps = {
    headerTransitionPreset:
      Platform.OS === 'android' ? 'fade-in-place' : 'uikit',
  }

  renderHeader = headerProps => {
    const { cards, scene } = headerProps
    const activeCard = cards.find(card => card.path === scene.route.name)
    const navBarProps = { ...headerProps, ...activeCard }
    if (navBarProps.hideNavBar) return null
    if (navBarProps.renderNavBar) {
      return navBarProps.renderNavBar(headerProps)
    }
    return <NavBar {...headerProps} />
  }

  render() {
    return (
      <Route>
        {({ history }) => (
          <CardStack
            {...this.props}
            backHandler={BackHandler}
            history={history}
            render={cardStackRendererProps => (
              <DefaultNavigationRenderer
                {...this.props}
                {...cardStackRendererProps}
                renderHeader={this.renderHeader}
              />
            )}
          />
        )}
      </Route>
    )
  }
}
