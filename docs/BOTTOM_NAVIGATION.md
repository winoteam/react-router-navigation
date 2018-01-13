# `<BottomNavigation />`

Bottom navigation bars make it easy to explore and switch between top-level views in a single tap.

## Example

<img src="https://raw.githubusercontent.com/LeoLeBras/react-router-navigation/master/docs/bottom-navigation.gif" width="250">

```js
import React from 'react'
import { BottomNavigation, Tab } from 'react-router-navigation'

const App = () => (
  <BottomNavigation lazy={false} tabActiveTintColor="blue">
    <Tab label="Feed" path="/feed" component={require('./Feed')} />
    <Tab label="Profile" path="/profile" component={require('./Profile')} />
  </BottomNavigation>
)
```

## Options

### TabBar props

* **hideTabBar** `?boolean` whether to display tab bar
* **tabBarStyle** `?StyleSheet` override style for the tab bar
* **renderTabBar** `?Function` callback which renders a tab bar
* **tabStyle** `?StyleSheet` override style for the tab item
* **tabTintColor** `?string` label and icon color of the tab
* **tabActiveTintColor** `?string` label and icon color of the active tab
* **label** `?string` text that appears on each item
* **labelStyle** `?(StyleSheet | Function)` styling text item
* **renderLabel** `?Function` callback which renders a label
* **renderTabIcon** `?Function` optional callback which receives the current scene and returns a React Element to be used as an icon

#### `<BottomNavigation />` props

* [`... TabBar props`](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/BOTTOM_NAVIGATION.md#tabbar-props)
* **style** `?StyleSheet` override or extend the default style for `<View />` container
* **lazy** `?boolean` whether to load tabs lazily when you start switching

#### `<Tab />` props

* [`... <Route />` props](https://reacttraining.com/react-router/native/api/Route)
* [`... TabBar props`](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/BOTTOM_NAVIGATION.md#tabbar-props)
* **onReset** `?Function` callback which resets the current tab
* **onIndexChange** `?Function` callback which update history
