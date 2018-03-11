/* @flow */

import React from 'react'
import { Platform } from 'react-native'
import {
  CardStackTransitioner,
  StackRouter,
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation'
import type { CardsRendererProps, Card } from 'react-router-navigation-core'
import type {
  NavigationProps,
  NavBarProps,
  NavigationHeaderProps,
  NavigationRouter,
} from './TypeDefinitions'

type Props = NavigationProps &
  CardsRendererProps & {
    renderHeader: (
      NavBarProps<CardsRendererProps & NavigationHeaderProps> &
        CardsRendererProps &
        NavigationHeaderProps,
    ) => ?React$Element<any>,
  }

type State = {
  router: NavigationRouter,
}

class DefaultNavigationRenderer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { renderHeader, cards } = props
    const routeConfigMap = cards.reduce((acc, card) => {
      return {
        ...acc,
        [card.key]: {
          screen: this.getScreenComponent(card),
          navigationOptions: {
            ...props,
            ...card,
            header: sceneProps => renderHeader({ ...props, ...sceneProps }),
          },
        },
      }
    }, {})
    const router = StackRouter(routeConfigMap)
    this.state = { router }
  }

  getScreenComponent = (card: Card) => {
    const { render, children, component } = card
    if (render) return render
    else if (children && typeof children === 'function') return children
    else if (component) return component
    return null
  }

  render() {
    const { navigationState, onNavigateBack } = this.props
    const { router } = this.state
    return (
      <CardStackTransitioner
        {...this.props}
        headerTransitionPreset={Platform.OS === 'ios' ? 'uikit' : 'fade-in-place'}
        router={router}
        navigation={addNavigationHelpers({
          state: { ...navigationState },
          addListener: () => ({}),
          dispatch: action => {
            if (action.type === NavigationActions.back().type) {
              onNavigateBack()
            }
          },
        })}
      />
    )
  }
}

export default DefaultNavigationRenderer
