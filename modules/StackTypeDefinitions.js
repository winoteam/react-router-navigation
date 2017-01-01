/* @flow */

export type MatchCardProps = {
  pattern: string,
  exactly?: boolean,
  component?: () => React$Element<any>,
  render?: () => React$Element<any>,
  title?: string,
  hideNavBar?: boolean,
}

// @TODO $FlowFixMe
export type Card = MatchCardProps & {
  key: string,
}

export type MatchTabProps = {
  pattern: string,
  exactly?: boolean,
  component?: () => React$Element<any>,
  render?: () => React$Element<any>,
  label?: string,
}

// @TODO $FlowFixMe
export type Tab = MatchTabProps & {
  key: string,
}
