/* @flow */

import React from 'react'
import {
  CardStackTransitioner,
  StackRouter,
  NavigationActions, // $FlowFixMe
  addNavigationHelpers,
  type NavigationRouter,
  type NavigationStackScreenOptions,
  type HeaderProps,
} from 'react-navigation'
import { type CardsRendererProps, type Card } from 'react-router-navigation-core'
import { type NavigationProps, type NavBarProps } from './TypeDefinitions'

type Props = NavigationProps &
  CardsRendererProps & {
    renderHeader: (
      headerProps: NavBarProps<CardsRendererProps & HeaderProps> &
        CardsRendererProps &
        HeaderProps,
    ) => ?React$Element<any>,
  }

type State = {
  router: NavigationRouter<*, NavigationStackScreenOptions>,
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
    const {
      navigationState,
      onNavigateBack,
      mode,
      cardStyle,
      onTransitionStart,
      onTransitionEnd,
    } = this.props
    const { router } = this.state
    return (
      <CardStackTransitioner
        headerTransitionPreset="uikit"
        mode={mode}
        cardStyle={cardStyle}
        onTransitionStart={onTransitionStart}
        onTransitionEnd={onTransitionEnd}
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
