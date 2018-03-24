# react-router-navigation

[![Build Status](https://travis-ci.org/LeoLeBras/react-router-navigation.svg?branch=master)](https://travis-ci.org/LeoLeBras/react-router-navigation)
[![npm version](https://badge.fury.io/js/react-router-navigation.svg)](https://badge.fury.io/js/react-router-navigation)
[![Am I a cool kid ?](http://cool-kid.herokuapp.com/LeoLeBras/react-router-navigation)](https://github.com/awemakers/cool-kid)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

**`react-router-navigation` is still a work in progress. That means it's extremely likely that you'll encounter issues. Always consider it.**

`react-router-navigation` provides tools to navigate between multiple screens with
navigators or tab views. This library is based on `react-router`, `react-navigation`,
and `react-native-tab-view`.

<img src="https://raw.githubusercontent.com/LeoLeBras/react-router-navigation/master/docs/demo.gif" width="250">

## Highlights

* **Just an add-on to `react-router`**
* Declarative composability
* Allow you to call transitions anywhere in your code with simple components
* Dynamic Routing
* URL Driven Development
* Easy-to-use navigation solution using `react-navigation`
* Tab Bar Support using `react-native-tab-view`
* Cross-platform
* First class deep linking support
* Nested Navigators
* Fully typed with [Flow](https://flow.org/)
* [TypeScript support](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/23114)

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
        render={() => (
          <Link to="/hello">
            <Text>Press it</Text>
          </Link>
        )}
      />
      <Card path="/hello" render={() => <Text>Hello</Text>} />
    </Navigation>
  </NativeRouter>
)
```

## Guide

To learn how the library work, head to this introduction written by [@CharlesMangwa](https://twitter.com/Charles_Mangwa) : [Thousand ways to navigate in React-Native](https://medium.com/the-react-native-log/thousand-ways-to-navigate-in-react-native-f7a1e311a0e8)

## Docs

* [`<Navigation />`](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/NAVIGATION.md) handles the transition between different scenes in your app.
* [`<Tabs />`](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/TABS.md) make it easy to explore and switch between different views.
* [`<BottomNavigation />`](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/BOTTOM_NAVIGATION.md) make it easy to explore and switch between top-level views in a single tap.
* And some [performance tips](https://github.com/LeoLeBras/react-router-navigation/blob/master/docs/PERFORMANCE.md)

## Contributing

Want to hack on `react-router-navigation`? Awesome! We welcome contributions from anyone and everyone. :rocket:

While developing, you can run examples app to test your changes.

Make sure the tests still pass, and your code passes Flow and ESLint. Run the following to verify:

```shell
$ yarn run bootstrap
$ yarn test
```

Remember to add tests for your change if possible.

## Questions

If you have any questions, feel free to get in touch on Twitter, [@Leo_LeBras](https://twitter.com/Leo_LeBras).

## Thanks

`react-router-navigation` is based on [React Router](https://github.com/reactjs/react-router). Thanks to Ryan Florence [@ryanflorence](https://twitter.com/ryanflorence), Michael Jackson [@mjackson](https://twitter.com/mjackson) and all the contributors for their work on [`react-router`](https://github.com/reactjs/react-router) and [`history`](https://github.com/mjackson/history).

Special thanks to [@ericvicenti](https://twitter.com/ericvicenti), [@skevy](https://twitter.com/skevy), [@satya164](https://twitter.com/satya164) and [@grabbou](https://twitter.com/grabbou) for their work on [`react-navigation`](https://github.com/react-community/react-navigation/) and [@satya164](https://twitter.com/satya164) for his work on [`react-native-tab-view`](https://github.com/react-native-community/react-native-tab-view).
