# ```<Tabs />```
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
    tabBarIndicatorStyle={{ background: 'white' }}
  >
    <Tab path="/one" component={require('./One')} />
    <Tab path="/two" component={require('./Two')} />
    <Tab path="/three" component={require('./Three')} />
  </Tabs>
)
```

## Options

#### ```<Tabs />``` props
* **renderTabBar** ```?Function``` : callback which renders a bottom tab bar
* **label** ```?string``` text that appears on each item
* **labelStyle** ```?(StyleSheet | Function)``` styling text item
* **tabBarStyle** ```?StyleSheet``` styling tab bar
* **tabBarIndicatorStyle** ```?StyleSheet``` style object for the tab indicator

#### ```<Tab />``` props
* [```... <Route />``` props](https://reacttraining.com/react-router/#route)
* **label** ```?string``` text that appears on each item
* **labelStyle** ```?(StyleSheet | Function)``` styling text item
* **onReset** ```?Function``` callback which resets the current tab
