# Performance

## Avoid unnecessary re-renders

### Pure Render Anti-Pattern

> [React/Redux Performance Tuning Tips](https://medium.com/@arikmaor/react-redux-performance-tuning-tips-cef1a6c50759)
> When using a pure component, pay special attention to functions.

It is important to note that `react-router-navigation` uses [`shallowCompare`](https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/shallowEqual.js) internally which simply uses `===` to check each instance. Keep that in mind ! 🖐

❌ **NEVER do this:**

```js
render() {
  return (
    <Navigation>
      <Card
        renderTitle={() => <Text>My title</Text>}
        render={() => <View />}
      />
    </Navigation>
  )
}
```

✅ **Instead do this:**

```js
renderTitle() {
  return <Text>My title</Text>
}

renderCard() {
  return <View />
}

render() {
  return (
    <Navigation>
      <Card
        renderTitle={this.renderTitle}
        render={this.renderCard}
      />
    </Navigation>
  )
}
```

### Use `shouldComponentUpdate`

`<Navigation />`, `<Tabs />` and `<BottomNavigation />` are updated every time the parent receives new props. If your view is expensive, it's good idea to move each route inside a separate stateful component and use the shouldComponentUpdate lifecycle hook to prevent unnecessary re-renders.

⚠️ **Instead of:**

```js
const App = () => (
  <Navigation>
    <Card render={() => <MyExpensiveViewA />} />
    <Card render={() => <MyExpensiveViewB />} />
  </Navigation>
)
```

✅ **Prefer the following:**

```js
class App extends React.Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    return (
      <Navigation>
        <Card component={MyExpensiveComponentA />} />
        <Card component={MyExpensiveComponentB />} />
      </Navigation>
    )
  }
}

class MyExpensiveComponentA extends React.Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    return <View />
  }
}

class MyExpensiveComponentB extends React.Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    return <View />
  }
}
```

## Avoid one frame delay for tabs

> [`react-native-tab-view`](https://github.com/react-native-community/react-native-tab-view#user-content-avoid-one-frame-delay)
> We need to measure the width of the container and hence need to wait before rendering some elements on the screen. If you know the initial width upfront, you can pass it in and we won't need to wait for measuring it. Most of the time, it's just the window width.

`<Tabs />` and `<BottomNavigation />` can take an `initialLayout` prop in order to prevent the same 1-frame delay in rendering the tabs correctly
