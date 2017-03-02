# ```<Tabs />```
Bottom navigation bars make it easy to explore and switch between top-level views in a single tap.


## Example
<img src="https://raw.githubusercontent.com/LeoLeBras/react-router-navigation/master/docs/tabs.gif" width="250">

```js
import React from 'react'
import { Tabs, Tab } from 'react-router-navigation'

const App = () => (
  <Tabs>
    <Tab path="/one" component={require('./One')} />
    <Tab path="/two" component={require('./One')} />
    <Tab path="/three" component={require('./Two')} />
  </Tabs>
)
```

## Options

#### ```<Tabs />``` props
* **style** ```?StyleSheet``` : override or extend the default style for ```<View />``` container
* **lazy** ```?boolean``` : whether to load tabs lazily when you start switching
* **renderTabBar** ```?Function``` : callback which renders a bottom tab bar
* **label** ```?string``` text that appears on each item
* **labelStyle** ```?(StyleSheet | Function)``` styling text item
* **tabBarIndicatorStyle** ```?StyleSheet``` style object for the tab indicator

#### ```<Tab />``` props
* [```... <Route />``` props](https://reacttraining.com/react-router/#route)
* **label** ```?string``` text that appears on each item
* **labelStyle** ```?(StyleSheet | Function)``` styling text item
