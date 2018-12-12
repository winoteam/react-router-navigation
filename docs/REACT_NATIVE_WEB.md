# React Native Web

## Supports [React Native Web](https://github.com/necolas/react-native-web)

### Getting Started with RNW

The quickest way to get started with React Native Web (assuming you already have a project setup) is to create a folder called routing (or something similar) and then create two files in there. `Routing.web.js` and `Routing.native.js`

Then you can use the following code:

#### `Routing.web.js:`
```js
export {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
```

#### `Routing.native.js`

```js
export { NativeRouter as Router, Link, Redirect } from 'react-router-native';

export { Navigation as Switch, Card as Route } from 'react-router-navigation';
```


And then in your `App.js`

```js
import { Router, Switch, Route } from './routing/Routing';

class MyApp extends Component {
  ...

  render(){
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/:user" component={User}/>
        <Route component={NoMatch}/>
      </Switch>
    )
  }   
}

```

And that would enable you to use routing as you would normally use it in any **REACT** app with [React-Router-Dom](https://reacttraining.com/react-router/)


#### Bonus 

Here is a starter repo for React Native web that includes the routing out of the box:

https://github.com/joefazz/react-native-web-starter/tree/navigation-react-router


