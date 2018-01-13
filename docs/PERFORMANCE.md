# Performance

`<Navigation />`, `<Tabs />` and `<BottomNavigation />` are updated every time the parent receives new props. If your view is expensive, it's good idea to move each route inside a separate stateful component and use the shouldComponentUpdate lifecycle hook to prevent unnecessary re-renders.

For example, instead of:

```js
import MyExpensiveViewComponent from './MyExpensiveViewComponent'

const App = () => (
  <Navigation>
    <Card {...routeProps} render={() => <MyExpensiveViewComponent />} />
    <Card {...routeProps} render={() => <MyExpensiveViewComponent />} />
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
