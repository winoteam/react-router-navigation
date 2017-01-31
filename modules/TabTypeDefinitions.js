/* @flow */

export type TabProps = {
  pattern: string,
  exactly?: boolean,
  component?: () => React$Element<any>,
  render?: () => React$Element<any>,
  label?: string,
  labelStyle?: () => StyleSheet | StyleSheet,
  tabBarIndicatorStyle?: StyleSheet,
  renderTabIcon?: () => React$Element<any>,
}

// @TODO $FlowFixMe
export type Tab = TabProps & {
  key: string,
}

export type Tabs = Array<Tab>
