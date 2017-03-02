# react-router-navigation
[![Build Status](https://travis-ci.org/LeoLeBras/react-router-navigation.svg?branch=master)](https://travis-ci.org/LeoLeBras/react-router-navigation)
[![npm version](https://badge.fury.io/js/react-router-navigation.svg)](https://badge.fury.io/js/react-router-navigation)

`react-router-navigation` provides tools to transition between multiple screens with
navigators or tab views. This library is based on `react-router`, `react-navigation`,
and `react-native-tab-view`.

<img src="https://raw.githubusercontent.com/LeoLeBras/react-router-navigation/master/docs/bottom-navigation.gif" width="250">

## How to use
Install:
```shell
$ yarn add react-router@next react-router-native@next react-router-navigation
```

And then, enjoy it:
```js
import React from 'react'
import { Text } from 'react-native'
import { Route } from 'react-router'
import { NativeRouter, Link } from 'react-router-native'
import { Navigation } from 'react-router-navigation'

const App = () => (
  <NativeRouter>
    <Navigation>
      <Route
        exact
        path="/"
        render={() => <Link to="/hello">Press it</Link>}
      />
      <Route
        path="/hello"
        render={() => <Text>Hello</Text>}
      />
    </Navigation>
  </NativeRouter>
)
```

## Docs
* [```<Navigation />```](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/NAVIGATION.md) handles the transition between different scenes in your app
* [```<Tabs />```](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/TABS.md) make it easy to explore and switch between different views.
* [```<BottomNavigation />```](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/BOTTOM_NAVIGATION.md) make it easy to explore and switch between top-level views in a single tap.

## Questions
If you have any questions, feel free to get in touch on Twitter, [@Leo_LeBras](https://twitter.com/Leo_LeBras).

## Thanks
`react-router-navigation` is based on [React Router](https://github.com/reactjs/react-router). Thanks to Ryan Florence [@ryanflorence](https://twitter.com/ryanflorence), Michael Jackson [@mjackson](https://twitter.com/mjackson) and all the contributors for their work on [`react-router`](https://github.com/reactjs/react-router) and [`history`](https://github.com/mjackson/history).

Special thanks to [@ericvicenti](https://twitter.com/ericvicenti), [@skevy](https://twitter.com/skevy), [@satya164](https://twitter.com/satya164) and [@grabbou](https://twitter.com/grabbou) for their work on [`react-navigation`](https://github.com/react-community/react-navigation/) and [@satya164](https://twitter.com/satya164) for his work on [`react-native-tab-view`](https://github.com/react-native-community/react-native-tab-view)
