# react-router-navigation
`react-router-navigation` provides tools to transition between multiple screens with
navigators or tab views. This library is based on `react-router`, `NavigationExperimental`,
and `react-native-tab-view`.

**Note:** This library is experimental.

## How to use
Install:
```shell
$ npm i react-router-navigation
```
Think to install `react-router@v4.0.0-alpha.5` if this has not been done before.

And then, enjoy it:
```js
import React from 'react'
import { Text } from 'react-native'
import { MemoryRouter } from 'react-router'
import { Navigation, MatchCard, Link } from 'react-router-navigation'

const App = () => (
  <MemoryRouter>
    <Navigation>
      <MatchCard
        exactly
        pattern="/"
        title="Index"
        render={() => <Link to="/hello">Press it</Link>}
      />
      <MatchCard
        pattern="/hello"
        title="Hello"
        render={() => <Text>Hello</Text>}
      />
    </Navigation>
  </MemoryRouter>
)
```

## Docs
WIP ...

## Questions
If you have any questions, feel free to get in touch on Twitter, [@Leo_LeBras](https://twitter.com/Leo_LeBras).

### Thanks
`react-router-navigation` is based on [React Router](https://github.com/reactjs/react-router). Thanks to Ryan Florence [@ryanflorence](https://twitter.com/ryanflorence), Michael Jackson [@mjackson](https://twitter.com/mjackson) and all the contributors for their work on [react-router](https://github.com/reactjs/react-router) and [history](https://github.com/mjackson/history).

Special thanks to Eric Vicenti [@ericvicenti](https://twitter.com/ericvicenti) and Hedger Wang [@hedgerwang](https://twitter.com/hedgerwang) for their work on [`NavigationExperimental`](https://github.com/ericvicenti/navigation-rfc) and [@satya164](https://twitter.com/satya164) for his work on [`react-native-tab-view`](https://github.com/react-native-community/react-native-tab-view)
