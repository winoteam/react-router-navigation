import React from 'react'
import { StyleSheet, Platform, View, Text } from 'react-native'
import { Switch, Route, Redirect } from 'react-router'
import { NativeRouter, Link } from 'react-router-native'
import { Navigation, Card, Tabs, Tab } from 'react-router-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default () => (
  <NativeRouter>
    <Navigation>
      <Card
        exact
        path="/"
        render={() => (
          <View style={styles.container}>
            <Text>Index</Text>
            <Link to="/yolo">
              <Text>Push to a new scene</Text>
            </Link>
          </View>
        )}
      />
      <Card
        path="/yolo"
        component={() => (
          <View style={styles.container}>
            <Text>Yolo</Text>
            <Link to="/hello/one">
              <Text>Push to tabs</Text>
            </Link>
          </View>
        )}
        title="Yolo"
      />
      <Card
        path="/hello"
        title="Hello"
        render={() => (
          <Switch>
            <Route
              exact
              path="/hello"
              render={() => <Redirect to="/hello/one" />}
            />
            <Tabs style={styles.container}>
              <Tab
                path="/hello/one"
                label="One"
                render={() => (
                  <View style={styles.container}>
                    <Text>One</Text>
                  </View>
                )}
              />
              <Tab
                path="/hello/two"
                label="Two"
                render={() => (
                  <View style={styles.container}>
                    <Text>Two</Text>
                  </View>
                )}
              />
              <Tab
                path="/hello/three"
                label="Three"
                render={() => (
                  <View style={styles.container}>
                    <Text>Three</Text>
                  </View>
                )}
              />
            </Tabs>
          </Switch>
        )}
      />
    </Navigation>
  </NativeRouter>
)
