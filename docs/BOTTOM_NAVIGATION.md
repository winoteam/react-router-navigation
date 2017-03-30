# ```<BottomNavigation />```
Bottom navigation bars make it easy to explore and switch between top-level views in a single tap.


## Example
<img src="https://raw.githubusercontent.com/LeoLeBras/react-router-navigation/master/docs/bottom-navigation.gif" width="250">

```js
import React from 'react'
import { BottomNavigation, Tab } from 'react-router-navigation'

const App = () => (
  <BottomNavigation
    lazy={false}
    tabActiveTintColor="purple"
  >
    <Tab label="Feed" path="/feed" component={require('./Feed')} />
    <Tab label="Search" path="/search" component={require('./Search')} />
    <Tab label="Profile" path="/profile" component={require('./Profile')} />
  </BottomNavigation>
)
```

## Options

### TabBar Props
* **hideTabBar** ```?boolean``` whether to display tab bar
* **tabBarStyle** ```?StyleSheet``` style override for the tab bar
* **renderTabBar** ```?Function``` callback which renders a bottom tab bar
* **tabTintColor** ```?string``` label and icon color of the tab
* **tabActiveTintColor** ```?string``` label and icon color of the active tab
* **label** ```?string``` text that appears on each item
* **labelStyle** ```?(StyleSheet | Function)``` styling text item
* **renderLabel** ```?Function``` callback which renders a label
* **renderTabIcon** ```?Function``` optional callback which receives the current scene and returns a React Element to be used as a icon

#### ```<BottomNavigation />``` Props
* [```... TarBar Props```](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/BOTTOM_NAVIGATION.md#tabbar-props)
* **style** ```?StyleSheet``` override or extend the default style for ```<View />``` container
* **lazy** ```?boolean``` whether to load tabs lazily when you start switching

#### ```<Tab />``` Props
* [```... <Route />``` props](https://reacttraining.com/react-router/#route)
* [```... TarBar Props```](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/BOTTOM_NAVIGATION.md#tabbar-props)
* **onReset** ```?Function``` callback which resets the current tab
