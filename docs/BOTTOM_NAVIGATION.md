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
    labelStyle={({ isActive }) => isActive && { color: 'purple' }}
  >
    <Tab label="Feed" path="/feed" component={require('./Feed')} />
    <Tab label="Search" path="/search" component={require('./Search')} />
    <Tab label="Profile" path="/profile" component={require('./Profile')} />
  </BottomNavigation>
)
```

## Options

#### ```<BottomNavigation />``` props
* **style** ```?StyleSheet``` : override or extend the default style for ```<View />``` container
* **lazy** ```?boolean``` : whether to load tabs lazily when you start switching
* **renderTabBar** ```?Function``` : callback which renders a bottom tab bar
* **label** ```?string``` text that appears on each item
* **labelStyle** ```?(StyleSheet | Function)``` styling text item

#### ```<Tab />``` props
* [```... <Route />``` props](https://reacttraining.com/react-router/#route)
* **label** ```?string``` text that appears on each item
* **labelStyle** ```?(StyleSheet | Function)``` styling text item
* **renderTabIcon** ```?Function``` optional callback which receives the current scene and returns a React Element to be used as a icon
* **onReset** ```?Function``` callback which resets the current tab
