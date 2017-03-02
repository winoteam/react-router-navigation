# ```<Navigation />```
Navigation make it easy to explore and switch between different views.

## Example
<img src="https://raw.githubusercontent.com/LeoLeBras/react-router-navigation/master/docs/navigation.gif" width="250">

```js
import React from 'react'
import { Navigation, Card } from 'react-router-navigation'

const App = () => (
  <Navigation>
    <Card path="/one" component={require('./One')} />
    <Card path="/two" component={require('./Two')} />
    <Card path="/three" component={require('./Three')} />
  </Navigation>
)
```

## Options

#### ```<Navigation />``` props
* **hideNavBar** ```?boolean``` whether to display nav bar
* **renderNavBar** ```?string``` callback which renders a custom navigation bar
* **navBarStyle** ```?StyleSheet``` style override for the navigation bar
* **hideBackButton** ```?boolean``` whether to display default back button
* **backButtonStyle** ```?string``` sets the color of the back button
* **renderLeftButton** ```?Function``` callback which renders a custom left button
* **title** ```?string``` string to be displayed in the navigation bar
* **titleStyle** ```?StyleSheet``` style override for the title element
* **renderTitle** ```?Function``` callback which renders a custom title component
* **renderRightButton** ```?Function``` callback which renders a right button

#### ```<Card />``` props
* [```... <Route />``` props](https://reacttraining.com/react-router/#route)
* [```... <Navigation />``` props](https://reacttraining.com/react-router/#route)
