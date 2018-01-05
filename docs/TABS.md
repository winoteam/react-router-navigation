# `<Tabs />`

Tabs make it easy to explore and switch between different views.

## Example

<img src="https://raw.githubusercontent.com/LeoLeBras/react-router-navigation/master/docs/tabs.gif" width="250">

```js
import React from 'react'
import { Tabs, Tab } from 'react-router-navigation'

const App = () => (
  <Tabs
    labelStyle={{ color: 'white' }}
    tabBarStyle={{ backgroundColor: 'purple' }}
    tabBarIndicatorStyle={{ backgroundColor: 'white' }}
  >
    <Tab path="/one" component={require('./One')} />
    <Tab path="/two" component={require('./Two')} />
    <Tab path="/three" component={require('./Three')} />
  </Tabs>
)
```

## Options

### TabBar props

* **hideTabBar** `?boolean` whether to display tab bar
* **tabBarStyle** `?StyleSheet` style override for the tab bar
* **renderTabBar** `?Function` callback which renders a bottom tab bar
* **tabBarPosition** `?('top' | 'bottom')` sets the position of the tab bar
* **tabStyle** `?StyleSheet` style override for the tab bar
* **tabBarIndicatorStyle** `?StyleSheet` style object for the tab indicator
* **tabTintColor** `?string` label and icon color of the tab
* **tabActiveTintColor** `?string` label and icon color of the active tab
* **label** `?string` text that appears on each item
* **labelStyle** `?(StyleSheet | Function)` styling text item
* **renderLabel** `?Function` callback which renders a label

#### `<Tabs />` props

* [`... TabBar props` props](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/BOTTOM_NAVIGATION.md#tabbar-props)
* **style** `?StyleSheet` override or extend the default style for `<View />` container
* **lazy** `?boolean` whether to load tabs lazily when you start switching
* **configureTransition** `:?Function` callback which returns a configuration for the transition, return null to disable animation

#### `<Tab />` props

* [`... <Route />` props](https://reacttraining.com/react-router/native/api/Route)
* [`... TabBar props` props](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/BOTTOM_NAVIGATION.md#tabbar-props)
* **onReset** `?Function` callback which resets the current tab
