# ```<BottomNavigation />```
Bottom navigation bars make it easy to explore and switch between top-level views in a single tap. (from [material.io](https://material.io/guidelines/components/bottom-navigation.html#))

![<BottomNavigation />](https://github.com/LeoLeBras/react-router-navigation/tree/master/docs/bottom-navigation.gif)

```js
import React from 'react'
import { NativeRouter } from 'react-router-native'
import { BottomNavigation, Tab } from 'react-router-navigation'

const App = () => (
  <NativeRouter>
    <BottomNavigation>
      <Tab path="/one" component={require('./One')} />
      <Tab path="/two" component={require('./One')} />
      <Tab path="/three" component={require('./Two')} />
    </BottomNavigation>
  </NativeRouter>
)
```

## ```<BottomNavigation />``` props
* **style** ```?StyleSheet``` : override or extend the default style for ```<View />``` container
* **lazy** ```?boolean``` : whether to load tabs lazily when you start switching
* **renderTabBar** ```?Function``` : callback which renders a bottom tab bar
* **label** ```?string```
* **labelStyle** ```?(StyleSheet | Function)```

## ```<Tab />``` props
* **path** ```string```
* **exact** ```boolean```
* **strict** ```boolean```
* **label** ```?string```
* **labelStyle** ```?(StyleSheet | Function)```
* **renderTabIcon** ```?Function```
