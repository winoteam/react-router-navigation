# react-router-navigation

Declarative routing for [React Native](https://facebook.github.io/react-native/) based on [`react-router`](https://reacttraining.com/react-router/) and [`react-navigation`](https://reactnavigation.org/).

## How to use

Install:

```shell
$ yarn add react-router react-router-native react-router-navigation
```

And then, enjoy it:

```js
import * as React from 'react'
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
      <Card
        path="/hello"
        render={() => <Text>Hello</Text>}
      />
    </Navigation>
  </NativeRouter>
)
```

## Questions

If you have any questions, feel free to get in touch on Twitter [@Leo_LeBras](https://twitter.com/Leo_LeBras) or open an issue.

## Credits

React Router Navigation is built and maintained by [Léo Le Bras](https://twitter.com/Leo_LeBras).
