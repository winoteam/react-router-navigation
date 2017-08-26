# react-router-navigation
[![Build Status](https://travis-ci.org/LeoLeBras/react-router-navigation.svg?branch=master)](https://travis-ci.org/LeoLeBras/react-router-navigation)
[![npm version](https://badge.fury.io/js/react-router-navigation.svg)](https://badge.fury.io/js/react-router-navigation)
[![Am I a cool kid ?](http://cool-kid.herokuapp.com/LeoLeBras/react-router-navigation)](https://github.com/awemakers/cool-kid)

`react-router-navigation` provides tools to navigate between multiple screens with
navigators or tab views. This library is based on `react-router`, `react-navigation`,
and `react-native-tab-view`.

<img src="https://raw.githubusercontent.com/LeoLeBras/react-router-navigation/master/docs/demo.gif" width="250">

## Highlights
* **Just an add-on to ```react-router```**
* Declarative composability
* Allow you to call transitions anywhere in your code with simple components
* Dynamic Routing
* URL Driven Development
* Easy-to-use navigation solution using ```react-navigation```
* Tab Bar Support using ```react-native-tab-view```
* Cross-platform
* First class deep linking support
* Nested Navigators

## How to use
Install:
```shell
$ yarn add react-router react-router-native react-router-navigation
```

And then, enjoy it:
```js
import React from 'react'
import { Text } from 'react-native'
import { NativeRouter, Link } from 'react-router-native'
import { Navigation, Card } from 'react-router-navigation'

const App = () => (
  <NativeRouter>
    <Navigation>
      <Card
        exact
        path="/"
        render={() => <Link to="/hello"><Text>Press it</Text></Link>}
      />
      <Card
        path="/hello"
        render={() => <Text>Hello</Text>}
      />
    </Navigation>
  </NativeRouter>
)
```

## Docs
* [```<Navigation />```](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/NAVIGATION.md) handles the transition between different scenes in your app.
* [```<Tabs />```](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/TABS.md) make it easy to explore and switch between different views.
* [```<BottomNavigation />```](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/BOTTOM_NAVIGATION.md) make it easy to explore and switch between top-level views in a single tap.

## Advanced
### Platform Support
```react-router-navigation``` is cross-platform. It supports all platforms that [`react-navigation`](https://github.com/react-community/react-navigation/) and[`react-native-tab-view`](https://github.com/react-native-community/react-native-tab-view) support (Android and iOS).

### Performance
`<Navigation />`, `<Tabs />` and `<BottomNavigation />` are updated every time the parent receives new props. If your view is expensive, it's good idea to move each route inside a separate stateful component and use the shouldComponentUpdate lifecycle hook to prevent unnecessary re-renders.

For example, instead of:
```js
import MyExpensiveViewComponent from './MyExpensiveViewComponent'

const App = () => (
  <Navigation>
    <Card
      {...routeProps}
      render={() => <MyExpensiveViewComponent />}
    />
    <Card
      {...routeProps}
      render={() => <MyExpensiveViewComponent />}
    />
  </Navigation>
)
```

Prefer the following:
```js
/* CardA.js */
import MyExpensiveViewComponent from './MyExpensiveViewComponent'

export default class CardA extends React.Component {

  shouldComponentUpdate() {
    return false
  }

  render() {
    return <MyExpensiveViewComponent />
  }

}

/* CardB.js */
import MyExpensiveViewComponent from './MyExpensiveViewComponent'

export default class CardB extends React.Component {

  shouldComponentUpdate() {
    return false
  }

  render() {
    return <MyExpensiveViewComponent />
  }

}

/* App.js */
import CardA from './CardA'
import CardB from './CardB'

const App = () => (
  <Navigation>
    <Card
      {...cardProps}
      component={CardA}
    />
    <Card
      {...cardProps}
      component={CardB}
    />
  </Navigation>
)
```

## Contributing
Want to hack on ```react-router-navigation```? Awesome! We welcome contributions from anyone and everyone. :rocket:

## Questions
If you have any questions, feel free to get in touch on Twitter, [@Leo_LeBras](https://twitter.com/Leo_LeBras).

## Thanks
`react-router-navigation` is based on [React Router](https://github.com/reactjs/react-router). Thanks to Ryan Florence [@ryanflorence](https://twitter.com/ryanflorence), Michael Jackson [@mjackson](https://twitter.com/mjackson) and all the contributors for their work on [`react-router`](https://github.com/reactjs/react-router) and [`history`](https://github.com/mjackson/history).

Special thanks to [@ericvicenti](https://twitter.com/ericvicenti), [@skevy](https://twitter.com/skevy), [@satya164](https://twitter.com/satya164) and [@grabbou](https://twitter.com/grabbou) for their work on [`react-navigation`](https://github.com/react-community/react-navigation/) and [@satya164](https://twitter.com/satya164) for his work on [`react-native-tab-view`](https://github.com/react-native-community/react-native-tab-view).
