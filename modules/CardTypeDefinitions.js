/* @flow */

export type CardState = {
  isFocused: boolean,
  isTransitioning: boolean,
}

export type CardProps = {
  pattern: string,
  exactly?: boolean,
  component?: () => React$Element<any>,
  render?: () => React$Element<any>,
  hideNavBar?: boolean,
  navBarStyle?: StyleSheet,
  renderLeftComponent: () => React$Element<any>,
  title?: string,
  titleStyle?: StyleSheet,
  onResetCard?: () => void,
}

// @TODO $FlowFixMe
export type Card = CardProps & {
  key: string,
}

export type Cards = Array<Card>
