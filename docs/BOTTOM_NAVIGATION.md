# ```<BottomNavigation />```
Bottom navigation bars make it easy to explore and switch between top-level views in a single tap.


## Example

![<BottomNavigation />](https://raw.githubusercontent.com/LeoLeBras/react-router-navigation/master/docs/bottom-navigation.gif =450x)

```js
import React from 'react'
import { BottomNavigation, Tab } from 'react-router-navigation'

const App = () => (
  <BottomNavigation>
    <Tab path="/one" component={require('./One')} />
    <Tab path="/two" component={require('./One')} />
    <Tab path="/three" component={require('./Two')} />
  </BottomNavigation>
)
```

## Options

#### ```<BottomNavigation />``` props
* **style** ```?StyleSheet``` : override or extend the default style for ```<View />``` container
* **lazy** ```?boolean``` : whether to load tabs lazily when you start switching
* **renderTabBar** ```?Function``` : callback which renders a bottom tab bar
* **label** ```?string```
* **labelStyle** ```?(StyleSheet | Function)```

#### ```<Tab />``` props
* **path** ```string``` any valid URL path that [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) understands.
* **exact** ```?boolean``` when true, will only match if the path matches the location.pathname exactly
* **strict** ```?boolean``` when true, a path that has a trailing slash will only match a location.pathname with a trailing slash
* **label** ```?string``` text that appears under the icon
* **labelStyle** ```?(StyleSheet | Function)```
* **renderTabIcon** ```?Function``` optional callback which receives the current scene and returns a React Element to be used as a icon
